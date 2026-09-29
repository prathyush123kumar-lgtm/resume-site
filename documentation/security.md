# Security

Security has been a foundational priority, specifically concerning the backend Express API that handles user input.

## IMPLEMENTED Protections

**1. HTTP Header Hardening**
- **Implementation:** `helmet` middleware in `server.js`.
- **Protects against:** Clickjacking, MIME-sniffing, XSS, and enforces strict transport security (HSTS).

**2. Cross-Origin Resource Sharing (CORS)**
- **Implementation:** `cors()` middleware restricting access to the frontend origin (defaults to `*` but can be constrained via `FRONTEND_ORIGIN` env var).

**3. Rate Limiting**
- **Implementation:** `express-rate-limit` in `server.js`.
- **Protects against:** Brute force and Denial of Service (DoS) attacks.
- **Configuration:** 
  - Standard API routes: 100 requests per 15 minutes.
  - Contact Form (`/api/contact`): 5 requests per 15 minutes.

**4. Payload Size Limits**
- **Implementation:** `express.json({ limit: '10kb' })`.
- **Protects against:** Payload stuffing / memory exhaustion attacks.

**5. Input Validation**
- **Implementation:** Custom logic in `/api/contact`.
- **Protects against:** Invalid data formats. Email fields must match a valid regex pattern. Hard string length limits are enforced (e.g., messages max 2000 characters).

**6. XSS Mitigation (Output Escaping / Input Sanitization)**
- **Implementation:** Custom string replacement sanitization in `/api/contact`.
- **Protects against:** Cross-Site Scripting (XSS). `<` and `>` characters are converted to `&lt;` and `&gt;` before being stored in the database.

## PARTIALLY IMPLEMENTED

**1. Bot Protection (CAPTCHA)**
- **Implementation:** Turnstile logic exists but requires secret keys to activate.

## NOT APPLICABLE
- **Authentication/Authorization:** This is a public portfolio; there is no admin dashboard or user login system implemented.

## Security Improvements Recommended
- **Content Security Policy (CSP):** While Helmet provides basic CSP, a strictly defined CSP meta tag on the frontend `index.html` would further prevent unauthorized script execution.
- **Advanced Sanitization:** Replace the regex-based HTML escaping with a robust library like `DOMPurify` if complex HTML needs to be parsed in the future.
