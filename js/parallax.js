// parallax.js — Hero parallax mouse-tracking effect

/**
 * Initializes the hero parallax mouse-tracking effect.
 * Decorative elements shift subtly in response to mouse movement.
 * Disabled on touch devices and when reduced motion is preferred.
 */
export function initParallax() {
  try {
    const hero = document.querySelector('.section--hero');
    if (!hero || window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layers = hero.querySelectorAll('[data-parallax-speed]');
    if (!layers.length) return;

    let rafId = null;
    let mouseX = 0;
    let mouseY = 0;

    hero.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.parallaxSpeed) || 1;
            const x = mouseX * 15 * speed;
            const y = mouseY * 15 * speed;
            layer.style.transform = `translate(${x}px, ${y}px)`;
          });
          rafId = null;
        });
      }
    });
  } catch (err) {
    console.warn('[parallax] Failed to initialize:', err);
  }
}
