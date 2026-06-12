// gallery.js — Art gallery shell for index.html.
// Scrolling drives a CSS transform that scales #gallery-scene (containing
// the gilt frame + iframe) from a small artwork floating in the wall
// (~0.42×) to fullscreen (~1.06×, slight overscan so the gilt edges go
// off-screen). Once the zoom completes, the iframe becomes interactive
// and the user navigates the portfolio at its natural 1:1 size.
//
// Scroll choreography over the 320vh of #gallery-track:
//   0.00 - 0.03   Scroll hint vanishes
//   0.00 - 0.14   Exhibition header fades + drifts up
//   0.00 - 0.78   Camera dives into the frame (cubic ease)
//   0.40 - 0.72   Spotlight + vignette + glass dissolve
//   0.78 - 0.88   Dwell — fullscreen portfolio, gallery ambiance gone
//   0.95+         Iframe becomes interactive, return chip appears

const INITIAL_SCALE = 0.42;
// Small overscan (0.5%) to clip subpixel gilt slivers without cutting
// the iframe's nav bar off the top.
const FINAL_SCALE = 1.005;
const SMOOTHING = 0.09;   // inertial glide factor

function initGallery() {
  const track = document.getElementById('gallery-track');
  const scene = document.getElementById('gallery-scene');
  const iframe = document.getElementById('portfolio-iframe');
  const header = document.getElementById('gallery-header');
  const scrollHint = document.getElementById('gallery-scroll-hint');
  const ambiance = document.getElementById('gallery-ambiance');
  const glass = document.getElementById('gallery-glass');
  const returnChip = document.getElementById('gallery-return-chip');

  if (!track || !scene || !iframe) {
    console.warn('[gallery] Required elements not found');
    return;
  }

  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const phase = (p, a, b) => clamp01((p - a) / (b - a));
  const easeInOut = (t) => t * t * (3 - 2 * t);
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  let target = 0;
  let current = 0;
  let animating = false;
  let iframeInteractive = false;

  function computeTarget() {
    const total = track.offsetHeight - window.innerHeight;
    return total > 0 ? clamp01(window.scrollY / total) : 0;
  }

  function apply(p) {
    // Scroll hint vanishes immediately
    if (scrollHint) {
      scrollHint.style.opacity = String(1 - easeInOut(phase(p, 0, 0.03)));
    }

    // Exhibition header recedes
    const exit = easeInOut(phase(p, 0, 0.14));
    if (header) {
      header.style.opacity = String(1 - exit);
      header.style.transform = `translateY(${-32 * exit}px)`;
      header.style.pointerEvents = exit > 0.5 ? 'none' : 'auto';
    }

    // The dive — scale the scene from INITIAL_SCALE to FINAL_SCALE
    const dive = easeInOutCubic(phase(p, 0, 0.78));
    const scale = INITIAL_SCALE + (FINAL_SCALE - INITIAL_SCALE) * dive;
    scene.style.transform = `scale(${scale})`;

    // Gallery ambiance dissolves
    const dissolve = easeInOut(phase(p, 0.40, 0.72));
    if (ambiance) ambiance.style.opacity = String(1 - dissolve);
    if (glass) glass.style.opacity = String(1 - dissolve);

    // Iframe becomes interactive at the top of the dwell (hysteresis: out
    // below 0.85 to prevent edge flicker if user scrolls just barely back).
    if (!iframeInteractive && p >= 0.95) {
      iframeInteractive = true;
      iframe.style.pointerEvents = 'auto';
    } else if (iframeInteractive && p < 0.85) {
      iframeInteractive = false;
      iframe.style.pointerEvents = 'none';
    }

    // Return chip appears once zoom is essentially done
    if (returnChip) {
      const chip = easeInOut(phase(p, 0.95, 1));
      returnChip.style.opacity = String(chip);
      returnChip.style.pointerEvents = chip > 0.5 ? 'auto' : 'none';
    }
  }

  function tick() {
    current += (target - current) * SMOOTHING;
    if (Math.abs(target - current) < 0.0004) {
      current = target;
      animating = false;
    }
    apply(current);
    if (animating) requestAnimationFrame(tick);
  }

  function onScroll() {
    target = computeTarget();
    if (!animating) {
      animating = true;
      requestAnimationFrame(tick);
    }
  }

  function onResize() {
    onScroll();
  }

  if (returnChip) {
    returnChip.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initialize
  target = computeTarget();
  current = target;
  apply(current);

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  // Reduced motion: skip the inertial glide, snap to scroll position
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => apply(computeTarget()), { passive: true });
  }
}

// Auto-init on DOM ready. Loaded as a plain (non-module) script so it
// also runs when index.html is opened directly via file:// — modules
// fail to import over file:// in Chrome.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallery);
} else {
  initGallery();
}
