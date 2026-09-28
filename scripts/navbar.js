/**
 * navbar.js
 * Handles: navbar scroll shrink, hamburger mobile menu,
 * active nav link highlighting based on scroll position.
 */

document.addEventListener('DOMContentLoaded', function () {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections  = document.querySelectorAll('section[id]');
  const progress  = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');

  // ── Scroll: shrink navbar + progress bar + back-to-top ──
  function onScroll() {
    const scrollY = window.scrollY;
    const docH    = document.documentElement.scrollHeight - window.innerHeight;

    // Navbar shrink
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 80);
    }

    // Scroll progress bar
    if (progress) {
      progress.style.width = docH > 0 ? (scrollY / docH * 100) + '%' : '0%';
    }

    // Back-to-top visibility
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }

    // Active link highlighting (IntersectionObserver handles this too,
    // but fallback for browsers without it)
    highlightActiveLink();
  }

  function highlightActiveLink() {
    let currentId = '';
    sections.forEach(function (section) {
      const top = section.getBoundingClientRect().top;
      if (top <= 120) currentId = section.id;
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
      link.setAttribute('aria-current', href === currentId ? 'page' : 'false');
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load

  // ── Hamburger Menu ──
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      navMobile.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close mobile menu on link click
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Back To Top ──
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
