// gallery.js — Art gallery scroll-driven zoom animation
//
// Scroll choreography (progress 0 -> 1 over 320vh):
//   0.00 - 0.03   Scroll hint vanishes
//   0.00 - 0.14   Exhibition header fades out, drifts up
//   0.08 - 0.30   Placard slips aside
//   0.00 - 0.78   Camera dives through the frame (cubic ease)
//   0.40 - 0.72   Spotlight + vignette + glass dissolve
//   0.78 - 0.88   Dwell — fullscreen mesh, nothing else happening
//   0.90+         Portfolio content materializes (1.4s CSS transition)
//   0.95+         Site becomes interactive, return chip appears

export function initGallery() {
  const track = document.getElementById('gallery-track');
  const stage = document.getElementById('gallery-stage');
  const scene = document.getElementById('gallery-scene');
  const canvas = document.getElementById('gallery-canvas');
  const header = document.getElementById('gallery-header');
  const scrollHint = document.getElementById('gallery-scroll-hint');
  const ambiance = document.getElementById('gallery-ambiance');
  const glass = document.getElementById('gallery-glass');
  const returnChip = document.getElementById('gallery-return-chip');
  const heroContent = document.getElementById('hero-content-overlay');
  const siteHeader = document.querySelector('.site-header');
  const placard = document.querySelector('.gallery-placard');

  if (!track || !scene || !canvas) {
    console.warn('[gallery] Required elements not found');
    return;
  }

  // ── Helpers ──
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const phase = (p, a, b) => clamp01((p - a) / (b - a));
  const easeInOut = (t) => t * t * (3 - 2 * t);
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // ── State ──
  let rafId = 0;
  let target = 0;
  let current = 0;
  let animating = false;
  let originX = 0;
  let originY = 0;
  let maxScale = 2;
  let revealed = false;
  const SMOOTHING = 0.09; // lower = floatier Apple-style glide

  // ── Measure the canvas position and compute zoom parameters ──
  function measure() {
    const prev = scene.style.transform;
    scene.style.transform = 'none';
    const r = canvas.getBoundingClientRect();
    originX = r.left + r.width / 2;
    originY = r.top + r.height / 2;
    maxScale = Math.max(
      window.innerWidth / Math.max(r.width, 1),
      window.innerHeight / Math.max(r.height, 1)
    ) * 1.006; // 0.6% overscan to prevent subpixel frame slivers
    scene.style.transform = prev;
    scene.style.transformOrigin = `${originX}px ${originY}px`;
  }

  // ── Apply visual state for a given progress value ──
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

    // Placard slips aside
    const placardExit = easeInOut(phase(p, 0.08, 0.3));
    if (placard) {
      placard.style.opacity = String(1 - placardExit);
      placard.style.transform = `translateX(${40 * placardExit}px)`;
    }

    // The dive through the frame (cubic ease for cinematic feel)
    const dive = easeInOutCubic(phase(p, 0, 0.78));
    const S = 1 + (maxScale - 1) * dive;
    const tx = (window.innerWidth / 2 - originX) * dive;
    const ty = (window.innerHeight / 2 - originY) * dive;
    scene.style.transform = `translate(${tx}px, ${ty}px) scale(${S})`;

    // Gallery ambiance dissolves
    const dissolve = easeInOut(phase(p, 0.40, 0.72));
    if (ambiance) ambiance.style.opacity = String(1 - dissolve);
    if (glass) glass.style.opacity = String(1 - dissolve);

    // Portfolio content reveal (triggers CSS transition, not scroll-driven)
    // Hysteresis: in at 0.9, out below 0.8 to prevent edge flicker
    if (!revealed && p >= 0.9) {
      revealed = true;
      if (heroContent) heroContent.classList.add('gallery-revealed');
      if (siteHeader) siteHeader.classList.add('gallery-revealed');
    } else if (revealed && p < 0.8) {
      revealed = false;
      if (heroContent) heroContent.classList.remove('gallery-revealed');
      if (siteHeader) siteHeader.classList.remove('gallery-revealed');
    }

    // Return chip
    if (returnChip) {
      const chip = easeInOut(phase(p, 0.95, 1));
      returnChip.style.opacity = String(chip);
      returnChip.style.pointerEvents = chip > 0.5 ? 'auto' : 'none';
    }
  }

  // ── Inertial animation loop (Apple-style glide) ──
  function tick() {
    current += (target - current) * SMOOTHING;
    if (Math.abs(target - current) < 0.0004) {
      current = target;
      animating = false;
    }
    apply(current);
    if (animating) rafId = requestAnimationFrame(tick);
  }

  function computeTarget() {
    const total = track.offsetHeight - window.innerHeight;
    return total > 0 ? clamp01(window.scrollY / total) : 0;
  }

  // ── Event handlers ──
  function onScroll() {
    target = computeTarget();
    if (!animating) {
      animating = true;
      rafId = requestAnimationFrame(tick);
    }
  }

  function onResize() {
    measure();
    onScroll();
  }

  // ── Return chip: scroll back to gallery ──
  if (returnChip) {
    returnChip.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Initialize ──
  measure();
  target = computeTarget();
  current = target;
  apply(current);

  // Re-measure after fonts load (can shift layout)
  setTimeout(onResize, 400);

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  // Reduced motion: skip inertia, track scroll directly
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => apply(computeTarget()), { passive: true });
  }
}
