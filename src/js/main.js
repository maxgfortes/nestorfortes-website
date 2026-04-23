// DETECÇÃO DE MOBILE
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || ('ontouchstart' in window)
  || (navigator.maxTouchPoints > 0);

if (isMobile) {
  document.body.classList.add('is-mobile');

  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  if (cursor) cursor.style.opacity = '0';
  if (ring) ring.style.opacity = '0';
}

// CURSOR (apenas desktop)
if (!isMobile) {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .hamburger, .service-card, .about-video').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
  });
}

// MENU
const toggle = document.getElementById('menuToggle');
const overlay = document.getElementById('menuOverlay');
let menuOpen = false;

toggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  overlay.classList.toggle('open', menuOpen);
  toggle.querySelector('span:nth-child(1)').style.transform = menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  toggle.querySelector('span:nth-child(2)').style.opacity = menuOpen ? '0' : '1';
  toggle.querySelector('span:nth-child(3)').style.transform = menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

function closeMenu() {
  menuOpen = false;
  overlay.classList.remove('open');
  toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
}

// SCROLL PROGRESS
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scrollProgress').style.width = pct + '%';
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMenu();
  });
});