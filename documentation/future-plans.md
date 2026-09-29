# Future Plans

This document outlines potential future enhancements for the project. Note that these are **PLANNED** and **NOT YET IMPLEMENTED**.

## HIGH PRIORITY
- **Image Optimization Pipeline:** Implement a build step (using `sharp` or a similar tool) to convert the downloaded placeholder JPEGs into modern formats like WebP or AVIF, and resize them responsively.
- **Dynamic Fetch URL:** Update `main.js` so the `fetch()` URL for the contact form switches from `localhost:4000` to the production backend URL automatically based on the environment.

## MEDIUM PRIORITY
- **Cloudflare Turnstile Enforcement:** Procure actual Turnstile sitekeys/secret keys and fully enforce CAPTCHA on the backend to harden against bot spam.
- **Search Functionality:** Add text-based searching to the Command Palette (or project grid) to allow users to type and filter projects by name, not just by clicking tech tags.
- **Testing Suite:** Add Jest for backend API tests and Playwright for frontend E2E testing.

## LOW PRIORITY
- **GitHub API Integration:** Instead of manually defining projects in `resume-data.json`, write a script that pulls the user's top pinned repositories directly from the GitHub API and updates the JSON file automatically.
- **CI/CD Pipeline:** Add GitHub Actions workflows to automatically lint, test, and deploy the application when changes are pushed to the `main` branch.
