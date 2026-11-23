const BUSINESS_EMAIL = 'sokhanawondo2@gmail.com';

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));

document.querySelector('#year').textContent = new Date().getFullYear();
if (BUSINESS_EMAIL) {
  const emailLink = document.querySelector('#email-display a');
  if (emailLink) { emailLink.textContent = BUSINESS_EMAIL; emailLink.href = `mailto:${BUSINESS_EMAIL}`; }
}

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!BUSINESS_EMAIL) {
    status.textContent = 'Contact form is not yet configured. Add your official business email to BUSINESS_EMAIL in script.js.';
    status.style.color = '#9a4d22';
    return;
  }
  const data = new FormData(form);
  const subject = `Sokhana enquiry: ${data.get('topic')}`;
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nInterest: ${data.get('topic')}\n\n${data.get('message')}`;
  const mailto = `mailto:${encodeURIComponent(BUSINESS_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Your email application should open with a prepared message. Please send it from there.';
  status.style.color = '#486c53';
  window.location.href = mailto;
});
