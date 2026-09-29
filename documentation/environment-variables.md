# Environment Variables

The backend utilizes environment variables to manage configuration and secrets safely. These should be placed in a `.env` file located in the `backend/` directory.

## Reference

| Variable Name | Required | Purpose | Example Placeholder |
|---------------|----------|---------|---------------------|
| `PORT` | Optional | The port the Express server will listen on. Defaults to 4000. | `PORT=4000` |
| `NODE_ENV` | Optional | Set to `production` to trigger production-only optimizations. | `NODE_ENV=production` |
| `FRONTEND_ORIGIN` | Optional | Used by CORS to restrict which domains can make API requests. Very important for production. | `FRONTEND_ORIGIN=https://myportfolio.com` |
| `TURNSTILE_SECRET_KEY` | Optional | The secret key provided by Cloudflare Turnstile to validate CAPTCHA tokens. If absent, the server skips CAPTCHA validation. | `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` |

**Security Warning:** Never commit your `.env` file containing real secret keys to version control. It is already ignored by default in standard Node.js `.gitignore` configurations.
