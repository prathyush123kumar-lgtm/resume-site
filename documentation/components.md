# Components

*Note: Because this project uses Vanilla HTML/JS instead of a framework like React or Vue, components are not isolated into `.jsx` or `.vue` files. However, they are logically separated in the DOM and JavaScript.*

## 1. Project Card
- **Location:** Generated dynamically in `scripts/main.js` (inside `renderProjects`).
- **Purpose:** Displays a single project.
- **Inputs:** A `project` object (title, description, link, techStack array).
- **Outputs:** An HTML `<div>` with the class `.project-card`.
- **Where it is used:** Inside the `#projects-container` grid.

## 2. Timeline Item
- **Location:** Generated dynamically in `scripts/main.js`.
- **Purpose:** Displays an education milestone or skill category.
- **Where it is used:** Inside the `#skills-container` `.timeline`.

## 3. Command Palette
- **Location:** `pages/index.html` (HTML `<dialog>`), `scripts/main.js` (Logic).
- **Purpose:** Quick search and navigation.
- **Dependencies:** Listens globally to `keydown` (`Ctrl+K`).
- **How to safely modify:** To add new commands, append objects to the `commands` array in `main.js`: `{ name: 'Action Name', action: () => { ... } }`.

## 4. Contact Form
- **Location:** `pages/index.html`
- **Purpose:** Allows users to send messages.
- **Outputs:** Emits a `submit` event intercepted by `main.js`, which then fires a `POST` request to `http://localhost:4000/api/contact`.
