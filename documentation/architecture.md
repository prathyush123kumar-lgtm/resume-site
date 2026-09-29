# Architecture

The application is built using a lightweight decoupled architecture. Although both the frontend and backend reside in the same repository (Monorepo-style), they function independently.

## Architecture Diagram

```text
Browser (Client)
   │
   ├── [Static Request] ──> Frontend Server (Port 3000)
   │                           ├── pages/index.html
   │                           ├── styles/global.css
   │                           └── scripts/main.js
   │
   ├── [Fetch JSON] ──────> Local Filesystem
   │                           └── resume/resume-data.json
   │
   └── [POST API] ────────> Backend Express Server (Port 4000)
                               ├── Security Middleware (Helmet, CORS)
                               ├── Rate Limiter
                               ├── API Route (/api/contact)
                               │      └── Sanitization & Validation
                               └── Prisma ORM
                                      └── SQLite Database (dev.db)
```

## Frontend Architecture
The frontend is strictly Vanilla HTML, CSS, and JS. 
- **`index.html`** provides the semantic skeleton.
- **`main.js`** handles the imperative UI logic (Theme toggling, fetching data, DOM manipulation for the timeline and project filters).
- **Data Flow:** The frontend fetches data from `../resume/resume-data.json` at runtime to populate the project cards and skills timeline.

## Backend Architecture
A micro-backend built with Express.js.
- **Entry point:** `backend/server.js`.
- It exists exclusively to handle dynamic, stateful operations that a static site cannot (specifically, securely handling contact form submissions).
- Includes strict rate-limiting to prevent abuse.

## Database Architecture
- **Engine:** SQLite (local file `dev.db`).
- **ORM:** Prisma Client.
- The database is currently used solely to store incoming contact messages safely.
