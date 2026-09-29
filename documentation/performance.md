# Performance

The project is designed to achieve a 100/100 Lighthouse performance score by minimizing bloat.

## IMPLEMENTED

**1. Zero Frontend Frameworks**
- By skipping React/Vue/Angular, the initial JavaScript bundle is practically zero. The site ships only a tiny `main.js` file.

**2. Skeleton Loading States**
- Instead of showing a blank screen while data is fetched, lightweight CSS animations (`.skeleton`) are displayed immediately, massively improving perceived performance and First Contentful Paint (FCP).

**3. Native CSS Variables**
- Theme toggling is handled entirely by swapping a single HTML attribute (`data-theme`), allowing the browser's native CSS engine to instantly repaint without heavy JavaScript calculations.

**4. Local Assets**
- Placeholder images are downloaded locally to `assets/images/` via script, preventing the browser from having to resolve multiple external DNS lookups at runtime.

## NOT IMPLEMENTED / Recommended Improvements
- **Image Optimization Pipeline:** Currently, whatever images the script downloads are served raw. A build step using tools like `sharp` to convert images to WebP/AVIF is recommended.
- **Lazy Loading:** `loading="lazy"` attributes should be added to the project card `<img>` tags.
- **Minification:** CSS and JS files are currently served un-minified.
