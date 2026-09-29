# Assets

The asset system is designed for local hosting to ensure maximum performance and privacy. Hotlinking external images is strictly avoided in production code.

## Folder Structure
Assets are stored in `assets/`:
- `assets/images/`
- `assets/icons/` (Not heavily used currently)
- `assets/fonts/` (Not heavily used, relying on system fonts or generic sans-serif for performance)

## Automatic Asset Acquisition
Instead of committing large binaries to the repository initially, the project uses an automated script to fetch copyright-free placeholder images.

**Script:** `scripts/setup-assets.js`

### How it works:
1. Identifies the number of projects inside `resume-data.json`.
2. Downloads a matching number of images from a copyright-free API (like Picsum).
3. Saves them to `assets/images/project-1-placeholder.jpg`, `project-2-placeholder.jpg`, etc.

### Licensing
Only royalty-free/copyright-free image sources are permitted to be used by the script to avoid copyright infringement.

### Referencing Assets
Inside `main.js`, image paths are constructed relative to the static server root:
`../assets/images/project-${index + 1}-placeholder.jpg`
