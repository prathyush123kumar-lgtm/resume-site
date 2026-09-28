/**
 * typing-effect.js
 * Cycles through an array of role strings with a typing/deleting
 * animation. Pure vanilla JS — no libraries required.
 */

document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('typing-text');
  if (!el) return;

  var roles = [
    'Web Developer',
    'Python Enthusiast',
    'Problem Solver',
    'Flask Developer',
    'Hackathon Ready',
    'CS Student'
  ];

  var roleIndex  = 0;
  var charIndex  = 0;
  var isDeleting = false;
  var typeSpeed  = 100;  // ms per character typed
  var deleteSpeed= 50;   // ms per character deleted
  var pauseTime  = 1800; // ms pause when word is fully typed

  function type() {
    var current = roles[roleIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    var delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      // Finished typing — pause then start deleting
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  // Start after a short delay so it doesn't fire before the hero renders
  setTimeout(type, 600);
});
