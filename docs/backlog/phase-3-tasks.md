# Phase 3 — Animations and Interactivity

> **Objective:** Add JavaScript-driven animations and interactions that elevate the site from functional to polished. All enhancements are progressive — the site remains fully functional without JS.
>
> **Dependencies:** Phase 1 (HTML structure with correct IDs and classes) and Phase 2 (content sections with `data-reveal` attributes).

---

### Task 3-1: Implement the Scroll Progress Indicator

**Phase:** Animations and Interactivity
**Priority:** P1
**Dependencies:** Task 1-4, Task 2-1
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to see a thin green progress bar at the top of the page that tracks how far I have scrolled so that I always know where I am in the content.

#### Acceptance Criteria

- **AC1: Progress bar fills from 0% to 100% as the user scrolls**
  - Given: The user is at the very top of the page
  - When: The page first loads
  - Then: The `.scroll-progress` bar has `width: 0%`
  - Given: The user has scrolled to the very bottom of the page
  - When: The scroll position is at maximum
  - Then: The `.scroll-progress` bar has `width: 100%` (or approximately 100%)

- **AC2: Progress bar does not cause scroll performance jank**
  - Given: The user is scrolling rapidly through the page
  - When: The scroll progress update function runs
  - Then: The scroll event listener is registered with `{ passive: true }` and no `preventDefault()` is called (verifiable by inspection of the JS code)

- **AC3: Progress bar is visually correct**
  - Given: The page is loaded
  - When: The `.scroll-progress` element is inspected in DevTools
  - Then: It has `position: fixed; top: 0; left: 0; height: 3px; background: var(--color-green); z-index: 101` and is not blocked by the nav bar

- **AC4: Site works without JavaScript**
  - Given: JavaScript is disabled in the browser
  - When: The page loads
  - Then: The scroll progress bar is simply not visible (it stays at `width: 0%`) and all other content is fully accessible; no errors appear

- **AC5: Scroll progress implementation checklist**
  - [ ] `js/scroll-progress.js` exports `initScrollProgress` as a named export
  - [ ] The function guards against missing DOM element: `if (!progressBar) return;`
  - [ ] Scroll listener uses `{ passive: true }` option
  - [ ] Progress calculation: `(scrollY / (scrollHeight - innerHeight)) * 100`
  - [ ] `updateProgress()` is called once on initialization to set the initial state
  - [ ] `css/animations.css` contains the `.scroll-progress` CSS block as specified
  - [ ] `transition: width 0.1s linear` is applied to the progress bar for smoothness

#### Technical Context

Full implementation from the project plan:
```javascript
// scroll-progress.js
export function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
```

CSS for the progress bar (in `css/animations.css`):
```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: var(--color-green);
  z-index: 101;
  transition: width 0.1s linear;
}
```

Note: `z-index: 101` places the progress bar above the nav header (`z-index: 100`).

The `.scroll-progress` HTML element already exists in `index.html` from Task 1-1 (inside `<header>`). This task only implements the JS logic and finalizes the CSS.

Error handling pattern from project non-functional requirements: each JS module must have a try/catch at initialization to prevent one module's failure from blocking others:
```javascript
export function initScrollProgress() {
  try {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
      console.warn('[scroll-progress] .scroll-progress element not found');
      return;
    }
    // ... implementation
  } catch (err) {
    console.warn('[scroll-progress] Failed to initialize:', err);
  }
}
```

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 3-2: Implement Scroll-Triggered Reveal Animations

**Phase:** Animations and Interactivity
**Priority:** P1
**Dependencies:** Task 2-2, Task 2-3, Task 2-4, Task 2-5, Task 2-6
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want content to fade in gracefully as I scroll so that the page feels dynamic and polished rather than static.

#### Acceptance Criteria

- **AC1: Elements with `data-reveal` attribute animate in when scrolled into view**
  - Given: Section content elements have `data-reveal` attributes (added in Phase 2)
  - When: The user scrolls and an element crosses the 15% visibility threshold
  - Then: The element transitions from `opacity: 0; transform: translateY(20px)` to `opacity: 1; transform: translateY(0)` over 0.6 seconds

- **AC2: Stagger animation works for skill badges**
  - Given: Skill badges have `data-reveal` and `data-reveal-delay` attributes (e.g., `data-reveal-delay="50"`, `data-reveal-delay="100"`)
  - When: The skills section scrolls into view
  - Then: Each badge fades in sequentially with the specified millisecond delay between each badge

- **AC3: Animation is one-time (no re-trigger on scroll-back)**
  - Given: A section has already been revealed
  - When: The user scrolls back up and then down again past the same section
  - Then: The elements do not re-animate; they remain fully visible

- **AC4: Reduced motion preference is respected**
  - Given: The user has `prefers-reduced-motion: reduce` set in their OS accessibility settings
  - When: The page is rendered
  - Then: All `[data-reveal]` elements are immediately visible with no animation (opacity: 1, no transform)

- **AC5: Fallback for browsers without IntersectionObserver**
  - Given: The user's browser does not support `IntersectionObserver` (very old browser)
  - When: `initScrollReveal()` is called
  - Then: All `[data-reveal]` elements are immediately set to `opacity: 1` so content is not permanently hidden

- **AC6: Scroll reveal implementation checklist**
  - [ ] `js/scroll-reveal.js` exports `initScrollReveal` as a named export
  - [ ] IntersectionObserver threshold is set to `0.15`
  - [ ] `observer.unobserve(entry.target)` is called after an element is revealed (one-time animation)
  - [ ] `data-reveal-delay` attribute is read via `entry.target.dataset.revealDelay`
  - [ ] `setTimeout` is used to apply the delay before adding `.revealed` class
  - [ ] `css/animations.css` contains the `[data-reveal]` and `[data-reveal].revealed` CSS rules
  - [ ] `@media (prefers-reduced-motion: reduce)` block in CSS makes `[data-reveal]` elements immediately visible
  - [ ] Try/catch wraps the entire `initScrollReveal` body

#### Technical Context

Full implementation from the project plan:
```javascript
// scroll-reveal.js
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
```

CSS from the project plan (in `css/animations.css`):
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

Also add a `<noscript>` style block in `index.html` to handle the case where JS is completely disabled — ensuring `[data-reveal]` elements are visible:
```html
<noscript>
  <style>
    [data-reveal] { opacity: 1 !important; transform: none !important; }
  </style>
</noscript>
```

This `<noscript>` tag should be placed in the `<head>` of `index.html`.

Elements that should have `data-reveal` attributes (added in Phase 2, verified here):
- `.about-content` (or its direct children)
- `.skills-grid .skill-category` elements
- `.skill-badge` elements (with `data-reveal-delay`)
- `.timeline-item` elements
- `.project-card` elements
- `.contact-text` and the contact CTA

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 3-3: Implement Hero Parallax Mouse-Tracking Effect

**Phase:** Animations and Interactivity
**Priority:** P1
**Dependencies:** Task 2-1
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want decorative background elements in the hero section to subtly shift with my mouse movement so that the landing experience feels dynamic and modern.

#### Acceptance Criteria

- **AC1: Parallax effect activates on mouse movement over the hero on desktop**
  - Given: The user is on a desktop device (hover capability detected)
  - When: The user moves their mouse over the hero section
  - Then: Decorative absolutely-positioned elements shift position relative to the cursor (maximum shift of 15px in any direction)

- **AC2: Parallax effect is disabled on touch/mobile devices**
  - Given: The user is on a touch device (no hover capability)
  - When: `initParallax()` is called
  - Then: The `window.matchMedia('(hover: none)').matches` check returns true and the function returns early; no mousemove listener is attached

- **AC3: Parallax uses requestAnimationFrame for smooth rendering**
  - Given: The parallax listener is active
  - When: Multiple mousemove events fire in rapid succession
  - Then: Only one `requestAnimationFrame` callback is queued at a time (the `rafId` guard pattern is used); transforms are applied inside the rAF callback

- **AC4: Decorative parallax elements are not content and are hidden from screen readers**
  - Given: The parallax decorative elements are in the hero HTML
  - When: A screen reader encounters them
  - Then: They have `aria-hidden="true"` and contain no meaningful text or interactive elements

- **AC5: Parallax works with reduced motion disabled**
  - Given: The user has `prefers-reduced-motion: reduce` set
  - When: The page loads
  - Then: The parallax mousemove listener should NOT be registered; decorative elements remain static

- **AC6: Parallax implementation checklist**
  - [ ] `js/parallax.js` exports `initParallax` as a named export
  - [ ] Touch device guard: `if (!hero || window.matchMedia('(hover: none)').matches) return;`
  - [ ] Reduced motion guard: `if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;`
  - [ ] `data-parallax-speed` attribute on decorative elements controls movement intensity
  - [ ] Mouse position is normalized to `[-1, 1]` range relative to viewport center
  - [ ] rAF guard (`rafId`) prevents queuing multiple animation frames
  - [ ] At least 2 decorative elements with different `data-parallax-speed` values exist in the hero HTML
  - [ ] Decorative elements have `aria-hidden="true"` and `position: absolute` in CSS
  - [ ] Try/catch wraps the entire `initParallax` body

#### Technical Context

Full implementation from the project plan:
```javascript
// parallax.js
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
```

Decorative elements to add to the hero section HTML (inside `<section id="hero">`):
```html
<div class="hero-decorative" aria-hidden="true">
  <div class="hero-blob hero-blob--1" data-parallax-speed="0.5"></div>
  <div class="hero-blob hero-blob--2" data-parallax-speed="1"></div>
  <div class="hero-dots" data-parallax-speed="0.3"></div>
</div>
```

CSS for decorative elements (in `css/hero.css`):
```css
.section--hero {
  position: relative;
  overflow: hidden;
}

.hero-decorative {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1; /* above decorative layer */
}

.hero-blob--1 {
  position: absolute;
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(29, 185, 84, 0.15) 0%, transparent 70%);
}

.hero-blob--2 {
  position: absolute;
  width: 300px;
  height: 300px;
  bottom: -50px;
  left: 20%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(29, 185, 84, 0.08) 0%, transparent 70%);
}

.hero-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(83, 83, 83, 0.4) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.5;
}
```

The `hero-content` z-index must be higher than `.hero-decorative` to ensure text is always on top.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 3-4: Implement Navigation Enhancements

**Phase:** Animations and Interactivity
**Priority:** P1
**Dependencies:** Task 1-4, Task 2-1
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want the navigation bar to highlight my current section, the hamburger menu to open and close smoothly on mobile, and smooth scroll to work for all nav links so that I can orient myself and navigate without friction.

#### Acceptance Criteria

- **AC1: Active nav link highlights the current section while scrolling**
  - Given: The user scrolls through the page
  - When: A section enters the viewport (is intersecting)
  - Then: The corresponding nav link receives the `.active` class (styled with `--color-green` accent) and previously active links have the `.active` class removed

- **AC2: Mobile hamburger menu toggles on click**
  - Given: The user is on a mobile viewport (< 768px)
  - When: The user taps the hamburger button (`<button class="nav-toggle">`)
  - Then: The `aria-expanded` attribute on the button toggles between `"false"` and `"true"`, and the nav menu slides or fades into view
  - When: The user taps the button again
  - Then: The menu closes and `aria-expanded` returns to `"false"`

- **AC3: Clicking a nav link on mobile closes the menu**
  - Given: The mobile menu is open
  - When: The user taps any nav link
  - Then: The menu closes before or immediately after the page scrolls to the target section

- **AC4: Header scroll behavior (optional hide/show)**
  - Given: The user scrolls down the page
  - When: The scroll direction is downward and the user is more than 100px from the top
  - Then: The header slides up out of view (`transform: translateY(-100%)`)
  - When: The user scrolls upward
  - Then: The header slides back into view

- **AC5: Navigation implementation checklist**
  - [ ] `js/nav.js` exports `initNav` as a named export
  - [ ] `initNav` calls three internal functions: `initActiveTracking()`, `initMobileMenu()`, `initSmoothScroll()` (or equivalent organization)
  - [ ] Active tracking uses `IntersectionObserver` — NOT a scroll event listener
  - [ ] IntersectionObserver threshold for section tracking is `0.5` (section is 50% visible)
  - [ ] Mobile menu toggle adds/removes a class on the `<nav>` or `<header>` element (e.g., `nav--open`)
  - [ ] Mobile menu CSS uses a transition for the open/close animation (in `css/nav.css`)
  - [ ] `.nav-link.active` CSS is already defined in `css/nav.css` from Task 1-4 — this task wires the JS behavior
  - [ ] `aria-expanded` attribute is updated correctly on the hamburger button
  - [ ] Clicking outside the menu (on the overlay or pressing Escape key) closes the menu
  - [ ] Try/catch wraps the `initNav` body

#### Technical Context

JS module structure from the project plan:
```javascript
// nav.js
export function initNav() {
  try {
    initActiveTracking();
    initMobileMenu();
    initSmoothScroll();
  } catch (err) {
    console.warn('[nav] Failed to initialize:', err);
  }
}

function initActiveTracking() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
}

function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on nav link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

function initSmoothScroll() {
  // Smooth scroll is handled by `html { scroll-behavior: smooth }` in CSS reset.
  // This function can add offset compensation for the fixed header height.
  const navHeight = document.querySelector('.site-header')?.offsetHeight || 0;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.offsetTop - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
```

Mobile menu CSS to add to `css/nav.css`:
```css
.nav-menu {
  display: flex;
  gap: var(--space-xl);
  align-items: center;
}

@media (max-width: 767px) {
  .nav-menu {
    display: none;
    position: fixed;
    inset: 0;
    background-color: var(--color-bg-primary);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-3xl);
    z-index: 99;
  }

  .nav--open .nav-menu {
    display: flex;
  }

  .nav-toggle {
    display: block;
    z-index: 100;
  }
}
```

The hamburger button should swap its icon between the hamburger and close SVGs from Task 2-7. This can be done by toggling a class on the button.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 3-5: Implement Project Card 3D Tilt Hover Effect

**Phase:** Animations and Interactivity
**Priority:** P1
**Dependencies:** Task 2-5
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want project cards to respond to my mouse with a subtle 3D tilt so that interacting with the projects section feels engaging and polished.

#### Acceptance Criteria

- **AC1: Cards tilt in response to mouse position on desktop**
  - Given: The user is on a desktop device with hover capability
  - When: The user moves their mouse over a project card
  - Then: The card applies a CSS `perspective(800px) rotateY(...deg) rotateX(...deg) scale(1.02)` transform, with rotation values calculated from the cursor's position relative to the card center (maximum ±5 degrees)

- **AC2: Cards reset to flat when mouse leaves**
  - Given: The user has hovered over a project card
  - When: The mouse leaves the card (`mouseleave` event fires)
  - Then: The card smoothly returns to `perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)` with a CSS transition

- **AC3: Tilt effect is disabled on touch devices**
  - Given: The user is on a touch/mobile device
  - When: `initProjectCards()` is called
  - Then: `window.matchMedia('(hover: none)').matches` returns true and the function returns early; no mousemove listeners are attached to cards

- **AC4: Cards have a CSS `will-change` property for GPU compositing**
  - Given: The project cards CSS is loaded
  - When: A card is inspected in DevTools
  - Then: `.project-card` has `will-change: transform` to hint to the browser that transforms will change frequently

- **AC5: Project card implementation checklist**
  - [ ] `js/projects.js` exports `initProjectCards` as a named export
  - [ ] Touch guard: `if (window.matchMedia('(hover: none)').matches) return;`
  - [ ] Reduced motion guard: `if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;`
  - [ ] `mousemove` handler calculates `x` and `y` as normalized values in the range `[-0.5, 0.5]` relative to the card dimensions
  - [ ] `rotateY` uses `x * 5` degrees and `rotateX` uses `-y * 5` degrees
  - [ ] `mouseleave` handler resets the transform
  - [ ] `.project-card` in `css/projects.css` has `transition: transform 0.3s ease` for smooth reset
  - [ ] Try/catch wraps the `initProjectCards` body

#### Technical Context

Full implementation from the project plan:
```javascript
// projects.js
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
```

CSS updates needed in `css/projects.css`:
```css
.project-card {
  /* existing styles from Task 2-5, plus: */
  will-change: transform;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.3s ease;
}
```

Note: The `transition` on `.project-card` applies to the reset (mouseleave). During `mousemove`, the transform is applied directly to `style` without transition delay, making it feel responsive. On `mouseleave`, the transition kicks in and smoothly returns the card to flat.

The existing CSS hover effect from Task 2-5 (`box-shadow` and `border-color` on `:hover`) remains in place — the JS tilt layer is additive on top of the CSS hover state.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 3-6: Wire the Main JS Entry Point and Verify Full Integration

**Phase:** Animations and Interactivity
**Priority:** P1
**Dependencies:** Task 3-1, Task 3-2, Task 3-3, Task 3-4, Task 3-5
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to finalize `js/main.js` to correctly import and initialize all modules, add the `<noscript>` fallback to `index.html`, and perform end-to-end verification that all Phase 3 interactions work together without console errors so that the site is ready for Phase 4 polish.

#### Acceptance Criteria

- **AC1: `main.js` imports and calls all module init functions**
  - Given: The page loads
  - When: `DOMContentLoaded` fires
  - Then: All five init functions are called: `initScrollProgress()`, `initScrollReveal()`, `initParallax()`, `initNav()`, `initProjectCards()`

- **AC2: No console errors in any supported browser**
  - Given: The complete Phase 1–3 implementation is deployed or served locally
  - When: The page is loaded and interacted with (scrolling, hovering, clicking nav links) in Chrome, Firefox, and Safari
  - Then: The browser console shows zero errors (warnings from missing content are acceptable but must be clearly labeled)

- **AC3: Site is fully functional with JavaScript disabled**
  - Given: JavaScript is disabled in the browser
  - When: The page loads
  - Then: All content is visible (the `<noscript>` style tag makes `[data-reveal]` elements visible), all nav anchor links work, all external links work, no broken layout occurs

- **AC4: Scroll performance meets the 60fps target**
  - Given: The complete Phase 3 JS is active
  - When: The user scrolls through the page on a mid-range device (simulated in Chrome DevTools with 4x CPU throttle)
  - Then: No visible jank is observed; the Performance panel shows no frames dropping below ~16ms paint time during scroll

- **AC5: Main entry point checklist**
  - [ ] `js/main.js` uses ES module `import` syntax for all five modules
  - [ ] All imports use relative paths (`./nav.js`, not absolute paths)
  - [ ] `document.addEventListener('DOMContentLoaded', ...)` wraps all init calls
  - [ ] `<noscript>` block is present in `index.html` `<head>` making `[data-reveal]` elements visible
  - [ ] No module has a top-level side effect — all behavior is inside exported functions
  - [ ] The `<script type="module" src="js/main.js">` tag in `index.html` has no `defer` or `async` attribute (ES modules are deferred by default)

#### Technical Context

Final `main.js` from the project plan:
```javascript
// main.js — Entry point. Imports and initializes all feature modules.
import { initScrollProgress } from './scroll-progress.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initParallax } from './parallax.js';
import { initNav } from './nav.js';
import { initProjectCards } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initScrollReveal();
  initParallax();
  initNav();
  initProjectCards();
});
```

`<noscript>` block for `index.html` (place in `<head>`):
```html
<noscript>
  <style>
    [data-reveal] { opacity: 1 !important; transform: none !important; }
    .nav-toggle { display: none !important; }
  </style>
</noscript>
```

All JS files must use:
- `const` and `let` — never `var`
- Strict equality `===` — never `==`
- JSDoc comments on all exported functions
- Try/catch at module initialization level

Performance verification steps (manual):
1. Open Chrome DevTools > Performance tab
2. Enable CPU throttling (4x slowdown)
3. Record while scrolling through the full page
4. Verify no long tasks (> 50ms) are caused by scroll handlers
5. Verify progress bar, reveal animations, and parallax all run within frame budget

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review
