# Technology Stack

This is a complete inventory of the actual technologies and packages used in the project.

## Frontend
- **HTML5 & CSS3:** For structure and styling. Native CSS custom properties (variables) are used for the Light/Dark theme engine.
- **Vanilla JavaScript (ES6+):** Used for DOM manipulation, `fetch()` API calls, and event handling without the overhead of React/Vue.

## Backend (Node.js)
The backend uses Node.js with the following NPM packages (found in `backend/package.json`):

- **`express` (v4.x):** The core web server framework used to create the API endpoints.
- **`cors` (v2.x):** Middleware to allow the frontend (running on Port 3000) to communicate with the backend (Port 4000).
- **`helmet` (v7.x):** Security middleware that automatically sets HTTP response headers to protect against web vulnerabilities.
- **`express-rate-limit` (v7.x):** Middleware to limit repeated requests to public APIs (protects the contact form from spam).
- **`dotenv` (v16.x):** Loads environment variables from a `.env` file (e.g., ports, secrets).

## Database
- **`@prisma/client` & `prisma` (v5.x):** The Object-Relational Mapper (ORM) used to interact with the database. Prisma provides a type-safe database client.
- **SQLite:** A lightweight, file-based relational database (`dev.db`). Chosen because a resume site does not require a heavy standalone database server (like PostgreSQL) just to store contact messages.

## Development Tools
- **`node-fetch`:** Used by `setup-assets.js` to script automated image downloading.
