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
  let revealedInIframe = false;

  function postToIframe(msg) {
    try { iframe.contentWindow && iframe.contentWindow.postMessage(msg, '*'); }
    catch (e) { /* iframe not ready yet — next tick will retry */ }
  }

  // Iframe sends 'iframe-ready' on its load event so we can re-send the
  // current reveal state. Handles the race where the user scrolls past
  // the reveal threshold before the iframe has wired up its listener.
  window.addEventListener('message', (e) => {
    if (e.data === 'iframe-ready') {
      postToIframe(revealedInIframe ? 'gallery-reveal' : 'gallery-hide');
    }
  });

  // Forward cursor position into the iframe so the neural mesh reacts
  // to the user's mouse even in gallery view (where pointer-events on
  // the iframe is 'none'). Once the iframe is interactive (full zoom),
  // the iframe captures mousemove natively and this listener doesn't
  // fire for events inside its area — no conflict.
  function forwardMouse(clientX, clientY) {
    const setter = iframe.contentWindow && iframe.contentWindow.setMeshCursor;
    if (!setter) return;
    const rect = iframe.getBoundingClientRect();
    if (clientX < rect.left || clientX > rect.right ||
        clientY < rect.top || clientY > rect.bottom) {
      setter(-1000, -1000);
      return;
    }
    // Translate viewport coords into the iframe's intrinsic coord
    // space (which is what the mesh's getBoundingClientRect uses).
    const ix = ((clientX - rect.left) / rect.width) * iframe.offsetWidth;
    const iy = ((clientY - rect.top) / rect.height) * iframe.offsetHeight;
    setter(ix, iy);
  }

  window.addEventListener('mousemove', (e) => forwardMouse(e.clientX, e.clientY),
                          { passive: true });
  window.addEventListener('mouseleave', () => {
    const setter = iframe.contentWindow && iframe.contentWindow.setMeshCursor;
    if (setter) setter(-1000, -1000);
  });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length) forwardMouse(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

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

    // Reveal hero text + nav inside the iframe slightly BEFORE pointer
    // events flip, so the typing animation finishes during the dwell and
    // the user lands on a fully-populated portfolio. Hysteresis at 0.78
    // so a small scroll-back doesn't snap content away.
    if (!revealedInIframe && p >= 0.88) {
      revealedInIframe = true;
      postToIframe('gallery-reveal');
    } else if (revealedInIframe && p < 0.78) {
      revealedInIframe = false;
      postToIframe('gallery-hide');
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
