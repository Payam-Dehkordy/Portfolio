"""
HTML + plain-text bodies for outbound mail — visual language matches the portfolio site
(dark UI, gold accent, monospace). All user-controlled strings are HTML-escaped.
"""

from __future__ import annotations

import html
from typing import Sequence


# Mirrors styles.css (site identity)
_BG = "#0d1117"
_CARD = "#161b22"
_BORDER = "#21262d"
_TEXT = "#e6e6e6"
_MUTED = "#8b949e"
_ACCENT = "#c29734"
_FONT = "'JetBrains Mono', Consolas, 'Liberation Mono', Courier, monospace"


def _wrapper(*, eyebrow: str, title: str, inner_rows_html: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:{_BG};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:{_BG};">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border:1px solid {_BORDER};border-radius:10px;overflow:hidden;background-color:{_CARD};">
          <tr>
            <td style="padding:22px 26px;border-bottom:1px solid {_BORDER};background-color:#0d1117;">
              <div style="font-family:{_FONT};font-size:13px;font-weight:600;letter-spacing:0.04em;color:{_ACCENT};text-transform:lowercase;">payam-dehkordy.com</div>
              <div style="font-family:{_FONT};font-size:11px;color:{_MUTED};margin-top:6px;">{html.escape(eyebrow)}</div>
              <div style="font-family:{_FONT};font-size:15px;color:{_TEXT};margin-top:12px;font-weight:500;">{html.escape(title)}</div>
            </td>
          </tr>
          {inner_rows_html}
          <tr>
            <td style="padding:16px 26px 22px;border-top:1px solid {_BORDER};">
              <p style="font-family:{_FONT};font-size:10px;line-height:1.5;color:{_MUTED};margin:0;">
                Sent from the portfolio contact pipeline · Reply-To is set to the visitor so you can answer in one click.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


def _field_row(label: str, value_html: str) -> str:
    return f"""
          <tr>
            <td style="padding:14px 26px;border-top:1px solid {_BORDER};">
              <div style="font-family:{_FONT};font-size:10px;color:{_ACCENT};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">{html.escape(label)}</div>
              <div style="font-family:{_FONT};font-size:13px;color:{_TEXT};line-height:1.55;">{value_html}</div>
            </td>
          </tr>
"""


def _escape_message_for_html(message: str) -> str:
    return html.escape(message).replace("\n", "<br>\n")


def contact_bodies(
    *,
    name: str,
    email: str,
    subject_user: str,
    message: str,
) -> tuple[str, str]:
    plain = (
        "Contact form — payam-dehkordy.com\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Subject: {subject_user}\n\n"
        f"{message}\n"
    )
    inner = ""
    inner += _field_row("Name", html.escape(name))
    inner += _field_row("Email", f'<a href="mailto:{html.escape(email)}" style="color:{_ACCENT};text-decoration:none;">{html.escape(email)}</a>')
    inner += _field_row("Subject", html.escape(subject_user))
    inner += _field_row("Message", _escape_message_for_html(message))
    html_out = _wrapper(
        eyebrow="New message · Contact",
        title="You have a new portfolio inquiry",
        inner_rows_html=inner,
    )
    return plain, html_out


def scorecard_bodies(
    *,
    visitor_email: str,
    score: int,
    average: str,
) -> tuple[str, str]:
    plain = (
        "QA Health Scorecard — detailed report request\n\n"
        f"Visitor email: {visitor_email}\n"
        f"Score: {score}/50\n"
        f"Average: {average}\n"
    )
    score_bar_width = min(100, int(score * 100 / 50))
    inner = ""
    inner += _field_row(
        "Score",
        f"""
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:4px;">
                <tr>
                  <td style="font-family:{_FONT};font-size:28px;font-weight:600;color:{_ACCENT};padding-right:12px;vertical-align:middle;">{score}<span style="font-size:14px;color:{_MUTED};font-weight:400;">/50</span></td>
                  <td style="vertical-align:middle;width:100%;">
                    <div style="height:8px;background:{_BORDER};border-radius:4px;overflow:hidden;">
                      <div style="height:8px;width:{score_bar_width}%;background:{_ACCENT};border-radius:4px;"></div>
                    </div>
                  </td>
                </tr>
              </table>
        """.strip(),
    )
    inner += _field_row("Average (per question)", html.escape(average))
    inner += _field_row(
        "Visitor email",
        f'<a href="mailto:{html.escape(visitor_email)}" style="color:{_ACCENT};text-decoration:none;">{html.escape(visitor_email)}</a>',
    )
    html_out = _wrapper(
        eyebrow="QA Health Scorecard",
        title="Detailed report requested",
        inner_rows_html=inner,
    )
    return plain, html_out
