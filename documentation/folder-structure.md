# Folder Structure

This document outlines the purpose of every major directory in the repository.

```text
d:\paper\resume-site\
│
├── assets/             # Contains static media (images, icons, fonts). Downloaded dynamically via setup-assets.js.
├── backend/            # Contains the Node.js Express server (`server.js`) and backend `package.json`.
├── components/         # Directory designated for reusable HTML snippets or future framework components. (Currently empty/not utilized as logic is in main.js).
├── database/           # Contains the SQLite database (`dev.db`) and the Prisma schema (`prisma/schema.prisma`).
├── documentation/      # You are here. Contains all markdown documentation for the project.
├── links/              # Designated for managing external social links or redirects. (Currently empty).
├── node_modules/       # Standard npm dependencies (Prisma, Express, etc.).
├── pages/              # Contains the HTML entry points: `index.html` (Home) and `404.html` (Error page).
├── resume/             # Contains `resume-data.json` which acts as the central source of truth for all dynamic UI data.
├── scripts/            # Contains frontend JavaScript (`main.js`) and tooling scripts (`setup-assets.js`).
└── styles/             # Contains the CSS (`global.css`) handling responsive design, animations, and the theme engine.
```

## Important Files
- **`pages/index.html`:** The main entry point for the user.
- **`scripts/main.js`:** The core frontend controller.
- **`styles/global.css`:** The universal stylesheet.
- **`backend/server.js`:** The backend API server.
- **`database/prisma/schema.prisma`:** The database table definitions.
- **`scripts/setup-assets.js`:** A utility script to download copyright-free placeholder images locally.
