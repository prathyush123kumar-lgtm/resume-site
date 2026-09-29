# SEO (Search Engine Optimization)

## IMPLEMENTED
- **Page Titles:** `<title>` tag is defined in the `<head>`.
- **Semantic HTML:** Use of `<h2>` and `<h3>` tags helps search engine crawlers understand content hierarchy.
- **Performance:** Because the frontend is incredibly lightweight, search engines will rank it favorably based on Core Web Vitals.

## NOT IMPLEMENTED / Recommended Improvements
- **Meta Descriptions:** Missing `<meta name="description">`.
- **Open Graph (OG) Tags:** Missing tags for social sharing previews (Twitter/LinkedIn cards).
- **Server-Side Rendering (SSR):** Because the projects are injected via client-side JavaScript (`fetch`), some strict search engine crawlers might not index the dynamic content perfectly. (Though modern Googlebot executes JS).
- **Sitemap/robots.txt:** No `sitemap.xml` or `robots.txt` is currently provided.
