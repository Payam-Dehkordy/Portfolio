# Payam Dehkordy – Portfolio Website

A modern, responsive portfolio showcasing my work as a Staff Software Engineer — QA Automation | Full-Stack Development | EDA Quality | AI Agent & Workflow Automation.

---

## 🚀 Live Demo

**Production:** [https://www.payam-dehkordy.com](https://www.payam-dehkordy.com)

---

## 📋 About

This portfolio features:
- **Modern, Minimal Coding-Style Design**
- **Responsive Layout** for all device sizes
- **Smooth Animations** powered by CSS/JS
- **Professional Experience** timeline and company history
- **Skills & Technologies** presented by category
- **Portfolio Projects** from QA automation to full stack and branding work
- **Contact Integration** with interactive social/profile icons

---

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling:** CSS Grid, Flexbox, responsive breakpoints
- **Animations:** CSS Transitions, JS Intersection Observer
- **Typography:** JetBrains Mono (for code aesthetic look)
- **Production contact mail:** `mail-service/` (FastAPI + Gmail API on the VPS — see Deploying).

---

## 📁 Project Structure

```
/assets/
  /images/         # Project, branding, and logo images
  /documents/      # CV/Resume and other docs
  /logo/           # Payam brand logos, favicon, OG thumbnail
  /companies/      # Employer logos (experience timeline)
deploy/            # nginx vhost, sudoers — canonical copies for the droplet (not rsync’d to web root)
mail-service/      # FastAPI app → POST /api/mail (Gmail API); deployed to /opt/portfolio-mail on VPS
  portfolio-mail.env.example   # mirror → server /etc/portfolio-mail.env (see Droplet docs)
  setup_gmail_oauth.py         # one-time OAuth helper for GMAIL_* secrets
.github/workflows/
  deploy.yml       # CI: static site + mail-service to droplet
index.html         # Main portfolio HTML
styles.css         # Main CSS/style
script.js          # Main JS/interactivity
README.md          # (this file)
```

Production mail uses this repo’s **`mail-service`** (Gmail API over HTTPS): **contact form** (`kind: contact`), **QA scorecard** (`kind: scorecard`), and **referral introductions** (`kind: referral`, colleague email + honeypot). Same **`POST /api/mail`** proxy — not client-side mailto only.

---

## 🎯 Key Features

### Professional Experience Timeline
- Interactive timeline of roles
- Company logos and details with smooth scroll

### Skills & Expertise
- Technical skills grouped by area (Full Stack, Automation, QA & Testing, Design, Tools)
- Modern professional structure

### Portfolio Section
- Real-world QA, full stack, and branding projects
- All project links open in new tabs for convenience
- Image previews, company logos, and project details

### Contact Section
- Contact form (general inquiries), CV PDF downloads, **Refer me** (sends an introduction email to a colleague via `kind: referral`)
- Social/contact icons for email, phone, LinkedIn, and GitHub (open in new tabs where applicable)

---

## 🚦 Getting Started

### Prerequisites
- Modern web browser

### Installation
1. Clone the repo:
   ```
   git clone https://github.com/Payam-Dehkordy/Portfolio.git
   ```
2. Navigate to the directory:
   ```
   cd Portfolio
   ```
3. Open `index.html` directly, or use a local server for best results:
   ```
   python -m http.server 8000
   # or
   npx serve .
   ```

---

## 🌐 Deploying

**Hosting (single source of truth):** [**Droplet — docs/PORTFOLIO_HOSTING.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/PORTFOLIO_HOSTING.md) — DNS, TLS, Cloudflare (**Full (strict)**), nginx, sudoers, CI.

**In this repo:** `deploy/nginx-portfolio.conf`, `deploy/nginx-portfolio-bootstrap-http80.conf`, `deploy/sudoers-portfolio-deploy.example`, **`mail-service/`** (posts to **`/api/mail`** via **Gmail API** only — **From:** **`payam.dehkordy@gmail.com`**). Automated deploy: **`.github/workflows/deploy.yml`** (rsync excludes **`deploy/`**, **`docs/`**, **`mail-service/`** from the web root; CI syncs **`mail-service/`** separately to **`/opt/portfolio-mail`**). One-time on the droplet: **`/etc/portfolio-mail.env`** — mirror **`mail-service/portfolio-mail.env.example`** (same variables + comments; fill secrets on the server only) — [**Droplet — PORTFOLIO_HOSTING.md § Phase 2**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/PORTFOLIO_HOSTING.md). SSH secrets and **`SSH_TARGET_DIR`** = **`/var/www/portfolio`**: [**Droplet — SSH_KEYS_AND_ACTIONS.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/SSH_KEYS_AND_ACTIONS.md) and [**CI_AND_SECRETS.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/CI_AND_SECRETS.md).

**Mail env (`/etc/portfolio-mail.env`):** Mirror **`mail-service/portfolio-mail.env.example`** on the droplet (same convention as other apps — see [**Droplet — SERVER_CONVENTIONS.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/SERVER_CONVENTIONS.md) § Environment files). Full steps: [**Droplet — PORTFOLIO_HOSTING.md § Phase 2**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/PORTFOLIO_HOSTING.md). Never commit real secrets.

**Why two workflows on GitHub?** If you also see **“pages build and deployment”**, **GitHub Pages** is still turned on for this repo. That job is created by GitHub (not by a file in this repo). Production is the **droplet** only — open **Settings → Pages → Build and deployment**, set **Source** to **None** (disable Pages) so only **Deploy Portfolio (static)** runs on push.

---

## 🧭 Arc.dev job applications

- **Playbook (internal)**: `docs/ARC_DEV_JOB_APPLICATION_PLAYBOOK.md` (fit/chance rubric + copy/paste templates)

---

## 📱 Responsive UI

- Breakpoints for Desktop, Tablet, and Mobile
- Fully responsive, optimized for all screen sizes

---

## 🎨 Design Principles

- **Minimalist**: Clean and uncluttered interface
- **Professional**: Senior/corporate-ready look
- **Coding-Esque**: Monospace code-style font
- **Themed Accents**: Gold highlights everywhere
- **Accessible**: High-contrast, readable for all
- **Performance**: Fast loading, lightweight

---

## 📞 Contact

- **Email**: payam.dehkordy@gmail.com
- **LinkedIn**: [linkedin.com/in/payam-dehkordy](https://www.linkedin.com/in/payam-dehkordy)
- **GitHub**: [github.com/Payam-Dehkordy](https://github.com/Payam-Dehkordy)
- **Phone**: +374 55252581
- **Location**: Yerevan, Armenia

---

## 📄 License

MIT License

---

**Built with ❤️ by Payam Dehkordy**

