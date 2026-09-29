# Pages

## 1. Home Page
- **Filename:** `pages/index.html`
- **URL/Path:** `/pages/index.html` (or `/` when deployed appropriately)
- **Purpose:** The primary landing page and single-page portfolio.
- **Main Sections:**
  - **Header/Nav:** Logo and Theme Toggle.
  - **Hero Section:** Introduction and summary.
  - **Projects:** Dynamic grid of filtered projects.
  - **Timeline:** Education and categorized skills.
  - **Contact:** Secure contact form.
- **Data Used:** Relies heavily on `../resume/resume-data.json`.
- **Special Functionality:** Houses the hidden Command Palette `<dialog>` modal triggered by `Ctrl+K`.
- **Responsive Behavior:** CSS Media queries adjust the timeline from staggered (desktop) to left-aligned (mobile) and collapse grids into single columns.

## 2. 404 Error Page
- **Filename:** `pages/404.html`
- **URL/Path:** `/pages/404.html`
- **Purpose:** Displayed when a user navigates to a non-existent route.
- **Main Sections:** 
  - Header (identical to Home).
  - Error Message ("Oops! Page Not Found") with a return button.
  - Footer.
- **Special Functionality:** Includes isolated theme-toggling script so the 404 page respects the user's Dark/Light preference even if `main.js` fails to load.
