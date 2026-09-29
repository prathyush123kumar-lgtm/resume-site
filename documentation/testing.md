# Testing

## Status
**Testing Framework:** Not currently implemented.

There are currently no automated unit, integration, or end-to-end tests present in the repository (e.g., no Jest, Mocha, or Cypress configurations).

## Recommended Testing Plan (Future)
When automated testing is introduced, the following plan is recommended:

1. **Unit Testing (Backend):**
   - Framework: `Jest` or `Vitest`.
   - Focus: Test the regex email validation logic, the HTML string sanitization function, and ensure rate-limiting triggers appropriately.
2. **Integration Testing (Database):**
   - Setup an in-memory SQLite database for tests.
   - Test `Prisma` creates and retrieves records successfully.
3. **End-to-End Testing (Frontend):**
   - Framework: `Playwright` or `Cypress`.
   - Focus: Test the theme toggle, ensure the Command Palette opens on `Ctrl+K`, verify project filtering UI, and submit the contact form.
