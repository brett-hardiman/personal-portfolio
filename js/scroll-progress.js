// scroll-progress.js — Scroll progress indicator bar

/**
 * Initializes the scroll progress indicator.
 * Updates a fixed progress bar width based on scroll position.
 */
export function initScrollProgress() {
  try {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
      console.warn('[scroll-progress] .scroll-progress element not found');
      return;
    }

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  } catch (err) {
    console.warn('[scroll-progress] Failed to initialize:', err);
  }
}
