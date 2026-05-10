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

**Production:** DigitalOcean droplet — web root **`/var/www/portfolio`**, canonical nginx **`deploy/nginx-portfolio.conf`**. Full checklist (bootstrap TLS, DNS, GitHub Pages): [**Droplet → PORTFOLIO_HOSTING.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/PORTFOLIO_HOSTING.md). Pointer only in-repo: [**docs/DROPLET_MIGRATION_ROADMAP.md**](docs/DROPLET_MIGRATION_ROADMAP.md).

### GitHub Actions (automated deploy)

On push to **`main`** / **`master`**, or **workflow_dispatch**, **`.github/workflows/deploy.yml`** rsyncs the static tree (excludes **`deploy/`**, **`docs/`**, **`.github/`**, **`CNAME`**, **`README.md`**) and uploads **`deploy/nginx-portfolio.conf`** to **`/tmp/portfolio-nginx.conf`**, then installs it with passwordless sudo.

**Repository secrets:** `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY_B64`, **`SSH_TARGET_DIR`** = **`/var/www/portfolio`** (required exact match). Optional `SSH_PORT` (default **22**). Windows **`do_chikoja`** / **`do_portfolio`** keys & PowerShell base64: [**Droplet → SSH_KEYS_AND_ACTIONS.md**](https://github.com/Payam-Dehkordy/Droplet/blob/main/docs/SSH_KEYS_AND_ACTIONS.md).

**One-time on the droplet:** install **`deploy/sudoers-portfolio-deploy.example`** for your deploy user; TLS bootstrap uses **`deploy/nginx-portfolio-bootstrap-http80.conf`** (see Droplet doc §3). Until **`/etc/letsencrypt/live/www.payam-dehkordy.com/fullchain.pem`** exists, the workflow **rsyncs only** and prints a **warning** (so nginx is not broken by missing cert paths). After Certbot and disabling the bootstrap **`sites-enabled`** symlink (Droplet §4), re-run the workflow to install the canonical vhost.

**Legacy:** GitHub Pages — disable after DNS points at the droplet; then remove **`CNAME`** from this repo if desired.

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

