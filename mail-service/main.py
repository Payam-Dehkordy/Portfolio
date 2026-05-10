"""
Portfolio outbound mail via Gmail SMTP (App Password).
All messages send with From: MAIL_FROM_EMAIL (real mailbox identity).
Listen: 127.0.0.1:8791 — nginx proxies https://www.payam-dehkordy.com/api/
"""

from __future__ import annotations

import errno
import logging
import os
import smtplib
import socket
import ssl
from email.message import EmailMessage
from typing import Annotated, Literal, Union

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, TypeAdapter, ValidationError
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

ALLOWED_ORIGINS = [
    o.strip()
    for o in os.environ.get(
        "MAIL_ALLOWED_ORIGINS",
        "https://www.payam-dehkordy.com,https://payam-dehkordy.com",
    ).split(",")
    if o.strip()
]

MAIL_FROM = os.environ.get("MAIL_FROM_EMAIL", "").strip()
MAIL_USER = os.environ.get("MAIL_SMTP_USER", MAIL_FROM).strip()
MAIL_PASS = os.environ.get("MAIL_SMTP_APP_PASSWORD", "").strip()
SMTP_HOST = os.environ.get("MAIL_SMTP_HOST", "smtp.gmail.com").strip()
SMTP_PORT = int(os.environ.get("MAIL_SMTP_PORT", "587"))
SMTP_SSL_PORT = int(os.environ.get("MAIL_SMTP_SSL_PORT", "465"))
SMTP_TIMEOUT = float(os.environ.get("MAIL_SMTP_TIMEOUT", "45"))
# starttls | ssl | auto — auto tries STARTTLS on SMTP_PORT then implicit TLS on SMTP_SSL_PORT if connect times out.
SMTP_CONNECTION = os.environ.get("MAIL_SMTP_CONNECTION", "auto").strip().lower()
# VPS often has no IPv6 egress; getaddrinfo returns AAAA first → connect() → Errno 101 ENETUNREACH.
_FORCE_IPV4 = os.environ.get("MAIL_SMTP_FORCE_IPV4", "1").strip().lower() in (
    "1",
    "true",
    "yes",
)


class SMTPIPv4(smtplib.SMTP):
    """Like SMTP, but open TCP via IPv4 only when MAIL_SMTP_FORCE_IPV4 is set (default on)."""

    def _get_socket(self, host: str, port: int, timeout: float | None):
        if not _FORCE_IPV4:
            return super()._get_socket(host, port, timeout)
        last_exc: OSError | None = None
        for res in socket.getaddrinfo(host, port, socket.AF_INET, socket.SOCK_STREAM):
            af, socktype, proto, _canon, sa = res
            sock = socket.socket(af, socktype, proto)
            sock.settimeout(timeout)
            try:
                sock.connect(sa)
                return sock
            except OSError as e:
                last_exc = e
                sock.close()
        if last_exc is not None:
            raise last_exc
        raise OSError(f"no IPv4 addresses found for {host!r}")


class SMTPIPv4_SSL(smtplib.SMTP_SSL):
    """SMTP_SSL with IPv4-only TCP when MAIL_SMTP_FORCE_IPV4 is set."""

    def _get_socket(self, host: str, port: int, timeout: float | None):
        if not _FORCE_IPV4:
            return super()._get_socket(host, port, timeout)
        last_exc: OSError | None = None
        for res in socket.getaddrinfo(host, port, socket.AF_INET, socket.SOCK_STREAM):
            af, socktype, proto, _canon, sa = res
            sock = socket.socket(af, socktype, proto)
            sock.settimeout(timeout)
            try:
                sock.connect(sa)
                return self.context.wrap_socket(sock, server_hostname=self._host)
            except OSError as e:
                last_exc = e
                sock.close()
        if last_exc is not None:
            raise last_exc
        raise OSError(f"no IPv4 addresses found for {host!r}")


logger = logging.getLogger(__name__)

app = FastAPI(title="portfolio-mail", docs_url=None, redoc_url=None, openapi_url=None)
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
)


class ContactIn(BaseModel):
    kind: Literal["contact"] = "contact"
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=300)
    message: str = Field(..., min_length=1, max_length=15000)
    website: str = Field(default="", max_length=500)


class ScorecardIn(BaseModel):
    kind: Literal["scorecard"] = "scorecard"
    email: EmailStr
    score: int = Field(..., ge=0, le=50)
    average: str = Field(..., max_length=10)


# Discriminated union validated explicitly — avoids FastAPI/slowapi mis-reading the JSON body (422).
MailPayload = Annotated[Union[ContactIn, ScorecardIn], Field(discriminator="kind")]
_MAIL_PAYLOAD_ADAPTER = TypeAdapter(MailPayload)


def _require_mail_env() -> None:
    if not MAIL_FROM or not MAIL_USER or not MAIL_PASS:
        raise HTTPException(
            status_code=503,
            detail="Mail not configured on server (MAIL_FROM_EMAIL / MAIL_SMTP_*).",
        )


def _send_email(*, subject: str, body: str, reply_to: str) -> None:
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = MAIL_FROM
    msg["To"] = MAIL_FROM
    msg["Reply-To"] = reply_to
    msg.set_content(body)

    ctx = ssl.create_default_context()

    def send_starttls() -> None:
        with SMTPIPv4(SMTP_HOST, SMTP_PORT, timeout=SMTP_TIMEOUT) as smtp:
            smtp.starttls(context=ctx)
            smtp.login(MAIL_USER, MAIL_PASS)
            smtp.send_message(msg)

    def send_ssl() -> None:
        with SMTPIPv4_SSL(
            SMTP_HOST,
            SMTP_SSL_PORT,
            timeout=SMTP_TIMEOUT,
            context=ctx,
        ) as smtp:
            smtp.login(MAIL_USER, MAIL_PASS)
            smtp.send_message(msg)

    mode = SMTP_CONNECTION
    if mode == "ssl":
        send_ssl()
        return
    if mode == "starttls":
        send_starttls()
        return

    # auto: STARTTLS first; on TCP timeout try implicit TLS (465) — some networks block 587 only.
    try:
        send_starttls()
    except TimeoutError:
        logger.warning(
            "SMTP STARTTLS timed out (host=%s port=%s); retrying implicit TLS on port %s",
            SMTP_HOST,
            SMTP_PORT,
            SMTP_SSL_PORT,
        )
        send_ssl()
    except OSError as e:
        if e.errno not in (errno.ETIMEDOUT, errno.ECONNRESET):
            raise
        logger.warning(
            "SMTP STARTTLS connect error %s (host=%s port=%s); retrying implicit TLS on port %s",
            e,
            SMTP_HOST,
            SMTP_PORT,
            SMTP_SSL_PORT,
        )
        send_ssl()


def _send_email_checked(*, subject: str, body: str, reply_to: str) -> None:
    """Send via SMTP; log server-side and raise HTTP 502 on failure (never leak SMTP text to client)."""
    try:
        _send_email(subject=subject, body=body, reply_to=reply_to)
    except Exception:
        logger.exception(
            "SMTP send failed (host=%s ports=%s/%s connection=%s user=%s)",
            SMTP_HOST,
            SMTP_PORT,
            SMTP_SSL_PORT,
            SMTP_CONNECTION,
            MAIL_USER,
        )
        raise HTTPException(
            status_code=502,
            detail="Mail delivery failed. Please try again later or email directly.",
        ) from None


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/mail")
@limiter.limit("12/minute")
async def send_mail(request: Request) -> dict[str, str]:
    origin = request.headers.get("origin") or ""
    if origin and origin.rstrip("/") not in {o.rstrip("/") for o in ALLOWED_ORIGINS}:
        raise HTTPException(status_code=403, detail="origin")

    _require_mail_env()

    try:
        raw = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="invalid json")

    try:
        payload = _MAIL_PAYLOAD_ADAPTER.validate_python(raw)
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())

    if isinstance(payload, ContactIn):
        if (payload.website or "").strip():
            raise HTTPException(status_code=400, detail="bad request")
        body = (
            f"Contact form on portfolio website\n\n"
            f"From name: {payload.name}\n"
            f"From email: {payload.email}\n\n"
            f"{payload.message}"
        )
        subj = f"[Portfolio] {payload.subject}"
        _send_email_checked(subject=subj, body=body, reply_to=str(payload.email))
        return {"ok": "sent"}

    body = (
        f"QA Health Scorecard — detailed report request\n\n"
        f"Visitor email: {payload.email}\n"
        f"Score: {payload.score}/50\n"
        f"Average: {payload.average}\n"
    )
    subj = "[Portfolio] QA Health Scorecard — detailed report request"
    _send_email_checked(subject=subj, body=body, reply_to=str(payload.email))
    return {"ok": "sent"}
