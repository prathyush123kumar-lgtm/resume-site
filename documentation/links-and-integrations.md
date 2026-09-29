# Links and Integrations

## Cloudflare Turnstile (CAPTCHA)
- **Purpose:** Protect the contact form from automated spam bots.
- **Status:** **PARTIALLY IMPLEMENTED**.
- **Location:** The HTML placeholder exists in `pages/index.html`. The backend validation logic exists in `backend/server.js`.
- **Credentials:** Requires a `TURNSTILE_SECRET_KEY` in the `.env` file to fully activate. Without it, the backend skips the check.

## GitHub / LinkedIn
- **Purpose:** Social proof and networking.
- **Location:** Stored in `resume-data.json` under the `contact` object. Also hardcoded as a quick-action in the Command Palette in `main.js`.
- **Configuration:** Update the URLs directly in the JSON file.
