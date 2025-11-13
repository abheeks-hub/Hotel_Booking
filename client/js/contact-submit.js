// FILE: js/contact-submit.js
// (If you already handle contact form in js/script.js, just replace that handler with this)

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const payload = {
      name: (formData.get('name') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      message: (formData.get('message') || '').toString().trim()
    };

    // small client-side validation
    if (!payload.name || !payload.email || !payload.message) {
      showToast('Please fill all fields.', 'error');
      return;
    }

    // disable submit while sending
    const submitBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) submitBtn.setAttribute('disabled', 'true');

    try {
      const resp = await fetch((window.API_BASE || '') + '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // optional: if your backend uses cookies/sessions
        body: JSON.stringify(payload)
      });

      const result = await resp.json();

      if (resp.ok) {
        showToast(result?.message || 'Message sent — thanks!', 'success');
        contactForm.reset();
      } else {
        showToast(result?.error || 'Server error. Try again later.', 'error');
      }
    } catch (err) {
      console.error('contact submit error', err);
      showToast('Network error. Check your server.', 'error');
    } finally {
      if (submitBtn) submitBtn.removeAttribute('disabled');
    }
  });
});
