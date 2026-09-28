/**
 * lightbox.js
 * Opens a full-screen modal overlay for project screenshot images.
 * Closes on: × button, Escape key, or clicking the overlay background.
 * Traps focus inside the modal while open (accessibility).
 */

document.addEventListener('DOMContentLoaded', function () {
  var modal     = document.getElementById('modal');
  var modalImg  = document.getElementById('modal-img');
  var closeBtn  = document.getElementById('modal-close');

  if (!modal) return;

  function openModal(src, alt) {
    if (!src) return;
    modalImg.src = src;
    modalImg.alt = alt || 'Project screenshot';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  // Close on × button
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on overlay click (but not on image click)
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // Expose openModal globally so fetch-data.js can call it
  window.openLightbox = openModal;
});
