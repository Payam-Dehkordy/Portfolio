# Portfolio → DigitalOcean droplet — migration roadmap

Migrate this static site from **GitHub Pages** to your droplet using the same conventions as **NeoGym** (`/var/www/<site>/…`) and **ChiKoja** (canonical Nginx config in **`deploy/`**, Git-backed, copied to **`/etc/nginx/sites-available/`**).

**Repository:** [Payam-Dehkordy/Portfolio](https://github.com/Payam-Dehkordy/Portfolio)

---

## Layout on server (single source of truth)

| Path | Purpose |
|------|---------|
| **`/var/www/portfolio`** | **Document root** — only files that must be publicly served (`index.html`, `assets/`, `services/`, `robots.txt`, `sitemap.xml`, …). |

**Invariant:** Nginx **`root`** is **`/var/www/portfolio`** — see **[`deploy/nginx-portfolio.conf`](../deploy/nginx-portfolio.conf)**.

**Why not rsync the whole repo into `/var/www/portfolio`?** This tree is the live URL space. **`deploy/`**, **`docs/`**, and **`.git`** must **not** appear under **`root`** (ChiKoja avoids that by setting **`root`** to **`public/`** only). Exclude them in rsync or you expose tooling and history.

---

## Roadmap phases

| Phase | What | Outcome |
|-------|------|--------|
| **0** | GitHub Pages + **`CNAME`** (`www.payam-dehkordy.com`). | No VPS static config. |
| **1** | Nginx + TLS + DNS → **`/var/www/portfolio`**. | Production-aligned with NeoGym/ChiKoja patterns. |
| **2** | Optional referral API (Gmail API / SMTP). | Separate doc when implemented. |

---

## Prerequisites

- [ ] Ubuntu droplet (22.04/24.04), SSH access.
- [ ] DNS for **`payam-dehkordy.com`** (e.g. Cloudflare).
- [ ] **Canonical URL:** **`https://www.payam-dehkordy.com`** (matches **`CNAME`**). Apex **`payam-dehkordy.com`** redirects to **`www`** (handled in **`deploy/nginx-portfolio.conf`**).

---

## Phase 1 — Steps

### 1. Create document root and permissions

```bash
sudo mkdir -p /var/www/portfolio
sudo chown -R deploy:www-data /var/www/portfolio
sudo chmod -R g+rX /var/www/portfolio
```

Use your real deploy user (`deploy` or another dedicated user); align with ChiKoja’s “deploy user + nginx can traverse” rule.

### 2. Install Nginx

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable --now nginx
```

### 3. First TLS certificate (before the redirect-only vhost)

Certbot needs HTTP (**80**) to succeed on first issuance. **Do not** install the final **`deploy/nginx-portfolio.conf`** yet if its **:80** block is redirect-only — that can block HTTP-01.

**Bootstrap** — temporary site (HTTP only), replace **`deploy`** / **`user`** as needed:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name www.payam-dehkordy.com payam-dehkordy.com;

    root /var/www/portfolio;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Save as e.g. **`/etc/nginx/sites-available/portfolio-bootstrap.conf`**, enable it, **`nginx -t`**, reload. Deploy at least **`index.html`** to **`/var/www/portfolio`** so **`root`** exists.

Point **DNS** **A**/**AAAA** for **`www`** (and apex if required) at this droplet. Then:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d www.payam-dehkordy.com -d payam-dehkordy.com
```

Request **one** certificate that lists **both** hostnames so **`ssl_certificate`** paths stay aligned.

### 4. Install the canonical vhost from this repo

From your checkout:

```bash
sudo cp deploy/nginx-portfolio.conf /etc/nginx/sites-available/portfolio.conf
sudo ln -sf /etc/nginx/sites-available/portfolio.conf /etc/nginx/sites-enabled/portfolio.conf
```

Disable the bootstrap site if you added one (**`unlink`** its symlink under **`sites-enabled`**). Confirm **`ssl_certificate`** paths in **`deploy/nginx-portfolio.conf`** match **`certbot`** output under **`/etc/letsencrypt/live/`** (typically **`www.payam-dehkordy.com`**).

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Renewal check:

```bash
sudo certbot renew --dry-run
```

### 5. Deploy site files (rsync)

From the machine that holds the checkout (paths relative to repo root containing **`index.html`**):

```bash
rsync -avz --delete \
  --exclude '.git/' \
  --exclude '.github/' \
  --exclude 'deploy/' \
  --exclude 'docs/' \
  ./ \
  deploy@YOUR_DROPLET:/var/www/portfolio/
```

**Never drop `deploy/` or `docs/` into the document root** — only static assets belong there.

Ensure **`assets/documents/`** PDFs and **`services/*.html`** are included.

### 6. DNS cutover

Lower TTL briefly (e.g. 300s). **A**/**AAAA** for **`www`** → droplet. Apex → droplet (or provider-equivalent). Verify:

```bash
dig +short www.payam-dehkordy.com
curl -sI https://www.payam-dehkordy.com/
```

### 7. GitHub Pages

**Settings → Pages → Build and deployment:** **None**. Single production origin avoids split traffic.

After Pages is off, remove the repo file **`CNAME`** if you no longer use Pages — it only signals GitHub’s custom domain feature.

### 8. Smoke tests

- [ ] **`https://www.payam-dehkordy.com/`** — **200**, certificate valid.
- [ ] **`http://`** redirects to **`https://www.…`**
- [ ] **`https://payam-dehkordy.com/`** → **301** → **`https://www.payam-dehkordy.com/`**
- [ ] **`/services/…`**, **`/assets/…`**, PDFs.
- [ ] Formspree (if used): allowed domain / form settings still match **`www.payam-dehkordy.com`**.
- [ ] **`robots.txt`**, **`sitemap.xml`**, canonical meta.

### 9. CI (optional; ChiKoja-style)

- Secrets aligned with ChiKoja naming where possible: **`SSH_HOST`**, **`SSH_PORT`**, **`SSH_USER`**, **`SSH_PRIVATE_KEY_B64`**, **`SSH_TARGET_DIR`** = **`/var/www/portfolio`**.
- Pipeline: rsync with the **same excludes** as §5 → optionally **`scp deploy/nginx-portfolio.conf`** to **`/tmp/portfolio-nginx.conf`** → **`sudo cp`** into **`sites-available`** (see **[`deploy/sudoers-portfolio-deploy.example`](../deploy/sudoers-portfolio-deploy.example)**) → **`nginx -t`** → **`reload`**.

---

## Rollback

1. Point DNS **`www`** back to GitHub Pages (see current GitHub Pages documentation for records).
2. Re-enable Pages in the repo.
3. Restore **`CNAME`** if Pages expects **`www.payam-dehkordy.com`**.

---

## Phase 2 — Referral mail API (outline)

Server-side send as **`payam.dehkordy@gmail.com`** needs Gmail API or SMTP credentials on the host (`chmod 600`), rate limits, and abuse controls. Document in **`docs/REFERRAL_API.md`** when built — not part of Phase **1**.

---

## Related docs

| Doc | Use |
|-----|-----|
| [ChiKoja **DEPLOYMENT.md**](https://github.com/Payam-Dehkordy/ChiKoja/blob/main/docs/DEPLOYMENT.md) | Droplet habits, Nginx install flow, Actions/sudoers patterns. |
| [NeoGym **DOMAIN_CUTOVER.md**](https://github.com/Payam-Dehkordy/NeoGym/blob/main/docs/DOMAIN_CUTOVER.md) | DNS/TLS cutover checklist (PHP **`base_url`** does not apply here; same DNS discipline). |

---

## Summary

| Question | Answer |
|----------|--------|
| Document root on VPS | **`/var/www/portfolio`** |
| Canonical Nginx in git | **`deploy/nginx-portfolio.conf`** |
| Serve **`deploy/`** from the URL | **No** — exclude from rsync |
