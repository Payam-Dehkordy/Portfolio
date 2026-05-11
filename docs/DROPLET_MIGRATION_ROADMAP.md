# Portfolio — droplet hosting

Hosting setup, TLS, nginx, mail API, and deploy steps are documented in the **Droplet** repo (single source of truth for server-level docs):

- [**PORTFOLIO_HOSTING.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/PORTFOLIO_HOSTING.md) — full setup phases, nginx, TLS bootstrap, mail API, smoke tests
- [**PROJECTS_CONSISTENT_APPROACH.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/PROJECTS_CONSISTENT_APPROACH.md) — shared conventions (deploy user, sudoers, CI shape, commit style, `serve.py`)
- [**SERVER_CONVENTIONS.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/SERVER_CONVENTIONS.md) — nginx version, http2 syntax, TLS, directory layout

## Quick reference

| Item | Value |
|------|-------|
| Document root | `/var/www/portfolio` |
| Mail API | `/opt/portfolio-mail` → `127.0.0.1:8791` |
| Canonical nginx config | `deploy/nginx-portfolio.conf` (this repo) |
| Sudoers example | `deploy/sudoers-portfolio-deploy.example` (this repo) |
| CI workflow | `.github/workflows/deploy.yml` (this repo) |
| Droplet nginx version | 1.30.0 (official repo, `http2 on;` syntax) |
