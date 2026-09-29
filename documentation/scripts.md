# Scripts

This project contains several scripts for frontend logic and build tooling.

## 1. Frontend Logic (`scripts/main.js`)
- **Location:** `scripts/main.js`
- **Purpose:** The core client-side controller. 
- **What it does:**
  - Initializes the dark/light theme engine using `localStorage`.
  - Sets up the `keydown` event listener for the Command Palette (`Ctrl+K`).
  - Fetches `resume-data.json`.
  - Extracts unique technology tags to generate the filtering UI.
  - Renders project cards and the skills timeline dynamically.
  - Intercepts the Contact Form submission and makes a secure `POST` request to the backend API.

## 2. Asset Acquisition Tool (`scripts/setup-assets.js`)
- **Location:** `scripts/setup-assets.js`
- **Purpose:** Automates the downloading of placeholder images for projects.
- **When it should be run:** Once, during initial project setup, or if you add new projects and need more placeholders. (Run via `node scripts/setup-assets.js`).
- **How it works:**
  - Reads `resume/resume-data.json` to count how many projects exist.
  - Connects to the Unsplash Source API (or Picsum).
  - Downloads copyright-free images sequentially.
  - Saves them directly into `assets/images/` using the naming convention `project-X-placeholder.jpg`.
- **Why it exists:** To ensure the local development environment has images without having to manually hunt for and download stock photos, and to avoid hotlinking external domains at runtime which hurts performance and privacy.
