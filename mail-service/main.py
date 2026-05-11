"""
Portfolio outbound mail via Gmail API (HTTPS only).

Sends as MAIL_FROM_EMAIL using OAuth — same identity as your Gmail inbox.
Listen: 127.0.0.1:8791 — nginx proxies https://www.payam-dehkordy.com/api/
"""

from __future__ import annotations

import base64
import logging
import os
import threading
from email.message import EmailMessage
from typing import Annotated, Literal, Union

from config import OWNER_NAME, JOB_TITLE, configure_logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from google.auth.exceptions import RefreshError
from google.auth.transport.requests import Request as GoogleAuthRequest
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from mail_html import contact_bodies, referral_outbound_bodies, scorecard_bodies
from pydantic import BaseModel, EmailStr, Field, TypeAdapter, ValidationError
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

configure_logging()

MAX_BODY_BYTES = 65_536
RATE_LIMIT = os.environ.get("MAIL_RATE_LIMIT", "12/minute").strip()

ALLOWED_ORIGINS = [
    o.strip()
    for o in os.environ.get(
        "MAIL_ALLOWED_ORIGINS",
        "https://www.payam-dehkordy.com,https://payam-dehkordy.com",
    ).split(",")
    if o.strip()
]
_ALLOWED_ORIGINS_NORM = {o.rstrip("/") for o in ALLOWED_ORIGINS}

MAIL_FROM = os.environ.get("MAIL_FROM_EMAIL", "").strip()
GMAIL_CLIENT_ID = os.environ.get("GMAIL_CLIENT_ID", "").strip()
GMAIL_CLIENT_SECRET = os.environ.get("GMAIL_CLIENT_SECRET", "").strip()
GMAIL_REFRESH_TOKEN = os.environ.get("GMAIL_REFRESH_TOKEN", "").strip()
GMAIL_SEND_SCOPE = "https://www.googleapis.com/auth/gmail.send"

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


# ── Models ───────────────────────────────────────────────────────

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


class ReferralIn(BaseModel):
    kind: Literal["referral"] = "referral"
    recipient_email: EmailStr
    website: str = Field(default="", max_length=500)


MailPayload = Annotated[
    Union[ContactIn, ScorecardIn, ReferralIn],
    Field(discriminator="kind"),
]
_MAIL_PAYLOAD_ADAPTER = TypeAdapter(MailPayload)


# ── Cached Gmail credentials ────────────────────────────────────

_creds: Credentials | None = None
_creds_lock = threading.Lock()


def _get_gmail_creds() -> Credentials:
    global _creds
    with _creds_lock:
        if _creds is None or not _creds.valid:
            _creds = Credentials(
                token=None,
                refresh_token=GMAIL_REFRESH_TOKEN,
                token_uri="https://oauth2.googleapis.com/token",
                client_id=GMAIL_CLIENT_ID,
                client_secret=GMAIL_CLIENT_SECRET,
                scopes=[GMAIL_SEND_SCOPE],
            )
            _creds.refresh(GoogleAuthRequest())
        return _creds


# ── Startup validation ───────────────────────────────────────────

def _check_mail_env() -> str | None:
    """Return an error message if mail env is misconfigured, else None."""
    if not MAIL_FROM:
        return "MAIL_FROM_EMAIL is not set."
    if not (GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET and GMAIL_REFRESH_TOKEN):
        return "Gmail API not configured (GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN)."
    return None


@app.on_event("startup")
def _validate_on_startup() -> None:
    err = _check_mail_env()
    if err:
        logger.error("Mail service misconfigured: %s", err)


# ── Shared helpers ───────────────────────────────────────────────

def _check_honeypot(website: str) -> None:
    if website.strip():
        raise HTTPException(status_code=400, detail="bad request")


def _require_origin(request: Request) -> None:
    origin = (request.headers.get("origin") or "").rstrip("/")
    if not origin:
        referer = request.headers.get("referer") or ""
        if not any(referer.startswith(o) for o in ALLOWED_ORIGINS):
            raise HTTPException(status_code=403, detail="origin required")
        return
    if origin not in _ALLOWED_ORIGINS_NORM:
        raise HTTPException(status_code=403, detail="origin")


def _send_email(
    *,
    subject: str,
    plain: str,
    html_body: str,
    reply_to: str,
    to_addr: str | None = None,
) -> None:
    err = _check_mail_env()
    if err:
        raise HTTPException(status_code=503, detail=err)

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = MAIL_FROM
    msg["To"] = to_addr or MAIL_FROM
    msg["Reply-To"] = reply_to
    msg.set_content(plain)
    msg.add_alternative(html_body, subtype="html")

    try:
        creds = _get_gmail_creds()
        raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
        service = build("gmail", "v1", credentials=creds, cache_discovery=False)
        service.users().messages().send(userId="me", body={"raw": raw}).execute()
    except RefreshError:
        logger.exception("Gmail OAuth token refresh failed")
        raise HTTPException(
            status_code=503,
            detail="Mail service authentication error. Please try again later.",
        ) from None
    except Exception:
        logger.exception("Mail delivery failed (Gmail API)")
        raise HTTPException(
            status_code=502,
            detail="Mail delivery failed. Please try again later or email directly.",
        ) from None


# ── Mail type dispatch table ─────────────────────────────────────

def _handle_contact(payload: ContactIn) -> tuple[str, str, str, str, str | None]:
    _check_honeypot(payload.website)
    plain, html_body = contact_bodies(
        name=payload.name.strip(),
        email=str(payload.email),
        subject_user=payload.subject.strip(),
        message=payload.message.strip(),
    )
    return f"[Portfolio] {payload.subject.strip()}", plain, html_body, str(payload.email), None


def _handle_referral(payload: ReferralIn) -> tuple[str, str, str, str, str | None]:
    _check_honeypot(payload.website)
    plain, html_body = referral_outbound_bodies()
    return f"Introduction — {OWNER_NAME} ({JOB_TITLE})", plain, html_body, MAIL_FROM, str(payload.recipient_email)


def _handle_scorecard(payload: ScorecardIn) -> tuple[str, str, str, str, str | None]:
    plain, html_body = scorecard_bodies(
        visitor_email=str(payload.email),
        score=payload.score,
        average=payload.average.strip(),
    )
    return "[Portfolio] QA Health Scorecard — detailed report request", plain, html_body, str(payload.email), None


_HANDLERS: dict[str, callable] = {
    "contact": _handle_contact,
    "referral": _handle_referral,
    "scorecard": _handle_scorecard,
}


# ── Routes ───────────────────────────────────────────────────────

@app.get("/health")
def health() -> dict[str, str]:
    err = _check_mail_env()
    if err:
        return {"status": "degraded", "reason": err}
    return {"status": "ok"}


@app.post("/api/mail")
@limiter.limit(RATE_LIMIT)
async def send_mail(request: Request) -> dict[str, str]:
    _require_origin(request)

    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > MAX_BODY_BYTES:
        raise HTTPException(status_code=413, detail="Request body too large.")

    try:
        body = await request.body()
    except Exception:
        raise HTTPException(status_code=400, detail="invalid body")

    if len(body) > MAX_BODY_BYTES:
        raise HTTPException(status_code=413, detail="Request body too large.")

    import json
    try:
        raw_json = json.loads(body)
    except (json.JSONDecodeError, ValueError):
        raise HTTPException(status_code=400, detail="invalid json")

    try:
        payload = _MAIL_PAYLOAD_ADAPTER.validate_python(raw_json)
    except ValidationError:
        raise HTTPException(status_code=422, detail="Validation failed. Please check your input.")

    handler = _HANDLERS.get(payload.kind)
    if not handler:
        raise HTTPException(status_code=400, detail="Unknown mail type.")

    subj, plain, html_body, reply_to, to_addr = handler(payload)
    _send_email(subject=subj, plain=plain, html_body=html_body, reply_to=reply_to, to_addr=to_addr)
    return {"ok": "sent"}
