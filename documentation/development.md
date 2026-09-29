# Development Guide

This guide explains how to perform common development tasks.

## How to Update Resume Data
To change the text, skills, or projects displayed on the website, you **do not** need to edit HTML or JavaScript.
1. Open `resume/resume-data.json`.
2. Edit the fields as needed.
3. Save the file.
4. Refresh your browser. 
*Note: The frontend fetches this file on every load.*

## How to Add a New Project
1. Open `resume/resume-data.json`.
2. Add a new object to the `projects` array:
   ```json
   {
     "title": "My New App",
     "description": "App description here.",
     "techStack": ["React", "Firebase"],
     "link": "https://github.com/..."
   }
   ```
3. Run the asset script to download a new placeholder image for this project:
   ```powershell
   node scripts/setup-assets.js
   ```

## How to Modify Styles
All styles are contained in `styles/global.css`. 
- To change the color scheme, edit the variables under `:root` (Light mode) and `[data-theme="dark"]` (Dark mode).

## How to Add an API Endpoint
1. Open `backend/server.js`.
2. Add a new Express route (e.g., `app.get('/api/my-route', ...)`).
3. Restart the backend server.

## How to Modify Database Structures
1. Open `database/prisma/schema.prisma`.
2. Add or modify your `model` blocks.
3. From the `backend` folder, apply the changes:
   ```powershell
   npx prisma db push --schema=../database/prisma/schema.prisma
   ```
