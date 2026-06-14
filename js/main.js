// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Close mobile nav on link click
navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

// Smooth-scroll offset for sticky nav
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  });
});

// Contact form: submit via Formsubmit AJAX so the page never reloads.
const form = document.getElementById('contact-form');
const successAlert = document.getElementById('form-success');
const errorAlert = document.getElementById('form-error');
const submitBtn = document.getElementById('submit-btn');

function showAlert(el) {
  [successAlert, errorAlert].forEach((a) => { if (a) a.hidden = true; });
  if (!el) return;
  el.hidden = false;
  setTimeout(() => {
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = '0';
    setTimeout(() => { el.hidden = true; el.style.opacity = ''; el.style.transition = ''; }, 500);
  }, 6000);
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Native validation for required fields.
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  const originalLabel = submitBtn.textContent;
  submitBtn.textContent = 'Sending…';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    });
    if (!res.ok) throw new Error('Bad response');
    form.reset();
    showAlert(successAlert);
  } catch (err) {
    showAlert(errorAlert);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});
