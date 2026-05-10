"""
HTML + plain-text bodies for outbound mail — visual language matches the portfolio site
(dark UI, gold accent, monospace). All user-controlled strings are HTML-escaped.
"""

from __future__ import annotations

import html

# Mirrors styles.css (site identity)
_BG = "#0d1117"
_CARD = "#161b22"
_BORDER = "#21262d"
_TEXT = "#e6e6e6"
_MUTED = "#8b949e"
_ACCENT = "#c29734"
_FONT = "'JetBrains Mono', Consolas, 'Liberation Mono', Courier, monospace"

_SITE = "https://www.payam-dehkordy.com"
_CV_PDF = f"{_SITE}/assets/documents/Payam-Dehkordy-Staff-Software-Engineer-CV.pdf"
_CV_ATS = f"{_SITE}/assets/documents/Payam-Dehkordy-Staff-Software-Engineer-CV-ATS.pdf"
# Same asset as the site header — absolute URL for email clients
_HEADER_LOGO_URL = f"{_SITE}/assets/Logo/logo-full.svg"


def _html_document_title(*, eyebrow: str, title: str, html_document_title: str | None) -> str:
    if html_document_title is not None and html_document_title.strip():
        return html_document_title.strip()
    if title.strip():
        return title.strip()
    if eyebrow.strip():
        return eyebrow.strip()
    return "payam-dehkordy.com"


def _wrapper(
    *,
    eyebrow: str,
    title: str,
    inner_rows_html: str,
    footer_note: str | None = None,
    header_logo_url: str | None = None,
    html_document_title: str | None = None,
) -> str:
    doc_title = html.escape(_html_document_title(eyebrow=eyebrow, title=title, html_document_title=html_document_title))
    if header_logo_url:
        logo_src = html.escape(header_logo_url, quote=True)
        header_block = f"""          <tr>
            <td style="padding:22px 26px;border-bottom:1px solid {_BORDER};background-color:#0d1117;">
              <img src="{logo_src}" alt="Payam Dehkordy" width="220" style="display:block;max-width:220px;width:100%;height:auto;border:0;outline:none;text-decoration:none;" />
            </td>
          </tr>"""
    else:
        header_block = f"""          <tr>
            <td style="padding:22px 26px;border-bottom:1px solid {_BORDER};background-color:#0d1117;">
              <div style="font-family:{_FONT};font-size:13px;font-weight:600;letter-spacing:0.04em;color:{_ACCENT};text-transform:lowercase;">payam-dehkordy.com</div>
              <div style="font-family:{_FONT};font-size:11px;color:{_MUTED};margin-top:6px;">{html.escape(eyebrow)}</div>
              <div style="font-family:{_FONT};font-size:15px;color:{_TEXT};margin-top:12px;font-weight:500;">{html.escape(title)}</div>
            </td>
          </tr>"""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{doc_title}</title>
</head>
<body style="margin:0;padding:0;background-color:{_BG};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:{_BG};">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border:1px solid {_BORDER};border-radius:10px;overflow:hidden;background-color:{_CARD};">
{header_block}
          {inner_rows_html}
          <tr>
            <td style="padding:16px 26px 22px;border-top:1px solid {_BORDER};">
              <p style="font-family:{_FONT};font-size:10px;line-height:1.5;color:{_MUTED};margin:0;">
                {html.escape(footer_note or "Sent from the portfolio contact pipeline · Reply-To is set to the visitor so you can answer in one click.")}
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


def _referral_links_rows_html() -> str:
    rows = [
        ("Portfolio", f'<a href="{_SITE}/" style="color:{_ACCENT};text-decoration:none;">{_SITE}/</a>'),
        (
            "Email",
            f'<a href="mailto:payam.dehkordy@gmail.com" style="color:{_ACCENT};text-decoration:none;">payam.dehkordy@gmail.com</a>',
        ),
        ("Phone", "+374 55252581"),
        (
            "LinkedIn",
            '<a href="https://www.linkedin.com/in/payam-dehkordy" style="color:'
            f'{_ACCENT};text-decoration:none;">linkedin.com/in/payam-dehkordy</a>',
        ),
        (
            "GitHub",
            '<a href="https://github.com/Payam-Dehkordy" style="color:'
            f'{_ACCENT};text-decoration:none;">github.com/Payam-Dehkordy</a>',
        ),
    ]
    inner = "".join(_field_row(label, val) for label, val in rows)
    inner += _field_row(
        "CV (PDF)",
        f'<a href="{_CV_PDF}" style="color:{_ACCENT};text-decoration:none;">Download CV</a>',
    )
    inner += _field_row(
        "ATS CV (PDF)",
        f'<a href="{_CV_ATS}" style="color:{_ACCENT};text-decoration:none;">Download ATS CV</a>',
    )
    return inner


_REFERRAL_FOOTER_NOTE = (
    "Reply to reach Payam directly. "
    "This message was sent via payam-dehkordy.com because someone used the \"Refer me\" option "
    "on Payam's portfolio to introduce him to you."
)


def referral_outbound_bodies() -> tuple[str, str]:
    """Email sent To colleague — first-person intro from Payam (multipart)."""
    plain = (
        "Hi,\n\n"
        "I'm Payam Dehkordy — Staff Software QA Automation Engineer & Full Stack Developer "
        "(Yerevan). I help teams ship reliable software through test automation, quality "
        "engineering, and full-stack delivery.\n\n"
        "If you're exploring QA leadership, automation architecture, or web delivery for "
        "North American–aligned teams, I'd be glad to connect.\n\n"
        "CONTACT & LINKS\n"
        f"  Portfolio   {_SITE}/\n"
        "  Email       payam.dehkordy@gmail.com\n"
        "  Phone       +374 55252581\n"
        "  LinkedIn    https://www.linkedin.com/in/payam-dehkordy\n"
        "  GitHub      https://github.com/Payam-Dehkordy\n\n"
        "CV (PDF)\n"
        f"  {_CV_PDF}\n\n"
        "ATS CV (PDF)\n"
        f"  {_CV_ATS}\n\n"
        "Best regards,\n"
        "Payam Dehkordy\n\n"
        "---\n"
        f"{_REFERRAL_FOOTER_NOTE}\n"
    )
    intro_html = f"""
          <tr>
            <td style="padding:18px 26px;">
              <p style="font-family:{_FONT};font-size:14px;color:{_TEXT};line-height:1.65;margin:0 0 14px;">Hi,</p>
              <p style="font-family:{_FONT};font-size:13px;color:{_TEXT};line-height:1.65;margin:0 0 14px;">
                I'm <strong style="color:{_ACCENT};font-weight:600;">Payam Dehkordy</strong> — Staff Software QA Automation Engineer
                &amp; Full Stack Developer (Yerevan). I help teams ship reliable software through test automation,
                quality engineering, and full-stack delivery.
              </p>
              <p style="font-family:{_FONT};font-size:13px;color:{_TEXT};line-height:1.65;margin:0;">
                If you're exploring QA leadership, automation architecture, or web delivery for North American–aligned teams,
                I'd be glad to connect.
              </p>
            </td>
          </tr>
"""
    inner = intro_html + _referral_links_rows_html()
    html_out = _wrapper(
        eyebrow="",
        title="",
        inner_rows_html=inner,
        footer_note=_REFERRAL_FOOTER_NOTE,
        header_logo_url=_HEADER_LOGO_URL,
        html_document_title="Introduction — Payam Dehkordy",
    )
    return plain, html_out
