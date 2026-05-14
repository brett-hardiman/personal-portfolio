// projects.js — Project card 3D tilt hover effect

/**
 * Initializes the project card 3D tilt hover effect.
 * Cards tilt subtly in response to mouse position on desktop.
 * Disabled on touch devices and when reduced motion is preferred.
 */
export function initProjectCards() {
  try {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
      });
    });
  } catch (err) {
    console.warn('[projects] Failed to initialize:', err);
  }
}
