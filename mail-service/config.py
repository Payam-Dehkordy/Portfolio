"""
Centralized personal/site data — single source of truth for all email templates and API config.
Override any value via environment variables (uppercase, PORTFOLIO_ prefix).
"""

from __future__ import annotations

import logging
import os

SITE_URL = os.environ.get("PORTFOLIO_SITE_URL", "https://www.payam-dehkordy.com")
OWNER_NAME = "Payam Dehkordy"
JOB_TITLE = "Staff Software Engineer"
FOCUS_AREAS = "QA Automation | Full-Stack Development | EDA Quality | AI Agent & Workflow Automation"
OWNER_EMAIL = "payam.dehkordy@gmail.com"
OWNER_PHONE = "+374 55252581"
OWNER_LOCATION = "Yerevan, Armenia"
LINKEDIN_URL = "https://www.linkedin.com/in/payam-dehkordy"
GITHUB_URL = "https://github.com/Payam-Dehkordy"
CV_FILENAME = "Payam-Dehkordy-Staff-Software-Engineer-CV.pdf"
CV_ATS_FILENAME = "Payam-Dehkordy-Staff-Software-Engineer-CV-ATS.pdf"
HEADER_LOGO_PATH = "assets/logo/logo-full-white.svg"

CV_PDF_URL = f"{SITE_URL}/assets/documents/{CV_FILENAME}"
CV_ATS_URL = f"{SITE_URL}/assets/documents/{CV_ATS_FILENAME}"
HEADER_LOGO_URL = f"{SITE_URL}/{HEADER_LOGO_PATH}"


def configure_logging() -> None:
    logging.basicConfig(
        level=os.environ.get("LOG_LEVEL", "INFO").upper(),
        format="%(asctime)s %(levelname)-8s [%(name)s] %(message)s",
        datefmt="%Y-%m-%dT%H:%M:%S",
    )
