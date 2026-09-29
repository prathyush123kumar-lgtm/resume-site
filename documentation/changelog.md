# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - Initial Release MVP

### Added
- **Frontend Core:** Established `index.html` and `global.css` with a responsive design, Hero section, and CSS-variable based Dark/Light theme toggle.
- **Dynamic Rendering:** Implemented `main.js` to fetch `resume-data.json` and dynamically render project cards and a visual timeline for education and skills.
- **Backend Infrastructure:** Created an Express.js API in `backend/server.js`.
- **Database:** Configured SQLite and Prisma ORM to store `ContactMessage` records.
- **Security:** Hardened the API using Helmet, CORS, and Express Rate Limiter.
- **Input Validation:** Added regex email validation and XSS HTML sanitization to the `/api/contact` route.
- **Asset Management:** Created `setup-assets.js` to dynamically download copyright-free images from external APIs to populate local image placeholders.
- **Command Palette:** Added a `Ctrl+K` interactive modal for quick navigation.
- **Project Filters:** Added dynamic tech-tag filter buttons above the projects grid.
- **Loading States:** Implemented CSS skeleton animations that pulse while `fetch` resolves.
- **Error Pages:** Designed a branded `404.html` page.
- **Documentation:** Created comprehensive markdown documentation suite.
