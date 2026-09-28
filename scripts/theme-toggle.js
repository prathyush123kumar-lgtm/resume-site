/**
 * theme-toggle.js
 * Handles dark/light mode switching and localStorage persistence.
 * NOTE: A minimal inline version of this runs in <head> to prevent
 * flash of wrong theme (FOUC). This full version wires the button.
 */

(function () {
  const STORAGE_KEY = 'theme';
  const DARK  = 'dark';
  const LIGHT = 'light';

  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = theme === DARK ? '☀️' : '🌙';
  }

  // Apply on load (may already be set by inline head script)
  applyTheme(getStoredTheme());

  // Wire the toggle button once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === DARK ? LIGHT : DARK);
    });
  });
})();
