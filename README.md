# Payam Dehkordy – Portfolio Website

A modern, responsive portfolio showcasing my expertise as a Staff Software QA Automation Engineer and Full Stack Developer.

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

---

## 📁 Project Structure

```
/assets/
  /images/         # Project, branding, and logo images
  /documents/      # CV/Resume and other docs
  /Logo/           # Brand/company SVGs and icons
index.html         # Main portfolio HTML
styles.css         # Main CSS/style
script.js          # Main JS/interactivity
README.md          # (this file)
```

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
- Social/contact icons for email, phone, LinkedIn, and GitHub
- All social icons open in new tabs for seamless networking

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

**In this repo:** `deploy/nginx-portfolio.conf`, `deploy/nginx-portfolio-bootstrap-http80.conf`, `deploy/sudoers-portfolio-deploy.example`, **`mail-service/`** (posts to **`/api/mail`** via **Gmail API** only — **From:** **`payam.dehkordy@gmail.com`**). Automated deploy: **`.github/workflows/deploy.yml`** (rsync excludes **`deploy/`**, **`docs/`**, **`mail-service/`** from the web root; CI syncs **`mail-service/`** separately to **`/opt/portfolio-mail`**). One-time on the droplet: **`/etc/portfolio-mail.env`** from **`mail-service/portfolio-mail.env.example`** — [**Droplet — PORTFOLIO_HOSTING.md § Phase 2**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/PORTFOLIO_HOSTING.md). SSH secrets and **`SSH_TARGET_DIR`** = **`/var/www/portfolio`**: [**Droplet — SSH_KEYS_AND_ACTIONS.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/SSH_KEYS_AND_ACTIONS.md) and [**CI_AND_SECRETS.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/CI_AND_SECRETS.md).

**Why two workflows on GitHub?** If you also see **“pages build and deployment”**, **GitHub Pages** is still turned on for this repo. That job is created by GitHub (not by a file in this repo). Production is the **droplet** only — open **Settings → Pages → Build and deployment**, set **Source** to **None** (disable Pages) so only **Deploy Portfolio (static)** runs on push.

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

