#!/usr/bin/env python3
"""One-time OAuth: prints GMAIL_REFRESH_TOKEN for /etc/portfolio-mail.env.

Prerequisites (you must do this in Google Cloud Console — cannot be automated here):
  1. Project → APIs & Services → Enable Gmail API.
  2. OAuth consent screen (External or Internal) → add scope:
     https://www.googleapis.com/auth/gmail.send
  3. Credentials → Create OAuth client ID → Desktop app → download JSON.

Usage:
  python3 -m venv .venv && .venv/bin/pip install google-auth-oauthlib
  .venv/bin/python setup_gmail_oauth.py /path/to/client_secret_*.json

Then copy the printed lines into /etc/portfolio-mail.env on the droplet.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]


def main() -> int:
    p = argparse.ArgumentParser(description="Obtain Gmail API refresh token for portfolio-mail.")
    p.add_argument(
        "client_secrets",
        type=Path,
        help="OAuth client JSON from Google Cloud (Desktop client)",
    )
    args = p.parse_args()

    raw = json.loads(args.client_secrets.read_text(encoding="utf-8"))
    installed = raw.get("installed") or raw.get("web")
    if not installed:
        print("JSON must contain 'installed' (Desktop) credentials.", file=sys.stderr)
        return 1
    client_id = installed["client_id"]
    client_secret = installed["client_secret"]

    flow = InstalledAppFlow.from_client_secrets_file(str(args.client_secrets), SCOPES)
    creds = flow.run_local_server(port=0, prompt="consent", access_type="offline")
    if not creds.refresh_token:
        print(
            "No refresh_token returned. Revoke app access in Google Account → "
            "Security → Third-party access, then run again.",
            file=sys.stderr,
        )
        return 1

    print("# Paste into /etc/portfolio-mail.env on the droplet (chmod 600).")
    print(f"GMAIL_CLIENT_ID={client_id}")
    print(f"GMAIL_CLIENT_SECRET={client_secret}")
    print(f"GMAIL_REFRESH_TOKEN={creds.refresh_token}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
