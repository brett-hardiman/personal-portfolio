// scroll-reveal.js — Scroll-triggered reveal animations using IntersectionObserver

/**
 * Initializes scroll-triggered reveal animations.
 * Elements with [data-reveal] fade in when scrolled into view.
 * Supports staggered delays via data-reveal-delay attribute.
 */
export function initScrollReveal() {
  try {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, Number(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
  } catch (err) {
    console.warn('[scroll-reveal] Failed to initialize:', err);
    // Ensure content is visible even if animation fails
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
  }
}
