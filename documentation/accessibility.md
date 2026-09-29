# Accessibility (a11y)

This document outlines the accessibility features currently implemented in the project.

## IMPLEMENTED
- **Semantic HTML:** Usage of native `<header>`, `<nav>`, `<section>`, `<dialog>`, and `<footer>` tags to provide meaningful document structure to screen readers.
- **Heading Hierarchy:** Strictly follows H1 -> H2 -> H3 nesting on the main page.
- **Form Labels:** The contact form uses explicit `<label for="id">` bindings for all inputs and textareas, ensuring screen readers announce inputs correctly.
- **Required Fields:** Native HTML5 `required` attributes are used on form fields.

## NOT IMPLEMENTED / Recommended Improvements
- **ARIA Attributes:** The custom Command Palette modal and filtering system lack deep `aria-expanded` or `aria-controls` states.
- **Focus Trapping:** The Command Palette `<dialog>` does not currently trap keyboard focus perfectly when opened.
- **Alt Text:** Project images currently use generic alt text (e.g., "Project Title screenshot"). This should be updated to descriptive text in the JSON data.
