// nav.js — Navigation active tracking, mobile menu toggle, smooth scroll

/**
 * Initializes all navigation interactions:
 * - Active section tracking via IntersectionObserver
 * - Mobile hamburger menu toggle
 * - Smooth scroll with fixed header offset compensation
 */
export function initNav() {
  try {
    initActiveTracking();
    initMobileMenu();
    initSmoothScroll();
  } catch (err) {
    console.warn('[nav] Failed to initialize:', err);
  }
}

/**
 * Tracks which section is currently in view and highlights the
 * corresponding nav link with the .active class.
 */
function initActiveTracking() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' });

  sections.forEach(section => observer.observe(section));
}

/**
 * Enables the mobile hamburger menu toggle, closes on nav link
 * click, and closes on Escape key press.
 */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on nav link click
  navList.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('is-open')) {
      navList.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/**
 * Adds smooth scroll with offset compensation for the fixed header.
 */
function initSmoothScroll() {
  const navHeight = document.querySelector('.site-header')?.offsetHeight || 0;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.offsetTop - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
