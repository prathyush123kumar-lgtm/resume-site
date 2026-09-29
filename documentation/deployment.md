# Deployment

The frontend and backend must be deployed separately, or behind a reverse proxy that routes traffic appropriately.

## 1. Frontend Deployment (Static Hosting)
Because the frontend consists entirely of static files (HTML, CSS, JS) that fetch data at runtime, it can be hosted on any static edge network.
- **Recommended Platforms:** Vercel, Netlify, GitHub Pages, or Cloudflare Pages.
- **Build Command:** None (No build step required).
- **Publish Directory:** The root directory (`/`).
- **Asset Handling:** Ensure you run `node scripts/setup-assets.js` locally and commit the `assets/` folder to Git *before* deploying, so the host has the images.

## 2. Backend Deployment (Node.js Server)
The backend requires a persistent Node.js environment to run Express and write to SQLite.
- **Recommended Platforms:** Render, Heroku, DigitalOcean App Platform, or a cheap VPS.
- **Start Command:** `node server.js`
- **Database:** Since SQLite writes to a local file, serverless environments (like AWS Lambda or Vercel Functions) **will not work** because the file system is ephemeral. You must use a stateful host with persistent disk storage for `dev.db`.
- **Environment Variables Required in Prod:**
  - `PORT=80` (or whatever the host provides)
  - `NODE_ENV=production`
  - `FRONTEND_ORIGIN=https://your-portfolio-domain.com` (CRITICAL for CORS security).

## Post-Deployment
After deploying both:
1. Update `scripts/main.js` on the frontend so the `fetch` URL points to your deployed backend URL instead of `http://localhost:4000/api/contact`.
