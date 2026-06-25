/* ============================================================
   RANZER Website - Interactions
   ============================================================ */

// ── Hamburger / mobile drawer ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('drawer');

hamburger.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close drawer when a link inside it is clicked
drawer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    drawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close drawer on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && drawer.classList.contains('open')) {
    drawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});


// ── Nav scroll - switch between dark-hero and light-page styles ───
const nav = document.getElementById('nav');
const heroHeight = document.querySelector('.hero')?.offsetHeight || 400;
window.addEventListener('scroll', () => {
  if (window.scrollY > heroHeight * 0.6) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });


// ── Fade-in on scroll (Intersection Observer) ──────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach((el, i) => {
  // Stagger siblings in the same grid
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  observer.observe(el);
});


// ── Install tabs ───────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`tab-${target}`).classList.add('active');
  });
});


// ── Smooth anchor offset (account for sticky nav height) ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = 44 + 16; // nav height + breathing room
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
