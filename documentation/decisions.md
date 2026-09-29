# Architectural Decisions

This document records the major design and architectural choices made during the development of this project.

## 1. Why Vanilla HTML/JS/CSS instead of React/Next.js?
**Decision:** We chose to build the frontend entirely in Vanilla web technologies.
**Reason:** Personal portfolios and resume websites are fundamentally static content. Loading a 150KB React bundle just to display text and basic theme-toggling is overkill and hurts Core Web Vitals. By using Vanilla JS and native CSS variables, the site guarantees near-instant load times (100/100 Lighthouse) and extreme simplicity.

## 2. Why a local SQLite database?
**Decision:** Used SQLite (`dev.db`) instead of PostgreSQL/MongoDB.
**Reason:** The only stateful requirement for this website is storing incoming contact messages. A full database cluster is expensive and adds unnecessary DevOps overhead. SQLite is a lightweight, zero-configuration file database that perfectly suits low-write applications like a personal contact form.

## 3. Why separate the Backend from the Frontend?
**Decision:** We run an Express server on Port 4000 and a static server on Port 3000.
**Reason:** This allows the frontend to be deployed cheaply/freely on any edge CDN (like GitHub Pages or Netlify). Only the tiny Node.js backend needs to be deployed to a stateful server, significantly reducing hosting costs and surface area for attacks.

## 4. Why use a JSON file for Resume Data?
**Decision:** We load `resume-data.json` at runtime via `fetch()`.
**Reason:** It separates content from presentation. The developer can update their entire website's content simply by editing one JSON file, without ever needing to touch HTML or JavaScript logic.

## 5. Why automated asset downloads?
**Decision:** Implemented `setup-assets.js`.
**Reason:** To prevent committing heavy, arbitrary binary files to the git repository during initial development, and to prevent hotlinking external image providers (which is a privacy and performance risk).
