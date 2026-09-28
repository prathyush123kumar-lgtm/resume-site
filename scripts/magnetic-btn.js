/**
 * magnetic-btn.js
 * Adds a subtle magnetic pull effect to buttons with class "magnetic".
 * The button shifts slightly toward the cursor when hovering nearby.
 */

document.addEventListener('DOMContentLoaded', function () {
  var magneticBtns = document.querySelectorAll('.magnetic');

  magneticBtns.forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect     = btn.getBoundingClientRect();
      var centerX  = rect.left + rect.width  / 2;
      var centerY  = rect.top  + rect.height / 2;
      var deltaX   = (e.clientX - centerX) * 0.3;
      var deltaY   = (e.clientY - centerY) * 0.3;
      btn.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px) translateY(-2px)';
    });

    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
});
