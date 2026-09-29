# Troubleshooting

## 1. Symptom: NPM commands fail with execution policy error
- **Error Message:** `File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.`
- **Cause:** Windows PowerShell Execution Policy is restricting script execution.
- **Solution:** 
  Either run PowerShell as Administrator and execute `Set-ExecutionPolicy RemoteSigned`, or simply use `cmd.exe /c "npm install"` to bypass the PowerShell restriction.

## 2. Symptom: Prisma schema not found
- **Error Message:** `Error: Could not find Prisma Schema that is required for this command.`
- **Cause:** You ran `npx prisma db push` inside the `backend` folder, but the schema is located in `database/prisma/schema.prisma`.
- **Solution:** Run the command with the explicit schema path: 
  `npx prisma db push --schema=../database/prisma/schema.prisma`

## 3. Symptom: Contact form fails to send (Network Error)
- **Error Message (Browser Console):** `CORS error` or `Failed to fetch`.
- **Cause:** The frontend is attempting to reach the backend on `localhost:4000`, but the backend server is not running.
- **Solution:** Ensure you have opened a terminal in the `backend/` directory and ran `node server.js`. Verify it says "Server running on http://localhost:4000".

## 4. Symptom: "Input too long" error on contact form
- **Cause:** The user attempted to submit a message longer than 2000 characters, or a name/email exceeding bounds.
- **Solution:** The backend validation is working exactly as intended.

## 5. Symptom: Broken images on the projects grid
- **Cause:** The placeholder images were not downloaded locally.
- **Solution:** Run `node scripts/setup-assets.js` from the root directory to populate the `assets/images/` folder.
