# Droplet migration — pointer

**Portfolio-specific hosting steps live in the Droplet repo** so application repos stay isolated.

| What | Where |
|------|--------|
| Full migration checklist (`/var/www/portfolio`, TLS bootstrap, rsync excludes) | [**Droplet → docs/PORTFOLIO_HOSTING.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/PORTFOLIO_HOSTING.md) |
| Shared server conventions + site inventory | [**Droplet README**](https://github.com/Payam-Dehkordy/Droplet/blob/main/README.md) |

**This repo keeps:** `deploy/nginx-portfolio.conf`, `deploy/sudoers-portfolio-deploy.example`, and the site files — not duplicated cross-project docs.
