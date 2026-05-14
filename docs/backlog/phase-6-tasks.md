# Phase 6: Animations, Accessibility & Polish

---

### Task 6-1: Implement scroll-triggered animations

**Phase:** Animations, Accessibility & Polish
**Priority:** P1
**Dependencies:** Tasks 2-1, 2-2, 3-2, 4-2, 5-1, 5-2
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want content to fade in smoothly as I scroll down the page so that the site feels polished and modern — consistent with Spotify's content-loading aesthetic.

#### Acceptance Criteria

- **AC1: Elements animate in on scroll**
  - Given: The page is loaded and the user scrolls down
  - When: An animated element enters the viewport (15% visible)
  - Then: The element transitions from `opacity: 0; transform: translateY(20px)` to `opacity: 1; transform: translateY(0)` over `400ms ease`

- **AC2: No motion when user prefers reduced motion**
  - Given: The user's OS has `prefers-reduced-motion: reduce` set
  - When: The page loads and the user scrolls
  - Then: No transform or opacity transitions occur — elements appear instantly

- **AC3: One observer instance, correct targets**
  - [ ] `assets/js/animations.js` creates exactly ONE `IntersectionObserver` instance
  - [ ] Observer threshold: `0.15`
  - [ ] Observer `rootMargin`: `0px 0px -50px 0px`
  - [ ] Elements observed: all `.section-heading`, `.project-card`, `.stat-card`, `.pipeline-node`, `.skills__group`, `.contact__inner`
  - [ ] On intersection: class `is-visible` added to element; observer disconnects from that element after animating (no re-trigger on scroll back up)
  - [ ] No `console.log` statements in production code

- **AC4: CSS animation classes**
  - [ ] `assets/css/animations.css` created
  - [ ] `.fade-in-up` class: `opacity: 0; transform: translateY(20px); transition: opacity 400ms ease, transform 400ms ease`
  - [ ] `.fade-in-up.is-visible`: `opacity: 1; transform: translateY(0)`
  - [ ] `@media (prefers-reduced-motion: reduce)` block: `.fade-in-up` sets `transition: none; transform: none; opacity: 1`
  - [ ] `.fade-in-up` class applied in HTML to all target elements listed in AC3

#### Technical Context

Files to create/edit:
- Create: `assets/css/animations.css`
- Create: `assets/js/animations.js`
- Edit: `index.html` — add `.fade-in-up` class to target elements

`animations.js` implementation:
```javascript
const animatedEls = document.querySelectorAll('.fade-in-up');

if (animatedEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  animatedEls.forEach(el => observer.observe(el));
}
```

`animations.css` implementation:
```css
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 400ms ease, transform 400ms ease;
}

.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 6-2: Accessibility audit and fixes

**Phase:** Animations, Accessibility & Polish
**Priority:** P1
**Dependencies:** Task 6-1
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to audit and fix all accessibility issues across the site so that every user — including those using keyboards or assistive technology — can navigate and consume all content.

#### Acceptance Criteria

- **AC1: All interactive elements keyboard accessible**
  - Given: The user navigates the page using only the Tab key
  - When: Tab is pressed repeatedly from the browser address bar
  - Then: Focus visits every interactive element (nav links, CTA buttons, project GitHub links, contact links) in logical DOM order with a visible focus ring

- **AC2: Focus ring matches design**
  - Given: Any interactive element receives keyboard focus
  - When: The element is inspected visually
  - Then: A `2px solid var(--color-accent)` outline is visible with `2px` offset — not the default browser focus ring

- **AC3: ARIA and semantic requirements**
  - [ ] `<html lang="en">` confirmed present (set in Task 1-1)
  - [ ] Heading hierarchy is correct: one `h1` in hero, `h2` for each section, `h3` for sub-items (stat cards, skill categories, pipeline node names, project card titles)
  - [ ] All external link `<a>` tags that open in new tab have `aria-label` ending in `(opens in new tab)` — e.g., `aria-label="LinkedIn (opens in new tab)"`
  - [ ] Pipeline connector elements have `aria-hidden="true"`
  - [ ] Hero scroll indicator has `aria-hidden="true"`
  - [ ] Stat cards have readable text: number and label are in separate elements, not combined in one string
  - [ ] No `tabindex` values above `0` anywhere

- **AC4: Color contrast**
  - [ ] All body text (`var(--color-text-primary)` on `var(--color-bg)`) meets WCAG AA: ≥ 4.5:1 contrast ratio
  - [ ] Secondary text (`var(--color-text-secondary)` `#B3B3B3` on `#121212`) contrast ratio verified ≥ 4.5:1
  - [ ] Accent green (`#1DB954`) on black (`#121212`) contrast ratio verified — note: this may only meet AA for large text (≥ 18pt); do not use as body text color

#### Technical Context

Files to edit (any that need fixes after audit):
- `index.html` — add `aria-label` attributes, fix heading hierarchy if needed
- `assets/css/base.css` — add global focus ring style:

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Remove default outline for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

Contrast ratios for reference:
- `#FFFFFF` on `#121212`: 19.6:1 ✓
- `#B3B3B3` on `#121212`: 7.4:1 ✓
- `#1DB954` on `#121212`: 4.5:1 (passes AA for large text; borderline for small)
- `#6a6a6a` on `#121212`: ~3.2:1 — only use for decorative/non-critical text

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 6-3: Responsive QA and polish

**Phase:** Animations, Accessibility & Polish
**Priority:** P1
**Dependencies:** Task 6-2
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to verify and fix the layout at all four required breakpoints so that the site renders correctly on every device class without overflow, cramping, or broken grids.

#### Acceptance Criteria

- **AC1: No horizontal overflow at any breakpoint**
  - Given: The page is loaded at `375px`, `768px`, `1024px`, and `1440px` viewport widths
  - When: The page is scrolled vertically
  - Then: No section causes horizontal scrollbar or content overflow at any breakpoint

- **AC2: All sections readable at 375px**
  - Given: The viewport is `375px` wide (iPhone SE)
  - When: Each section is viewed
  - Then: All text is fully visible, no truncation, no overlapping elements, buttons are at least `44px` tall (touch target)

- **AC3: Polish checklist**
  - [ ] Section vertical spacing consistent: all sections use `padding: var(--spacing-section) 0` (`80px` top/bottom)
  - [ ] Nav collapses gracefully at `480px` — links remain accessible (may hide overflow, stack, or abbreviate — hamburger not required)
  - [ ] Project card grid collapses to 1 column at `768px` or below
  - [ ] About grid collapses to 1 column at `768px` or below
  - [ ] Pipeline diagram switches to vertical at `768px` or below (handled by Task 4-3)
  - [ ] Skills groups reflow to 1-column at `480px` or below
  - [ ] All button touch targets: minimum `44px` height
  - [ ] Hero `h1` uses `clamp()` font size — confirmed readable at all breakpoints
  - [ ] HTML validates at W3C with no errors
  - [ ] CSS validates at W3C with no errors (backdrop-filter vendor prefix warnings acceptable)
  - [ ] Browser console is error-free on load

#### Technical Context

Files to edit: any CSS file that needs breakpoint fixes.

Standard breakpoints (mobile-first):
```css
/* Mobile default: 0–479px */
/* Small: 480px+ */
@media (min-width: 480px) { }
/* Tablet: 768px+ */
@media (min-width: 768px) { }
/* Desktop: 1024px+ */
@media (min-width: 1024px) { }
```

Common fixes to check:
- Add `overflow-x: hidden` to `body` if any section causes bleed
- Ensure `.container` has horizontal padding at all widths
- Check nav wrapping behavior at `375px`

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review
