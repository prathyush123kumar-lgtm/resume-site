# Building a Document Conversion Web App with Python & Flask

## The Problem

During my first year at university, I constantly found myself juggling multiple online tools to handle simple document tasks — converting a Word file to PDF for submission, or compressing a large PDF before emailing it. Each task required a different website, many of which were slow, ad-heavy, or required email sign-ups.

The question became simple: *Why doesn't one clean, fast tool exist that handles all of this in one place?*

## The Solution

I began building the **Document Conversion Web App** — a browser-based tool built with **Python and Flask** that brings the most common document-handling tasks under a single, minimal interface.

### Core Features (Implemented)

- **Word to PDF conversion** — Upload a `.docx` file and receive a clean PDF.
- **PDF to Word conversion** — Extract and convert PDF content back to an editable `.docx` file.
- **File compression** — Reduce file sizes without significant quality loss, making large documents easier to share and store.

## Architecture Decisions

| Layer     | Technology  | Reason |
|-----------|-------------|--------|
| Backend   | Python, Flask | Flask's lightweight routing and Python's rich file-processing ecosystem (`python-docx`, `reportlab`, `PyPDF2`) make it the natural fit. |
| Frontend  | HTML5, CSS3 | Keeping the frontend simple and framework-free ensures fast load times and zero unnecessary JavaScript. |
| File I/O  | Temporary storage | Uploaded files are processed in memory or in temporary server storage and immediately cleaned up after the response is sent — no user data is retained. |

## Key Challenges

### 1. Font Embedding in PDF Conversion
Converting complex Word documents with custom fonts to PDF while preserving formatting proved tricky. Fonts that exist on the user's machine may not exist on the server. The solution was to rely on a well-maintained library (`python-docx2pdf`) combined with a fallback font substitution strategy.

### 2. File Size Limits
Handling large file uploads without blocking the server required implementing `streaming` uploads and setting sensible max-size limits at the Flask configuration level.

## Current Status

The core conversion engine is functional. The remaining work involves:
- Polishing error handling for corrupted or password-protected files.
- Adding a progress indicator for large file conversions.
- Deploying the Flask app to a cloud host (Render or Railway).

## Lessons Learned

This project taught me that **backend programming is about managing state carefully** — knowing exactly where a file is at any point in time, when it gets cleaned up, and what happens when something goes wrong. Python's exception handling and Flask's error handlers gave me a solid foundation for building reliable server-side logic.

---

*Part of E. Prathyush Kumar's portfolio — [View all projects](/pages/projects.html)*
