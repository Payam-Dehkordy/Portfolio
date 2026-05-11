# Portfolio Code Quality Audit

> **Date:** 2026-05-11  
> **Last updated:** 2026-05-12 (v2)  
> **Scope:** Full codebase — `index.html`, `styles.css`, `script.js`, `services/*`, `mail-service/*`, `.github/workflows/deploy.yml`, `deploy/nginx-portfolio.conf`  
> **Principles:** SOLID, KISS, YAGNI, DRY, Security, Accessibility, Performance, Maintainability

---

## Fix Status

| Status | Count |
|--------|------:|
| **FIXED** | **33** |
| DEFERRED (low impact) | 2 (N4 — FA subset; C5 partial — full module split, no bundler) |
| **Total** | **35** |

### Completed Fixes (grouped by batch)

| Batch | Issues | Scope |
|-------|--------|-------|
| Security & Nginx | C6, C7, C8, M11, M14, M15, N10 | Nginx headers/gzip/http2, origin check, body limit, health endpoint, 404 fix |
| Backend cleanup | M9, M10, N8 | Token cache, handler refactor, config.py, structured logging |
| Dead code (JS) | M1, M3, N6 | Removed ~200 lines: unused functions, broken lazy-load, parallax, resetAnimations |
| Dead code (CSS) | M2 | Removed blog CSS, .profile-img, .hero-video, .code-block, .loading |
| HTML fixes | C4, C9, N2, N3, N9, M12 | Inline styles→classes, labels/aria, landmarks, copyright, JSON-LD, cache busters |
| JS DRY | M4, M5, M6, M7 | Hero helper, scroll consolidation, back-to-top in HTML, innerHTML safety |
| CSS architecture | C1, C2, M13, N1, N5 | Design tokens (:root), type scale, card base, !important 10→2, naming convention |
| JS architecture | C10, C5 (partial) | portfolioDetails→portfolio-data.js; full module split deferred |
| DevOps | M8, N7 | deploy.yml sudo DRY, LICENSE, .editorconfig, .gitattributes |
| HTML partials | C3 | build.py + _includes/ partial sync with {{ BASE }}/{{ SERVICES }}/{{ HASH_PREFIX }} variables, CI --check |
| Performance | N4 | display=swap confirmed; FA subset deferred (acceptable for ~10 icons) |
| Terminal animation | — | Line-by-line skill display, cursor fix (â–ˆ→█), cursor on new line after output |
| Font-size overhaul | C2 | Reverted --fs-* tokens to original px proportions; replaced all hardcoded px/rem in service CSS with tokens; consistent section titles (--fs-lg + gold underline) |
| Layout & spacing | — | Hero container max-width 1200px, portfolio card flex layout (buttons stick to bottom), contact-cv-section padding, contact-container symmetric padding |
| Scroll & animation | — | Restored hero parallax scroll animation; scroll-margin-top: 60px on all sections for fixed navbar offset; animation reset only on main page (skip service pages) |
| Link colors | — | Removed -webkit-link defaults; all links use gold (--clr-accent); scoped global a:hover to exclude .btn/.social-link/.contact-item |
| Hover fixes | — | btn-gold hover keeps dark text (prevents same-color-as-bg); footer social-link hover gets gold background + dark icon |
| Navigation consistency | C3 | CV link added to all 4 pages (index + 3 services); footer unified (social icons only, no duplicate nav/contact text) |
| Contact UX | — | Contact items converted from static spans to actionable links (mailto, tel, maps, LinkedIn, GitHub); social-links moved from contact to footer |
| Back-to-top button | M6 | Restored CSS for .back-to-top (position, size, colors via tokens, hover effect); JS toggles visibility |
| Dev server | — | serve.py with no-cache headers for reliable local development |

### User Action Items

- ~~**C3 — HTML partials**~~ — **FIXED**: Implemented marker-based partial sync system (`build.py` + `_includes/`). Nav, footer, head-common, and Calendly are now shared partials with `{{ BASE }}` / `{{ SERVICES }}` / `{{ HASH_PREFIX }}` variable substitution. `python build.py --check` runs in CI.

---

## Summary

| Severity | Count | Description |
|----------|------:|-------------|
| Critical | 10 | Must fix — security holes, architectural debt, accessibility failures |
| Major | 15 | Should fix — dead code, DRY violations, reliability gaps |
| Minor | 10 | Nice to fix — consistency, performance, developer experience |
| **Total** | **35** | |

### By Layer

| Layer | Critical | Major | Minor | Total |
|-------|:--------:|:-----:|:-----:|:-----:|
| HTML | 3 | 1 | 3 | 7 |
| CSS | 2 | 2 | 2 | 6 |
| JS | 2 | 5 | 1 | 8 |
| Backend | 3 | 3 | 1 | 7 |
| DevOps | 2 | 4 | 1 | 7 |

### By Principle

| Principle | Count | Worst |
|-----------|:-----:|-------|
| DRY | 12 | Critical |
| Security | 5 | Critical |
| SOLID | 2 | Critical |
| A11y | 2 | Critical |
| YAGNI | 3 | Major |
| KISS | 2 | Major |
| Maint | 5 | Minor |
| Perf | 2 | Major |

---

## Critical Issues

### C1 — Zero CSS custom properties (DRY · CSS)

**File:** `styles.css` + 3 service CSS files

9 core palette colors (`#0d1117`, `#161b22`, `#21262d`, `#c29734`, `#8b949e`, `#e6e6e6`, `#f0f6fc`, `#30363d`, `#f85149`) repeated ~271 times across 4 CSS files with no `:root` variables. Gold accent has case inconsistency (`#C29734` vs `#c29734`). Any palette change requires mass search-replace across 4 files + inline HTML.

**Definition of Done:** Define `:root` block with CSS custom properties for all palette colors. Replace every hardcoded hex with `var(--token)`. Target: zero raw hex outside `:root`.

---

### C2 — 28 distinct font-size values with no type scale (DRY · CSS)

**File:** `styles.css`

Font sizes range from 4px to 1.8rem with 28 unique values, mixing px and rem freely. Some are unreasonably small (4px, 5px, 6px). Base `font-size: 10px` on body breaks user accessibility preferences (`1rem = 10px` instead of 16px).

**Definition of Done:** Define a type scale with CSS variables (`--fs-xs` through `--fs-xl`). Set body base to 62.5% or use rem with 16px base. Minimum readable size: 10px. Max distinct sizes: 8.

---

### C3 — Navigation, footer, meta tags copy-pasted across 4 files (DRY · HTML)

**File:** `index.html`, `services/qa-retainer.html`, `services/qa-scorecard.html`, `services/web-agency.html`

Full `<nav>`, `<footer>`, scrollRestoration script, Font Awesome link, Google Fonts link, and OG/Twitter meta pattern are duplicated in all 4 HTML files. Navigation items even differ between pages (6–8 items). Footer structure varies. Any change requires updating 4 files manually.

**Definition of Done:** Introduce shared partials (build step, SSI, or static site generator) for nav, footer, and head. Single source of truth for navigation links.

---

### C4 — Inline styles and onmouseover/onmouseout handlers (DRY · HTML)

**File:** `index.html` · Lines 106, 138–142, 592–596

Multiple inline `style=` attributes with colors, borders, transitions. Two links use `onmouseover`/`onmouseout` JS for hover effects that CSS `:hover` handles natively. `.btn-gold` has inline style duplicating its CSS class. ~15 inline style instances total.

**Definition of Done:** Delete all inline styles and JS hover handlers. Create CSS classes (`.link-gold-underline`, etc.) with `:hover` rules. Zero `style=` attributes remaining (except Calendly container).

---

### C5 — script.js is a 1510-line monolith handling 15+ concerns (SOLID · JS)

**File:** `script.js`

One file handles: navigation, smooth scroll (3 competing handlers), portfolio filter, portfolio details (370 lines of content data), hero animation, terminal animation, parallax, counter animation, lazy loading, back-to-top button, notification system, form validation, contact form, referral form, Calendly modal. Has 4 separate `DOMContentLoaded` listeners.

**Definition of Done:** Split into modules: `navigation.js`, `portfolio.js` (+ `portfolio-data.json`), `hero-animation.js`, `forms.js`, `utils.js`. Single `init()` entry point. Max 200 lines per module.

---

### C6 — Nginx has zero security headers (Security · DevOps)

**File:** `deploy/nginx-portfolio.conf`

No HSTS (`Strict-Transport-Security`), no `X-Content-Type-Options`, no `X-Frame-Options`, no `Content-Security-Policy`, no `Referrer-Policy`, no `Permissions-Policy`. Site handles forms and proxies to an API.

**Definition of Done:** Add all OWASP recommended security headers to the main server block. Test with securityheaders.com — target A grade.

---

### C7 — Origin check bypass on mail API (Security · Backend)

**File:** `mail-service/main.py` · Lines 167–169

The guard `if origin and ...` means requests without an Origin header (curl, Postman, bots) skip the check entirely. CORS middleware only protects browsers. The primary anti-abuse gate is trivially bypassable.

**Definition of Done:** Require a valid Origin or Referer header for all POST requests. Return 403 for missing origin. Add server-side CSRF token or alternative anti-abuse mechanism.

---

### C8 — No request body size limit (Security · Backend)

**File:** `mail-service/main.py` · Line 174

No `content-length` check or body limit. An attacker can POST a multi-GB body; Starlette reads it all into memory before Pydantic rejects it. Rate limiting at 12/min doesn't prevent single large requests.

**Definition of Done:** Add body size limit (64KB max) via middleware or manual content-length check. Add `MemoryMax` to systemd service file.

---

### C9 — Contact form inputs lack labels; social links missing aria-label (A11y · HTML)

**File:** `index.html` · Lines 621–643

Contact form has `<input>` and `<textarea>` with only placeholder text — no `<label>` or `aria-label`. Icon-only social links in contact section have no accessible name (compare with footer links which correctly have `aria-label`).

**Definition of Done:** Add visually-hidden `<label>` for all form inputs. Add `aria-label` to all icon-only links. Add `aria-label` and `role="button"` to hamburger with `aria-expanded` state.

---

### C10 — 370+ lines of portfolio content data hardcoded in JS (DRY · JS)

**File:** `script.js` · Lines 142–513

`portfolioDetails` is a massive JS object with all portfolio item descriptions, responsibilities, and examples. Content mixed with application logic. Editing content requires modifying JS.

**Definition of Done:** Extract to `portfolio-data.json` loaded at runtime, or `<script type="application/json">` block. `script.js` should contain only behavior.

---

## Major Issues

### M1 — Dead code: showNotification(), typeWriter(), isValidEmail(), blog animations (YAGNI · JS)

**File:** `script.js` · Lines 730–822

`showNotification` (60 lines with inline CSS), `typeWriter` (generic typing), `isValidEmail` (email regex), and blog-post animation setup — all defined but never called. ~100 lines of dead code.

**Definition of Done:** Delete all unused functions. Add back only when needed.

---

### M2 — 63 lines of dead blog CSS + unused classes (YAGNI · CSS)

**File:** `styles.css` · Lines 1046–1108

`.blog`, `.blog-grid`, `.blog-post`, `.blog-image`, `.blog-content`, `.read-more` — 63 lines for non-existent blog. Also unused: `.profile-img`, `.hero-video`, `.code-block`, `.loading` — another ~25 lines. Plus responsive overrides.

**Definition of Done:** Remove all blog CSS and unused class rules.

---

### M3 — resetAnimations leaks IntersectionObserver; custom lazy-load broken (YAGNI · JS)

**File:** `script.js` · Lines 1096–1246

Creates new `IntersectionObserver` every time `scrollY===0` without disconnecting previous — progressive memory leak. Custom lazy-loading reimplements native `loading="lazy"` and actually breaks images (never clears `src`, `.loaded` class never applied).

**Definition of Done:** Remove `resetAnimations` and scroll===0 listener. Remove custom lazy-loading; use native `loading="lazy"`. Animations play once on first view.

---

### M4 — Hero animation: identical fade-in repeated 5 times (DRY · JS)

**File:** `script.js` · Lines 875–938

`animateHeroElements()` repeats the same `setTimeout → transition → transform → nested setTimeout` pattern for 5 elements, differing only in target and delay.

**Definition of Done:** Create `revealElement(el, delayMs)` helper. Call 5 times.

---

### M5 — Scroll-to-anchor logic registered 3 overlapping times (DRY · JS)

**File:** `script.js` · Lines 41–102

Three separate event blocks: DOMContentLoaded hash handler, `a[href^="#"]` with `scrollIntoView` (no offset), and `.nav-link` with `scrollTo` + 52px offset. They fire on the same elements causing scroll "jumps".

**Definition of Done:** Consolidate into single scroll handler with nav offset. Remove duplicates.

---

### M6 — Back-to-top button + CSS keyframes created via JS (KISS · JS)

**File:** `script.js` · Lines 1118–1202

Button created via `createElement` with 18 lines of inline CSS. A `<style>` block with `@keyframes fadeIn`, `.lazy`, `.back-to-top:hover` injected into `<head>` via JS. ~80 lines that belong in HTML + CSS.

**Definition of Done:** Move button to `index.html`, styles to `styles.css`. JS only toggles visibility.

---

### M7 — innerHTML with string concatenation for portfolio details (Security · JS)

**File:** `script.js` · Lines 540–587

`showPortfolioDetails()` builds 50+ lines of HTML via string concatenation and sets `innerHTML`. Data is from hardcoded object now, but any future dynamic source creates XSS risk.

**Definition of Done:** Use DOM API (`createElement`, `textContent`) or sanitization utility.

---

### M8 — deploy.yml: sudo fallback pattern repeated 17 times (DRY · DevOps)

**File:** `.github/workflows/deploy.yml`

`sudo -n /usr/bin/CMD ... || sudo -n /bin/CMD ...` repeated 17 times. `die_sudo()` defined twice. `PORT="${SSH_PORT:-22}"` set 4 times.

**Definition of Done:** Define `run_sudo()` helper at top of each heredoc. Extract `PORT` once.

---

### M9 — Gmail OAuth token recreated on every request (Maint · Backend)

**File:** `mail-service/main.py` · Lines 100–114

`_send_via_gmail_api()` creates new `Credentials` with `token=None` and calls `refresh()` on every send. Google enforces refresh-token rate limits (~10k/day). No timeout on the Gmail API call — can hang indefinitely.

**Definition of Done:** Cache `Credentials` at module level. Refresh only when expired. Add 30s timeout.

---

### M10 — send_mail() handler mixes 6+ concerns; isinstance chain (SOLID · Backend)

**File:** `mail-service/main.py` · Lines 166–227

Single handler does: origin validation, env check, JSON parsing, Pydantic validation, honeypot check (duplicated), body dispatch, subject construction, email sending. `isinstance` chain violates Open/Closed.

**Definition of Done:** Extract honeypot check. Use dispatch table. Move env validation to startup. Split into parse → validate → dispatch → send pipeline.

---

### M11 — Health check returns "ok" even when service is broken (Security · Backend)

**File:** `mail-service/main.py` · Lines 159–161

`GET /health` returns `{"status":"ok"}` even when env vars missing, credentials invalid, or Google API unreachable. `_require_mail_env()` checked per-request, not at startup.

**Definition of Done:** Validate credentials at startup (fail fast). Health check verifies env vars and token.

---

### M12 — Cache buster versions out of sync (DRY · HTML)

**File:** `index.html` vs `services/*.html`

`index.html` uses `?v=btn-sent-gold-1`, service pages use `?v=mail-api-2`. Same stylesheet, different busters.

**Definition of Done:** Unify cache busters. Automate via git commit hash.

---

### M13 — Card pattern repeated 10+ times without shared class (DRY · CSS)

**File:** `styles.css`

`background: #161b22; border: 1px solid #21262d; border-radius: 8px` appears in `.stat`, `.skill-category`, `.portfolio-item`, `.blog-post`, `.experience-header-sidebar`, `.experience-content-sidebar`, `.portfolio-details-section`, `.contact-form`, `.portfolio-detail-image-container`, `.platform-info`.

**Definition of Done:** Create shared `.card` utility class. Apply in HTML.

---

### M14 — try_files SPA fallback masks 404 errors (Maint · DevOps)

**File:** `deploy/nginx-portfolio.conf` · Line 64

`try_files $uri $uri/ /index.html` — any non-existent URL returns `index.html` with HTTP 200 instead of 404. Static site, not SPA — confuses search engines.

**Definition of Done:** Use `try_files $uri $uri/ =404`.

---

### M15 — Nginx: no gzip, no OCSP stapling, deprecated http2 syntax (Perf · DevOps)

**File:** `deploy/nginx-portfolio.conf`

No `gzip`/`gzip_types`. No `ssl_stapling`. `listen 443 ssl http2` deprecated in nginx >= 1.25.1.

**Definition of Done:** Add gzip + gzip_types. Add ssl_stapling. Use `http2 on;`.

---

## Minor Issues

### N1 — 25 !important declarations across CSS files (KISS · CSS)

**File:** `styles.css` + `qa-retainer.css`

12 in `styles.css`, 13 in `qa-retainer.css`. Most fight self-inflicted specificity wars from ID selectors.

**Definition of Done:** Audit each `!important`. Restructure selectors. Document any that must remain.

---

### N2 — No skip-nav link, no `<main>` landmark, no `<header>` element (A11y · HTML)

**File:** `index.html`

No "Skip to main content" link. No `<main>` wrapping primary content. No `<header>`. Screen readers can't navigate by landmarks.

**Definition of Done:** Add skip-nav link. Wrap in `<main>`. Use `<header>` and `<aside>`.

---

### N3 — Copyright year hardcoded to 2024 (Maint · HTML)

**File:** `index.html:696`, `qa-retainer.html:345`

Two pages say 2024, two say 2026.

**Definition of Done:** Set year dynamically via JS. Or update and add build check.

---

### N4 — Full Font Awesome 6.0.0 loaded for ~10 icons (Perf · HTML)

**File:** `index.html` · Line 49

~60KB+ of unused CSS. Outdated (current 6.7.x). Google Fonts loaded synchronously.

**Definition of Done:** Use inline SVGs or custom subset. Add `&display=swap`.

---

### N5 — Inconsistent class naming conventions (Maint · CSS)

**File:** `styles.css`

`.btn-primary` (single dash) vs `.btn--sent` (double dash BEM). ID selectors used for styling. No documented convention.

**Definition of Done:** Document convention in `styles.css` header. Prefer BEM-lite.

---

### N6 — Parallax handler does nothing; 3 unthrottled scroll handlers (KISS · JS)

**File:** `script.js` · Lines 1043–1054

Hero parallax has no visible effect. `experienceSidebar` captured but unused. Three separate unthrottled scroll handlers on `window`.

**Definition of Done:** Remove empty handler. Consolidate into one throttled function.

---

### N7 — No LICENSE file despite MIT claim in README (Maint · DevOps)

**File:** Missing `LICENSE`

README says "MIT License" but no file exists. Also missing: `.editorconfig`, `.gitattributes`.

**Definition of Done:** Add `LICENSE` with MIT text. Add `.editorconfig` and `.gitattributes`.

---

### N8 — Hardcoded personal data in backend source (Maint · Backend)

**File:** `mail-service/mail_html.py`

Phone, email, LinkedIn, GitHub, CV paths all hardcoded constants. Subject lines buried in handler. No structured logging.

**Definition of Done:** Move personal data to env/config. Add structured JSON logging.

---

### N9 — JSON-LD alumniOf uses "Electronic Engineer" as org name (Maint · HTML)

**File:** `index.html` · Lines 727–729

`alumniOf` expects an educational institution, not a degree title.

**Definition of Done:** Fix to reference actual university, or remove.

---

### N10 — Nginx add_header inheritance trap (Maint · DevOps)

**File:** `deploy/nginx-portfolio.conf` · Lines 63–73

`add_header` in child `location` blocks replaces all parent headers. Security headers added to `location /` will silently disappear for static assets.

**Definition of Done:** Move shared headers to server block level or use `include` snippet.

---

## Recommended Fix Order

1. **Security first:** C6 (nginx headers), C7 (origin bypass), C8 (body limit), M11 (health check)
2. **Accessibility:** C9 (form labels, aria), N2 (landmarks)
3. **Architecture:** C5 (split script.js), C10 (extract data), C1 (CSS variables), C2 (type scale)
4. **Dead code:** M1 (unused JS), M2 (unused CSS), M3 (broken lazy-load)
5. **DRY cleanup:** M4–M5 (hero/scroll), M8 (deploy), M12–M13 (cache busters, card class)
6. **Infrastructure:** C3 (HTML partials), M14 (404 fallback), M15 (gzip/http2)
7. **Polish:** Remaining minor items
