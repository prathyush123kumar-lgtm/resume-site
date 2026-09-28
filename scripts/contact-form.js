/**
 * contact-form.js
 * Handles: client-side validation, spinner state, API submission,
 * toast feedback, character counter, cooldown after submit.
 */

document.addEventListener('DOMContentLoaded', function () {
  var form       = document.getElementById('contact-form');
  var submitBtn  = document.getElementById('submit-btn');
  var submitText = document.getElementById('submit-text');
  var submitSpinner = document.getElementById('submit-spinner');
  var msgArea    = document.getElementById('message');
  var charCount  = document.getElementById('char-count');

  if (!form) return;

  // ── Character Counter ──
  if (msgArea && charCount) {
    msgArea.addEventListener('input', function () {
      var len = msgArea.value.length;
      charCount.textContent = len + ' / 1000';
      charCount.style.color = len > 900
        ? 'var(--color-error)'
        : len > 750
          ? 'var(--color-warning)'
          : 'var(--color-text-subtle)';
    });
  }

  // ── Validation helpers ──
  function showError(fieldId, msg) {
    var input = document.getElementById(fieldId);
    var error = document.getElementById(fieldId + '-error');
    if (input) input.classList.add('error');
    if (error) { error.textContent = msg; error.classList.add('visible'); }
  }

  function clearError(fieldId) {
    var input = document.getElementById(fieldId);
    var error = document.getElementById(fieldId + '-error');
    if (input) input.classList.remove('error');
    if (error) { error.textContent = ''; error.classList.remove('visible'); }
  }

  function clearAllErrors() {
    ['name', 'email', 'subject', 'message'].forEach(clearError);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validate(data) {
    var valid = true;
    clearAllErrors();

    if (!data.name || data.name.trim().length < 2) {
      showError('name', 'Please enter your full name (at least 2 characters).');
      valid = false;
    }
    if (!data.email || !validateEmail(data.email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }
    if (!data.subject || data.subject.trim().length < 2) {
      showError('subject', 'Please provide a subject (at least 2 characters).');
      valid = false;
    }
    if (!data.message || data.message.trim().length < 10) {
      showError('message', 'Message must be at least 10 characters long.');
      valid = false;
    }
    if (data.message && data.message.length > 1000) {
      showError('message', 'Message cannot exceed 1000 characters.');
      valid = false;
    }
    return valid;
  }

  // ── Spinner helpers ──
  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitText.textContent = loading ? 'Sending…' : 'Send Message';
    if (submitSpinner) submitSpinner.style.display = loading ? 'inline-block' : 'none';
  }

  // ── Form Submit ──
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var data = {
      name:    document.getElementById('name').value.trim(),
      email:   document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    if (!validate(data)) return;

    setLoading(true);

    try {
      var res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data)
      });

      if (res.status === 201) {
        showToast('success', 'Message Sent!', "Thanks for reaching out — I'll get back to you soon.");
        form.reset();
        if (charCount) charCount.textContent = '0 / 1000';
        clearAllErrors();
        // Cooldown: disable submit for 30s to prevent duplicates
        setTimeout(function () { submitBtn.disabled = false; }, 30000);
        submitBtn.disabled = true;
        submitText.textContent = 'Message Sent ✓';
      } else if (res.status === 429) {
        showToast('error', 'Too Many Attempts', 'Please wait a few minutes before sending another message.');
        setLoading(false);
      } else if (res.status === 400) {
        var body = await res.json().catch(function () { return {}; });
        showToast('error', 'Validation Error', body.error || 'Please check your input and try again.');
        setLoading(false);
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      showToast('error', 'Send Failed', 'Something went wrong. Please email me directly at prathyush123kumar@gmail.com');
      setLoading(false);
    }
  });

  // Clear errors on input
  ['name', 'email', 'subject', 'message'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function () { clearError(id); });
  });
});

/* ── Toast Notification ── */
function showToast(type, title, message) {
  var container = document.getElementById('toast-container');
  if (!container) return;

  var icons = { success: '✅', error: '❌', info: 'ℹ️' };
  var toast = document.createElement('div');
  toast.className = 'toast toast-' + type + ' toast-enter';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${icons[type] || 'ℹ️'}</span>
    <div class="toast-body">
      <p class="toast-title">${title}</p>
      <p class="toast-msg">${message}</p>
    </div>
    <button class="toast-close" aria-label="Dismiss notification">×</button>
    <div class="toast-progress" aria-hidden="true"></div>
  `;

  container.appendChild(toast);

  // Dismiss on × click
  toast.querySelector('.toast-close').addEventListener('click', function () {
    dismissToast(toast);
  });

  // Auto-dismiss after 5s
  setTimeout(function () { dismissToast(toast); }, 5000);
}

function dismissToast(toast) {
  toast.classList.remove('toast-enter');
  toast.classList.add('toast-exit');
  setTimeout(function () {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 300);
}
