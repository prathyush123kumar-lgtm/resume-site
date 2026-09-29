# Features

## IMPLEMENTED

**1. Dynamic Data Loading**
- **What it does:** The UI is populated dynamically from a single JSON file.
- **Where:** `scripts/main.js` and `resume/resume-data.json`.
- **How it works:** JavaScript fetches the JSON on page load and dynamically builds the Project Cards and Skills Timeline DOM elements.

**2. Dark/Light Theme Engine**
- **What it does:** Allows users to toggle between dark and light modes, persisting the choice.
- **Where:** `styles/global.css` (CSS variables) and `scripts/main.js` (localStorage).
- **How it works:** Toggles a `data-theme` attribute on the `<html>` tag.

**3. Skeleton Loading States**
- **What it does:** Displays pulsing placeholders while data is fetching.
- **Where:** `pages/index.html` (default DOM state) and `styles/global.css` (CSS animations).

**4. Command Palette (Ctrl+K)**
- **What it does:** A keyboard-driven quick menu for navigating the site or executing commands.
- **Where:** `pages/index.html` (modal), `styles/global.css` (Glassmorphism backdrop), `scripts/main.js` (Event listener and search logic).

**5. Project Filtering**
- **What it does:** Allows filtering of the projects grid by clicking on technology tags.
- **Where:** `scripts/main.js`.
- **How it works:** Dynamically extracts unique tags from the JSON and re-renders the grid based on the active filter.

**6. Interactive Timeline**
- **What it does:** Displays education and skills in a staggered vertical timeline.
- **Where:** `styles/global.css`.

**7. Secure Contact Form API**
- **What it does:** Accepts contact messages and saves them to a database securely.
- **Where:** `backend/server.js`.
- **How it works:** Uses Express, validates email regex, strips HTML tags (XSS protection), checks length limits, and limits requests (rate limiting).

**8. Custom 404 Page**
- **What it does:** Branded error page for broken links.
- **Where:** `pages/404.html`.

## PARTIALLY IMPLEMENTED

**1. CAPTCHA / Bot Protection**
- **What it does:** Cloudflare Turnstile integration to prevent bot spam.
- **Status:** The HTML placeholder and the backend logic check exist, but it requires actual Cloudflare keys to be injected to function fully.

## PLANNED / NOT YET IMPLEMENTED
- Search functionality inside the projects grid (text-based).
- Automated CI/CD deployment pipeline.
