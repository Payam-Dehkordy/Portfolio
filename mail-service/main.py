"""
Portfolio outbound mail via Gmail SMTP (App Password).
All messages send with From: MAIL_FROM_EMAIL (real mailbox identity).
Listen: 127.0.0.1:8791 — nginx proxies https://www.payam-dehkordy.com/api/
"""

from __future__ import annotations

import logging
import os
import smtplib
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
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=30) as smtp:
        smtp.starttls(context=ctx)
        smtp.login(MAIL_USER, MAIL_PASS)
        smtp.send_message(msg)


def _send_email_checked(*, subject: str, body: str, reply_to: str) -> None:
    """Send via SMTP; log server-side and raise HTTP 502 on failure (never leak SMTP text to client)."""
    try:
        _send_email(subject=subject, body=body, reply_to=reply_to)
    except Exception:
        logger.exception(
            "SMTP send failed (host=%s port=%s user=%s)",
            SMTP_HOST,
            SMTP_PORT,
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
