# 🌐 E. Prathyush Kumar — Personal Resume Website

[![CI/CD](https://github.com/prathyush123kumar-lgtm/resume-site/actions/workflows/ci.yml/badge.svg)](https://github.com/prathyush123kumar-lgtm/resume-site/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A modern, secure, full-stack personal portfolio and resume website for **E. Prathyush Kumar** — Information Science Engineering student at St. Aloysius (Deemed to be University), Mangaluru.

---

## ✨ Features

- **Dark / Light Mode** — Persistent theme toggle using CSS variables and `localStorage`
- **Typing Effect Hero** — Cycling role animation with pure vanilla JS
- **Dynamic Projects** — Project cards loaded from `resume-data.json` with category filter buttons
- **Interactive Timeline** — Scroll-animated education and project history
- **Working Contact Form** — Backend-validated, rate-limited, with toast notifications
- **Linktree-style Links Page** — Mobile-optimised social links hub
- **Documentation / Blog** — Markdown articles rendered to HTML via the backend
- **Security Hardened** — Helmet, CORS, rate-limiting, XSS protection, parameterised queries
- **SEO Ready** — sitemap.xml, robots.txt, Open Graph tags, semantic HTML
- **CI/CD Pipeline** — GitHub Actions for automated testing and deployment

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | HTML5, CSS3 (custom design system), Vanilla JavaScript |
| Backend    | Node.js, Express.js |
| Database   | SQLite (via Prisma ORM) |
| Security   | Helmet, CORS, express-rate-limit, DOMPurify |
| Docs/Blog  | Markdown + marked + DOMPurify |
| CI/CD      | GitHub Actions → Vercel (frontend) + Render (backend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ ([nodejs.org](https://nodejs.org))
- npm v9+

### 1. Clone the repository
```bash
git clone https://github.com/prathyush123kumar-lgtm/resume-site.git
cd resume-site
```

### 2. Install dependencies
```bash
# Backend dependencies
cd backend
npm install
cd ..
```

### 3. Set up environment variables
```bash
cp backend/.env.example backend/.env
# Open backend/.env and fill in your values
```

### 4. Set up the database
```bash
cd backend
npm run prisma:migrate -- --name init
npm run prisma:generate
npm run seed             # Populate with project data
cd ..
```

### 5. Run the development server
```bash
cd backend
npm run dev
# API available at http://localhost:4000
# Open pages/index.html directly in your browser OR
# serve the root folder with: npx serve .
```

---

## 📁 Project Structure

```
resume-site/
├── assets/              # Optional images, icons, downloadable PDF resume
├── database/            # Prisma schema, migrations, SQLite DB, seed script
├── documentation/       # Markdown case-study articles
├── pages/               # Complete HTML pages
│   ├── index.html       # Homepage (Hero, About, Skills, Projects, Contact)
│   ├── projects.html    # All projects with filter
│   ├── resume.html      # Resume timeline + skills
│   └── links.html       # Linktree-style social links hub
├── public/              # favicon.svg, robots.txt, sitemap.xml, manifest.json
├── resume/              # resume-data.json (single source of truth)
├── scripts/             # Client-side JavaScript modules
├── styles/              # CSS — global.css, components.css, animations.css
├── backend/             # Express server, .env, package.json
└── .github/workflows/   # GitHub Actions CI/CD
```

---

## 🔌 API Endpoints

| Method | Path               | Description                                   |
|--------|--------------------|-----------------------------------------------|
| GET    | `/api/health`      | Server health check                           |
| GET    | `/api/projects`    | List all projects (filter: `?category=web`)   |
| GET    | `/api/projects/:slug` | Single project by slug                     |
| POST   | `/api/contact`     | Submit a contact form message (rate-limited)  |
| GET    | `/api/resume/raw`  | 🥚 Easter egg: raw JSON resume                |
| GET    | `/api/docs`        | List all documentation articles               |
| GET    | `/api/docs/:slug`  | Render a markdown article as sanitised HTML   |
| GET    | `/api/stats`       | Site statistics                               |

---

## 🔐 Security

- **Secrets** stored in `.env` (never committed to Git)
- **SQL Injection** prevented by Prisma's parameterised query builder
- **XSS** prevented by DOMPurify (server-side markdown sanitisation) and `textContent` on the frontend
- **CSRF** mitigated by strict CORS (requests only accepted from the configured frontend origin)
- **Rate limiting** on all routes (100/min globally, 5/15min on `/api/contact`)
- **Helmet** sets security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- **Path traversal** prevention on all file-serving routes (slug validation regex)

---

## ✅ Validation

The repository currently uses syntax checks and Prisma schema validation; there is no separate test suite checked into the repository.

```bash
cd backend
npm ci
npm run check
npm run prisma:validate
npm audit --audit-level=high
```

---

## 📬 Contact

**E. Prathyush Kumar**
- 📧 [prathyush123kumar@gmail.com](mailto:prathyush123kumar@gmail.com)
- 🐙 [github.com/prathyush123kumar-lgtm](https://github.com/prathyush123kumar-lgtm)
- 📍 Mangaluru, Karnataka, India

---

## 📄 License

MIT © 2026 E. Prathyush Kumar
