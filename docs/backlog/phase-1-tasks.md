# Phase 1 — Foundation and Layout

> **Objective:** Build the structural skeleton of the site. At the end of this phase the site loads in a browser with correct colors, typography, and a responsive layout — but with minimal content.
>
> **Dependencies:** None — this is the first phase.

---

### Task 1-1: Create the HTML Document Shell

**Phase:** Foundation and Layout
**Priority:** P0
**Dependencies:** None
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to create the root `index.html` file with all required `<head>` metadata, semantic landmark elements, and empty section placeholders so that every subsequent task has a valid HTML document to build upon.

#### Acceptance Criteria

- **AC1: Valid HTML5 document structure**
  - Given: The file `index.html` does not yet exist at the repo root
  - When: The file is created
  - Then: It opens in Chrome, Firefox, and Safari without any browser console errors and passes W3C HTML validation with zero errors

- **AC2: Google Fonts load correctly**
  - Given: The `<head>` contains `<link>` preconnect and stylesheet tags for Google Fonts
  - When: The page is loaded with an active network connection
  - Then: Montserrat, Inter, and JetBrains Mono fonts are applied to the page (visible in DevTools Elements panel)

- **AC3: Semantic landmark elements are present**
  - Given: The page is rendered
  - When: A screen reader or accessibility tool inspects the page
  - Then: Exactly one `<header role="banner">`, one `<main id="main-content">`, and one `<footer>` landmark are present

- **AC4: Skip-to-content link is functional**
  - Given: A keyboard user is on the page
  - When: The user presses Tab as the very first action
  - Then: A "Skip to main content" link becomes visible and, when activated, moves focus to `<main id="main-content">`

- **AC5: All section placeholders are present**
  - [ ] `<section id="hero" class="section section--hero">` exists inside `<main>`
  - [ ] `<section id="about" class="section" data-section-number="01">` exists
  - [ ] `<section id="skills" class="section" data-section-number="02">` exists
  - [ ] `<section id="experience" class="section" data-section-number="03">` exists
  - [ ] `<section id="projects" class="section" data-section-number="04">` exists
  - [ ] `<section id="testimonials" class="section" data-section-number="05">` exists
  - [ ] `<section id="education" class="section" data-section-number="06">` exists
  - [ ] `<section id="contact" class="section" data-section-number="07">` exists
  - [ ] `<html lang="en">` is set on the root element
  - [ ] `<meta charset="UTF-8">` is present
  - [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present
  - [ ] `<title>Brett Hardiman — AI/ML Engineer & Agentic AI Specialist</title>` is set
  - [ ] `<link rel="stylesheet" href="styles.css">` is present
  - [ ] `<script type="module" src="js/main.js"></script>` is present at the end of `<body>`
  - [ ] `<nav>` inside `<header>` contains anchor links to `#hero`, `#about`, `#skills`, `#experience`, `#projects`, `#contact`
  - [ ] `<div class="scroll-progress" role="progressbar" aria-label="Page scroll progress">` is inside `<header>`

#### Technical Context

The full intended HTML structure from the project plan is:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brett Hardiman — AI/ML Engineer & Agentic AI Specialist</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Montserrat:wght@600;700;800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header class="site-header" role="banner">
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <!-- Nav content — links to #about, #skills, #experience, #projects, #contact -->
    </nav>
    <div class="scroll-progress" role="progressbar" aria-label="Page scroll progress"></div>
  </header>
  <main id="main-content">
    <section id="hero" class="section section--hero">...</section>
    <section id="about" class="section" data-section-number="01">...</section>
    <section id="skills" class="section" data-section-number="02">...</section>
    <section id="experience" class="section" data-section-number="03">...</section>
    <section id="projects" class="section" data-section-number="04">...</section>
    <section id="testimonials" class="section" data-section-number="05">...</section>
    <section id="education" class="section" data-section-number="06">...</section>
    <section id="contact" class="section" data-section-number="07">...</section>
  </main>
  <footer class="site-footer">...</footer>
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

Font loading uses `display=swap` to prevent FOIT (flash of invisible text). All JS is loaded as ES modules — deferred by default.

A placeholder `js/main.js` file must also be created (even if empty) so the `<script>` tag does not produce a 404 error.

A placeholder `styles.css` at repo root must also be created (even if containing only a comment) so the `<link>` tag does not produce a 404 error.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 1-2: Create the CSS Design System (Variables, Reset, Typography)

**Phase:** Foundation and Layout
**Priority:** P0
**Dependencies:** Task 1-1
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to implement the CSS design tokens, a modern CSS reset, and typography styles so that all future CSS files can reference a consistent set of variables and fonts without redefining them.

#### Acceptance Criteria

- **AC1: CSS entry point imports all modules**
  - Given: `styles.css` exists at the repo root
  - When: A browser loads the page
  - Then: `styles.css` uses `@import` to load `css/variables.css`, `css/reset.css`, and `css/typography.css` (and stub imports for all other planned CSS modules so no 404s occur)

- **AC2: All design tokens are defined as CSS custom properties**
  - Given: `css/variables.css` is loaded
  - When: DevTools inspects the `:root` element
  - Then: All color, typography, spacing, and breakpoint tokens listed in the Technical Context are present as CSS custom properties

- **AC3: CSS reset normalizes browser defaults**
  - Given: `css/reset.css` is loaded
  - When: Any element is inspected
  - Then: `box-sizing: border-box` is applied globally, default margins on `<body>` and headings are removed, `scroll-behavior: smooth` is on the `html` element, and `img` elements have `max-width: 100%` and `display: block`

- **AC4: Typography styles apply correct fonts**
  - Given: `css/typography.css` is loaded and Google Fonts are available
  - When: The page renders
  - Then: `h1`–`h6` elements use Montserrat (600–800 weight), `body` uses Inter (400 weight), and elements with class `.mono` or inside `.skill-badge` use JetBrains Mono

- **AC5: Design token completeness**
  - [ ] All color tokens defined: `--color-green`, `--color-green-hover`, `--color-green-dark`, `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-elevated`, `--color-bg-card`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-border`, `--color-border-hover`, `--color-black`, `--color-white`
  - [ ] All font-size tokens defined from `--font-size-xs` (0.75rem) through `--font-size-5xl` (4rem) plus `--font-size-hero: clamp(2.5rem, 6vw, 5rem)`
  - [ ] All spacing tokens defined from `--space-xs` (0.25rem) through `--space-section` (8rem)
  - [ ] Breakpoint values documented as comments in `variables.css`: 576px, 768px, 1024px, 1280px, 1440px
  - [ ] `body` background set to `var(--color-bg-primary)` and default color set to `var(--color-text-primary)`
  - [ ] CSS passes W3C CSS Validation with no errors

#### Technical Context

File locations:
- `styles.css` — repo root, CSS entry point
- `css/variables.css` — all design tokens
- `css/reset.css` — normalize/reset styles
- `css/typography.css` — font declarations and type scale

Full color palette from the project plan:
```css
:root {
  --color-green: #1DB954;
  --color-green-hover: #1ED760;
  --color-green-dark: #158C3F;
  --color-bg-primary: #191414;
  --color-bg-secondary: #121212;
  --color-bg-elevated: #1A1A1A;
  --color-bg-card: #232323;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #B3B3B3;
  --color-text-muted: #727272;
  --color-border: #333333;
  --color-border-hover: #535353;
  --color-black: #000000;
  --color-white: #FFFFFF;
}
```

Full font scale:
```css
:root {
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-md: 1.125rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --font-size-3xl: 2.5rem;
  --font-size-4xl: 3rem;
  --font-size-5xl: 4rem;
  --font-size-hero: clamp(2.5rem, 6vw, 5rem);
}
```

Full spacing scale:
```css
:root {
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
  --space-section: 8rem;
}
```

Breakpoints (document as comments — cannot be used in media queries as variables):
```
/* --bp-sm: 576px */
/* --bp-md: 768px */
/* --bp-lg: 1024px */
/* --bp-xl: 1280px */
/* --bp-2xl: 1440px */
```

Font roles from the project plan:
| Role      | Font           | Weight(s)     | Fallback Stack         |
|-----------|----------------|---------------|------------------------|
| Headings  | Montserrat     | 600, 700, 800 | system-ui, sans-serif  |
| Body      | Inter          | 300, 400, 500 | system-ui, sans-serif  |
| Mono      | JetBrains Mono | 400           | monospace              |

The `styles.css` entry point must also include stub `@import` statements for all planned CSS modules even if those files are stubs (to avoid future 404s when they are referenced):
`css/layout.css`, `css/nav.css`, `css/hero.css`, `css/about.css`, `css/skills.css`, `css/experience.css`, `css/projects.css`, `css/testimonials.css`, `css/education.css`, `css/contact.css`, `css/footer.css`, `css/animations.css`, `css/responsive.css`

All stub CSS files must exist with at minimum a comment header explaining their purpose.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 1-3: Implement the Layout System and Section Base Styles

**Phase:** Foundation and Layout
**Priority:** P0
**Dependencies:** Task 1-2
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to implement the container, section layout, and responsive grid utilities in `css/layout.css` and `css/responsive.css` so that all content sections have a consistent, responsive structural foundation.

#### Acceptance Criteria

- **AC1: Container class constrains content width correctly**
  - Given: An element has class `section-container`
  - When: Viewed on a viewport wider than 1200px
  - Then: The content is centered and constrained to a max-width of 1200px with horizontal padding

- **AC2: Section base styles apply consistent padding**
  - Given: Any `<section class="section">` element
  - When: Viewed on any viewport
  - Then: The section has vertical padding equivalent to `--space-section` (8rem) and the background is set to the correct background color from the design system

- **AC3: Layout is single-column on mobile**
  - Given: The viewport width is less than 768px
  - When: The page is rendered
  - Then: All section content stacks vertically in a single column with no horizontal overflow

- **AC4: Layout expands to multi-column on desktop**
  - Given: The viewport width is 1024px or wider
  - When: The page is rendered
  - Then: The `.about-content` area uses a two-column layout (text + image placeholder)

- **AC5: Responsive foundation checklist**
  - [ ] `css/layout.css` contains the `.section-container` class with `max-width: 1200px`, `margin: 0 auto`, and appropriate horizontal padding
  - [ ] `css/layout.css` contains base styles for `.section` class (min-height, vertical padding, background)
  - [ ] `css/layout.css` contains a `.section-container--centered` modifier that centers text and children
  - [ ] `css/responsive.css` uses mobile-first `min-width` media queries at 576px, 768px, 1024px, 1280px breakpoints
  - [ ] No horizontal scrollbar appears on any viewport width between 320px and 1440px
  - [ ] `css/layout.css` contains CSS Grid utilities for the projects grid (2-column on desktop, 1-column on mobile)

#### Technical Context

The layout system must support:
- `.section-container` — max-width: 1200px, centered, with horizontal padding
- `.section-container--centered` — additionally centers text and flex children
- `.section` — base section styles with `--space-section` vertical padding
- A responsive projects grid: `display: grid; grid-template-columns: repeat(2, 1fr);` on desktop, `repeat(1, 1fr)` on mobile
- A responsive skills grid: flexible grid that wraps badges at any width

Responsive breakpoints to use as literal pixel values in media queries (not as CSS variables):
- 576px — Large phones
- 768px — Tablets (key breakpoint for single to multi-column transitions)
- 1024px — Small laptops
- 1280px — Desktops

Mobile-first approach: base styles are for mobile, `@media (min-width: ...)` adds complexity.

The `css/responsive.css` file is the designated home for all media query overrides that affect multiple components. Component-specific responsive adjustments may also live in their own component CSS files.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 1-4: Implement the Fixed Navigation Bar

**Phase:** Foundation and Layout
**Priority:** P0
**Dependencies:** Task 1-2, Task 1-3
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to implement the fixed navigation bar with the site logo, nav links, mobile hamburger menu structure, and a CSS-only hamburger toggle so that visitors can navigate to any section from any scroll position, on any screen size.

#### Acceptance Criteria

- **AC1: Nav bar is fixed at the top of the viewport**
  - Given: The user has scrolled down the page
  - When: The nav bar is inspected
  - Then: It remains pinned to the top of the viewport (`position: fixed; top: 0`) and does not scroll away

- **AC2: Semi-transparent frosted glass background renders on supported browsers**
  - Given: The nav bar is rendered in Chrome or Safari (which support `backdrop-filter`)
  - When: Content scrolls behind the nav
  - Then: The nav has a semi-transparent dark background with a blur effect
  - Given: The nav bar is rendered in a browser that does not support `backdrop-filter`
  - When: Content scrolls behind the nav
  - Then: The nav has a solid dark background (`#191414`) as a fallback (via `@supports`)

- **AC3: Nav links scroll to correct sections**
  - Given: The nav contains anchor links to `#about`, `#skills`, `#experience`, `#projects`, and `#contact`
  - When: A user clicks any nav link
  - Then: The page smooth-scrolls to the corresponding section (smooth-scroll is set via `html { scroll-behavior: smooth; }` from Task 1-2)

- **AC4: Hamburger menu is visible on mobile and hidden on desktop**
  - Given: The viewport width is less than 768px
  - When: The page is rendered
  - Then: A hamburger button (`<button class="nav-toggle" aria-label="Toggle navigation">`) is visible and the full nav link list is hidden
  - Given: The viewport width is 768px or wider
  - When: The page is rendered
  - Then: The full nav link list is visible and the hamburger button is hidden

- **AC5: CSS-only hamburger toggle works without JavaScript**
  - Given: JavaScript is disabled in the browser
  - When: A user clicks the hamburger button on mobile
  - Then: The mobile nav menu opens (this may be implemented as a CSS-only checkbox hack or left as a non-functional button until Task 3-4 adds JS; the button must not cause errors)

- **AC6: Navigation implementation checklist**
  - [ ] `css/nav.css` contains all nav styles
  - [ ] `.site-header` uses `position: fixed; top: 0; left: 0; right: 0; z-index: 100`
  - [ ] `.site-header` background: `rgba(25, 20, 20, 0.9)` with `backdrop-filter: blur(10px)` and `-webkit-backdrop-filter: blur(10px)`
  - [ ] `@supports (backdrop-filter: blur(10px))` or `@supports not (backdrop-filter: blur(10px))` is used for the solid fallback
  - [ ] `.site-header` has `border-bottom: 1px solid var(--color-border)`
  - [ ] Nav logo/name ("Brett Hardiman" or "BH") is on the left side
  - [ ] Nav links are on the right side on desktop (Flexbox with `justify-content: space-between`)
  - [ ] `.nav-link.active` CSS class is defined with a green accent style (for use by Phase 3 JS)
  - [ ] HTML nav includes `aria-label="Main navigation"` on the `<nav>` element
  - [ ] Hamburger `<button>` has `aria-expanded="false"` and `aria-label="Toggle navigation"` attributes
  - [ ] `z-index` is set to 100 for the header so it layers above all content

#### Technical Context

Nav bar CSS from the project plan:
```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(25, 20, 20, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}
```

The `.nav-link.active` state (green accent) is defined in CSS here but will not be toggled by JS until Task 3-4. The class can be tested statically by manually adding it to a link in the HTML.

The mobile menu toggle should either:
- Use a CSS-only approach (e.g., a hidden checkbox `<input type="checkbox">` + `<label>`) so it works without JS, OR
- Leave the hamburger button non-functional until Phase 3 adds the JS toggle (the button must not throw JS errors and must not have an `onclick` attribute — the JS will be added separately)

The nav links in the HTML must be plain anchor elements: `<a href="#about" class="nav-link">About</a>`.

The scroll progress bar (`<div class="scroll-progress">`) lives inside `<header>` and is styled in `css/animations.css` (Task 3-1). Its CSS stub can be left in `css/animations.css` for now.

All page content below the fixed header must have sufficient `padding-top` to not be hidden behind the nav. This is handled in `css/layout.css` by giving `<main>` appropriate top padding.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 1-5: Create the File System Scaffold and Asset Placeholders

**Phase:** Foundation and Layout
**Priority:** P0
**Dependencies:** Task 1-1
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to create the complete project file and directory scaffold — including all CSS stub files, all JS stub files, the assets directory with placeholder files, and the `.env.example` file — so that every task in later phases can write to pre-existing files without creating directory structure conflicts.

#### Acceptance Criteria

- **AC1: All CSS module files exist**
  - Given: The project has been scaffolded
  - When: The `css/` directory is listed
  - Then: All 15 CSS files exist: `variables.css`, `reset.css`, `typography.css`, `layout.css`, `nav.css`, `hero.css`, `about.css`, `skills.css`, `experience.css`, `projects.css`, `testimonials.css`, `education.css`, `contact.css`, `footer.css`, `animations.css`, `responsive.css`

- **AC2: All JS module files exist**
  - Given: The project has been scaffolded
  - When: The `js/` directory is listed
  - Then: All 6 JS files exist: `main.js`, `nav.js`, `scroll-progress.js`, `scroll-reveal.js`, `parallax.js`, `projects.js`

- **AC3: Asset placeholder files exist**
  - Given: The project has been scaffolded
  - When: The `assets/` directory is listed
  - Then: `assets/images/` and `assets/icons/` directories exist; a placeholder SVG file `assets/images/project-placeholder.svg` exists with correct dimensions (16:9 aspect ratio, minimum 400x225px) styled to match the dark design theme

- **AC4: Environment and config files exist**
  - [ ] `.env.example` exists at the repo root with a comment explaining that no secrets are currently needed but the file serves as a placeholder for future configuration
  - [ ] `.gitignore` exists and includes `.env` and `node_modules/` at minimum
  - [ ] All JS module stubs export a named function matching the expected import in `main.js` (e.g., `scroll-progress.js` exports `initScrollProgress`)
  - [ ] No JS stub file throws an error when imported by `main.js`
  - [ ] All CSS stub files contain at minimum a comment header (file does not cause CSS parse errors when imported by `styles.css`)

#### Technical Context

Expected file structure from the project plan:
```
personal-portfolio/
├── index.html
├── styles.css
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── typography.css
│   ├── layout.css
│   ├── nav.css
│   ├── hero.css
│   ├── about.css
│   ├── skills.css
│   ├── experience.css
│   ├── projects.css
│   ├── testimonials.css
│   ├── education.css
│   ├── contact.css
│   ├── footer.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── nav.js
│   ├── scroll-progress.js
│   ├── scroll-reveal.js
│   ├── parallax.js
│   └── projects.js
├── assets/
│   ├── images/
│   │   └── project-placeholder.svg
│   └── icons/
│       └── (empty, will be populated in Task 2-8)
├── .env.example
└── .gitignore
```

JS module stubs must follow this pattern:
```javascript
// nav.js — Navigation active tracking, mobile menu toggle, smooth scroll
// Full implementation: Task 3-4

/**
 * Initializes navigation interactions.
 */
export function initNav() {
  // Implementation added in Phase 3
}
```

The `main.js` entry point must import all modules and call their init functions:
```javascript
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

The project-placeholder SVG should be a rectangle (e.g., 800x450) with a dark background fill (`#232323`) and a centered text label "Project Screenshot" in `#535353` color.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review
