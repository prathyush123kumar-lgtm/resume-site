# Designing a Lectures Hub for University Students

## The Problem

Students in my university program frequently struggled to find specific lecture materials. Notes were scattered across WhatsApp groups, email threads, and personal drives. Finding the right PDF for the right lecture before an exam was frustrating and time-consuming.

I wanted to build something that centralised everything — a single, well-organised URL that anyone in my class could visit and immediately find what they needed.

## The Approach

The **Lectures Website** is a static site built with pure **HTML5 and CSS3**. I deliberately chose not to use any JavaScript frameworks or build tools — the goal was a site so simple and lightweight that it would load instantly even on slow mobile connections, which is a real constraint for many students.

## Design Decisions

### Information Architecture First
Before writing a single line of HTML, I sketched out the navigation structure on paper:

```
Home
├── Semester 1
│   ├── Subject A → Lectures, Notes, Resources
│   └── Subject B → Lectures, Notes, Resources
└── Semester 2
    └── ...
```

This hierarchy drove every structural decision in the markup.

### Accessibility Over Aesthetics
The site's primary users are fellow students, often viewing it on their phones, sometimes in low-light conditions (libraries, study rooms at night). I prioritised:
- High color contrast ratios (≥ 4.5:1) throughout.
- Large, legible link targets for easy tapping on mobile.
- Descriptive anchor text (never "click here").
- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`) for screen reader compatibility.

### Pure CSS Layout
I used **CSS Flexbox** for the navigation and **CSS Grid** for the lecture card layout. No frameworks like Bootstrap or Tailwind were used — this forced me to truly understand the layout model at a fundamental level.

## Results

Once shared with classmates, the site became a regular reference point before assignments and examinations. The feedback was clear: students valued the speed and simplicity over a more complex solution.

## Lessons Learned

This project reinforced a principle I now apply to every project: **the best interface is the one that gets out of the way**. Complexity is easy; restraint is hard. Writing clean, semantic HTML without a framework taught me the fundamentals that every web developer should know before reaching for tools that abstract them away.

---

*Part of E. Prathyush Kumar's portfolio — [View all projects](/pages/projects.html)*
