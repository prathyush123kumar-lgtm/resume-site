/**
 * smooth-scroll.js
 * Intercepts all internal anchor link clicks (href starting with "#")
 * and scrolls to the target element smoothly, accounting for the
 * fixed navbar height.
 */

document.addEventListener('DOMContentLoaded', function () {
  var NAVBAR_OFFSET = 80; // matches --navbar-height in CSS

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href').substring(1);
      var target   = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
      window.scrollTo({ top: top, behavior: 'smooth' });

      // Update URL hash without jumping
      history.pushState(null, '', '#' + targetId);
    });
  });
});
