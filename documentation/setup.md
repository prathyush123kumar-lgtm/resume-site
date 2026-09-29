# Setup Guide

Follow these instructions to get the Resume Website running locally from a completely fresh machine.

## 1. Required Software
- Node.js (v18 or higher)
- NPM (comes with Node)
- Git (optional, for cloning)

## 2. Open Project
Clone or copy the repository to your local machine, and open a terminal inside the project root directory (`resume-site`).

## 3. Install Dependencies
The backend requires specific dependencies to function (Express, Prisma).
```powershell
cd backend
npm install
```

## 4. Initialize Database
You must generate the Prisma client and push the schema to create the local SQLite database.
```powershell
npx prisma db push --schema=../database/prisma/schema.prisma
```
*(If prompted to create the file, accept).*

## 5. Fetch Assets
To ensure your project cards have images without hotlinking, run the asset downloader script from the root folder:
```powershell
cd ..
node scripts/setup-assets.js
```
*Note: This will download placeholder images into `assets/images/`.*

## 6. Start the Backend API
Start the Express server to handle contact forms.
```powershell
cd backend
node server.js
```
*The backend is now running at http://localhost:4000.*

## 7. Start the Frontend
In a **new terminal window** at the project root, start a static file server. You can use `serve`:
```powershell
npx -y serve -p 3000
```
*The frontend is now running at http://localhost:3000.*

## 8. Verify Installation
Open your browser and navigate to `http://localhost:3000/pages/index.html`.
- You should see the fully styled website.
- Skeletons should flash briefly before data loads.
- Submit a test contact form; if it says "Message sent successfully", your database is working!
