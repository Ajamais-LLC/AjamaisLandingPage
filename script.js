/* ============================================================
   VEX — Landing Page Script
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
const revealElements = document.querySelectorAll(
  '.feature-card, .moment-card, .section-header, .about-card, .platform-chip, .step'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.index ? entry.target.dataset.index * 80 : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Add stagger delays to feature/moment cards
document.querySelectorAll('.feature-card').forEach((el, i) => el.dataset.index = i);
document.querySelectorAll('.moment-card').forEach((el, i) => el.dataset.index = i);

// ---------- ACTIVE NAV ON SCROLL ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.style.color = isActive ? 'var(--text)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ---------- SOUNDBOARD INTERACTION (phone mockup) ----------
document.querySelectorAll('.sound-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sound-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ---------- APP STORE BUTTON RIPPLE ----------
document.querySelectorAll('.btn-appstore').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute;width:0;height:0;
      background:rgba(0,0,0,0.1);
      border-radius:50%;
      transform:translate(-50%,-50%);
      left:${e.clientX - rect.left}px;
      top:${e.clientY - rect.top}px;
      animation:rippleEffect 0.6s linear;
      pointer-events:none;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframe
const style = document.createElement('style');
style.textContent = `@keyframes rippleEffect{to{width:300px;height:300px;opacity:0}}`;
document.head.appendChild(style);
