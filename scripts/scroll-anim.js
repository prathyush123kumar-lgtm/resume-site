/**
 * scroll-anim.js
 * Uses IntersectionObserver to trigger CSS animations on elements
 * with the class "animate-on-scroll" as they enter the viewport.
 */

document.addEventListener('DOMContentLoaded', function () {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately in older browsers
    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      el.classList.add('in-view');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // Animate once only
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    observer.observe(el);
  });
});
