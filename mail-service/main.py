"""
Portfolio outbound mail via Gmail API (HTTPS only).

Sends as MAIL_FROM_EMAIL using OAuth — same identity as your Gmail inbox.
Listen: 127.0.0.1:8791 — nginx proxies https://www.payam-dehkordy.com/api/
"""

from __future__ import annotations

import base64
import logging
import os
from email.message import EmailMessage
from typing import Annotated, Literal, Union

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from google.auth.transport.requests import Request as GoogleAuthRequest
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
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


MailPayload = Annotated[Union[ContactIn, ScorecardIn], Field(discriminator="kind")]
_MAIL_PAYLOAD_ADAPTER = TypeAdapter(MailPayload)


def _require_mail_env() -> None:
    if not MAIL_FROM:
        raise HTTPException(
            status_code=503,
            detail="MAIL_FROM_EMAIL is not set.",
        )
    if not (GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET and GMAIL_REFRESH_TOKEN):
        raise HTTPException(
            status_code=503,
            detail="Gmail API not configured (GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN).",
        )


def _send_via_gmail_api(msg: EmailMessage) -> None:
    creds = Credentials(
        token=None,
        refresh_token=GMAIL_REFRESH_TOKEN,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=GMAIL_CLIENT_ID,
        client_secret=GMAIL_CLIENT_SECRET,
        scopes=[GMAIL_SEND_SCOPE],
    )
    if not creds.valid:
        creds.refresh(GoogleAuthRequest())

    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    service = build("gmail", "v1", credentials=creds, cache_discovery=False)
    service.users().messages().send(userId="me", body={"raw": raw}).execute()


def _send_email(*, subject: str, body: str, reply_to: str) -> None:
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = MAIL_FROM
    msg["To"] = MAIL_FROM
    msg["Reply-To"] = reply_to
    msg.set_content(body)
    _send_via_gmail_api(msg)


def _send_email_checked(*, subject: str, body: str, reply_to: str) -> None:
    try:
        _send_email(subject=subject, body=body, reply_to=reply_to)
    except Exception:
        logger.exception("Mail delivery failed (Gmail API)")
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
        raw_json = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="invalid json")

    try:
        payload = _MAIL_PAYLOAD_ADAPTER.validate_python(raw_json)
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
