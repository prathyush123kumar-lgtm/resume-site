# Project Overview

## Project Name
EPK Personal Resume & Portfolio

## Purpose
A professional, lightning-fast, and secure personal website that serves as a digital resume and project showcase for E Prathyush Kumar.

## Main Objective
To achieve a professional-grade online presence that guarantees a 100/100 Lighthouse score while providing dynamic functionality without the bloat of heavy frontend frameworks.

## Intended Users
Recruiters, hiring managers, and other developers looking to view the owner's portfolio, skills, and contact them securely.

## Main Functionality
- **Dynamic Portfolio:** Loads project and skill data dynamically from a central JSON file.
- **Theme Engine:** Built-in light/dark mode toggle.
- **Command Palette:** Quick navigation and actions via `Ctrl+K`.
- **Interactive Timeline:** A visually appealing representation of education and experience.
- **Secure Contact:** A backend-powered contact form that protects against spam, XSS, and payloads.

## Current Project Status
**Active / Production Ready**
The core MVP is fully implemented including the frontend UI, responsive styling, and backend Express/Prisma API.

## Major Technologies Used
- **Frontend:** Vanilla HTML5, CSS3 (Custom Properties), Vanilla ES6 JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite with Prisma ORM
- **Security:** Helmet, express-rate-limit

## High-Level Architecture
The project uses a split architecture:
1. **Static Frontend:** Served directly (e.g., via a static server or CDN). The frontend uses client-side JavaScript to fetch `resume-data.json` and build the DOM.
2. **Dynamic Backend:** An Express.js REST API running alongside the frontend that specifically handles the Contact Form submission and securely writes to a local SQLite database.
