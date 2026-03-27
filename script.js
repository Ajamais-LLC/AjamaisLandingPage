/* ============================================================
   AJAMAIS — Company Landing Page Script
   ============================================================ */

// ---------- NAV SCROLL ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ---------- HAMBURGER ----------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---------- SCROLL REVEAL ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---------- NOTIFY FORMS ----------
document.querySelectorAll('.notify-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const product = form.dataset.product;
    const btn = form.querySelector('.btn-notify');
    btn.textContent = '✓ Got it!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    btn.disabled = true;
    form.querySelector('input').value = '';
  });
});
