// Form delivery — Formsubmit today, Web3Forms once the client's key arrives.
const FORM = { endpoint: "https://formsubmit.co/ajax/palmcoastsmarthome@gmail.com", web3formsKey: "" }; // when the Web3Forms key arrives: set web3formsKey and the endpoint switches automatically

// POSTs a form as JSON. Resolves only on a confirmed delivery — Formsubmit
// answers 200 even when it drops a message, so the body is what counts.
async function sendForm(form) {
  const data = {};
  new FormData(form).forEach((value, key) => {
    data[key] = key in data ? data[key] + ', ' + value : value;
  });
  if (data._subject) data.subject = data._subject;
  let url = FORM.endpoint;
  if (FORM.web3formsKey) {
    url = 'https://api.web3forms.com/submit';
    data.access_key = FORM.web3formsKey;
    Object.keys(data).forEach((key) => { if (key.charAt(0) === '_') delete data[key]; });
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  });
  let out = {};
  try { out = await res.json(); } catch (err) { /* non-JSON reply fails below */ }
  if (!res.ok || !(out.success === true || out.success === 'true')) {
    throw new Error(out.message || 'Form submission failed');
  }
  return out;
}

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

// Contact form: sent by sendForm() so the page never reloads and delivery is
// confirmed; with JS off the form still posts to its action= (Formsubmit).
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
    await sendForm(form);
    form.reset();
    showAlert(successAlert);
  } catch (err) {
    showAlert(errorAlert);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});
