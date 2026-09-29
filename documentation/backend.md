# Backend

The backend is an independent micro-service used to handle stateful and sensitive operations.

## Server Technology
- **Runtime:** Node.js
- **Framework:** Express.js
- **Port:** 4000 (Default)
- **Entry Point:** `backend/server.js`

## Middleware
- `helmet()`: Hardens HTTP headers.
- `cors()`: Allows cross-origin requests from the frontend (Port 3000 to Port 4000).
- `express.json()`: Parses incoming JSON payloads with a strict 10kb limit.
- `apiLimiter`: Express rate limiter restricting standard API hits (100 req / 15 min).
- `contactLimiter`: Stricter rate limiter specifically for the contact form (5 req / 15 min).

## API Endpoints

### 1. Health Check
- **Endpoint:** `GET /api/health`
- **Purpose:** Verifies the server is alive.
- **Response:** `{ "status": "OK" }`

### 2. Contact Submission
- **Endpoint:** `POST /api/contact`
- **Purpose:** Receives, validates, sanitizes, and stores messages from the frontend form.
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello!",
    "cfTurnstileResponse": "optional-token"
  }
  ```
- **Validation:** 
  - Required fields check.
  - Regex validation for email format.
  - Length limits (`name` < 100, `email` < 150, `message` < 2000).
- **Sanitization:** Converts `<` and `>` into HTML entities to prevent XSS.
- **Success Response:** `201 Created` - `{ "success": true, "id": 1 }`
- **Error Responses:** `400 Bad Request` (Invalid input) or `500 Internal Server Error` (DB failure).

### 3. Raw Resume Data
- **Endpoint:** `GET /api/resume/raw`
- **Purpose:** An alternative way to fetch the resume data via the backend rather than the static filesystem. Reads `../resume/resume-data.json`.
- **Response:** The full JSON object.
