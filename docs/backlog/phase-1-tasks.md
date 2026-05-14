# Phase 1: Foundation & Design System

---

### Task 1-1: Create HTML skeleton with semantic section shells

**Phase:** Foundation & Design System
**Priority:** P0
**Dependencies:** None
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to create the `index.html` file with all semantic section shells so that every subsequent task has a stable, valid HTML document to build into.

#### Acceptance Criteria

- **AC1: All sections present**
  - Given: `index.html` is opened in a browser
  - When: The page loads
  - Then: The DOM contains `<nav>`, `<main>`, and within `<main>`: `<section id="hero">`, `<section id="about">`, `<section id="projects">`, `<section id="pipeline">`, `<section id="skills">`, `<section id="contact">`, and `<footer>`

- **AC2: Google Fonts loaded**
  - Given: `index.html` `<head>` is inspected
  - When: The page loads
  - Then: Two `<link>` tags for Inter are present — one `rel="preconnect"` to `https://fonts.googleapis.com` and one `rel="stylesheet"` loading Inter weights 400, 700, 900

- **AC3: Meta and structural requirements**
  - [ ] `<meta charset="UTF-8">` present in `<head>`
  - [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">` present
  - [ ] `<html lang="en">` set on root element
  - [ ] `<title>Brett Hardiman — AI Product Owner</title>` set
  - [ ] All CSS `<link>` tags reference relative paths (e.g., `assets/css/variables.css`) — no absolute URLs
  - [ ] All JS `<script>` tags placed at bottom of `<body>` with `defer` attribute
  - [ ] File passes W3C HTML validation with no errors

#### Technical Context

File to create: `index.html` at repo root.

CSS load order in `<head>` (order matters for cascade):
1. `assets/css/variables.css`
2. `assets/css/base.css`
3. `assets/css/nav.css`
4. `assets/css/hero.css`
5. `assets/css/about.css`
6. `assets/css/projects.css`
7. `assets/css/pipeline.css`
8. `assets/css/skills.css`
9. `assets/css/contact.css`
10. `assets/css/animations.css`

JS files at bottom of `<body>` with `defer`:
1. `assets/js/animations.js`
2. `assets/js/pipeline-diagram.js`

Section IDs must match exactly: `hero`, `about`, `projects`, `pipeline`, `skills`, `contact`.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 1-2: Create CSS design token file (variables.css)

**Phase:** Foundation & Design System
**Priority:** P0
**Dependencies:** Task 1-1
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to define all design tokens as CSS custom properties in `assets/css/variables.css` so that every other CSS file pulls from a single source of truth and no raw color/spacing values are hardcoded elsewhere.

#### Acceptance Criteria

- **AC1: All color tokens defined**
  - Given: `variables.css` is loaded
  - When: Any other CSS file references a color token like `var(--color-bg)`
  - Then: The value resolves correctly with no fallback needed

- **AC2: No raw values in other CSS files**
  - Given: All CSS files are written
  - When: Any CSS file other than `variables.css` is grepped for raw hex colors (e.g., `#121212`, `#1DB954`)
  - Then: No matches are found — all colors use `var(--color-*)` tokens

- **AC3: Token completeness checklist**
  - [ ] `--color-bg: #121212`
  - [ ] `--color-surface: #181818`
  - [ ] `--color-surface-hover: #282828`
  - [ ] `--color-accent: #1DB954`
  - [ ] `--color-accent-hover: #1ed760`
  - [ ] `--color-text-primary: #FFFFFF`
  - [ ] `--color-text-secondary: #B3B3B3`
  - [ ] `--color-text-muted: #6a6a6a`
  - [ ] `--color-border: #282828`
  - [ ] `--font-family-base: 'Inter', system-ui, -apple-system, sans-serif`
  - [ ] `--transition-fast: 200ms ease`
  - [ ] `--transition-base: 300ms ease`
  - [ ] `--max-width: 1200px`
  - [ ] `--spacing-section: 80px` (vertical padding for sections)
  - [ ] All tokens scoped to `:root`

#### Technical Context

File to create: `assets/css/variables.css`

All tokens must be defined inside `:root { }`. No selectors other than `:root` should appear in this file.

Spacing scale (add as tokens):
- `--space-xs: 8px`
- `--space-sm: 16px`
- `--space-md: 24px`
- `--space-lg: 40px`
- `--space-xl: 64px`

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 1-3: Create base.css (reset, typography, global styles)

**Phase:** Foundation & Design System
**Priority:** P0
**Dependencies:** Task 1-2
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to create `assets/css/base.css` with a CSS reset, body defaults, and typography scale so that all sections start from a consistent visual baseline with no browser default interference.

#### Acceptance Criteria

- **AC1: Background and text defaults applied**
  - Given: `index.html` is opened in a browser with only `variables.css` and `base.css` loaded
  - When: The page renders
  - Then: The page background is `#121212`, body text is `#FFFFFF`, and the Inter font family is applied

- **AC2: Box model reset applied**
  - Given: Any element is inspected in browser DevTools
  - When: `box-sizing` is checked
  - Then: All elements use `border-box` box sizing

- **AC3: Typography and link styles**
  - [ ] `margin: 0; padding: 0` reset on `*, *::before, *::after`
  - [ ] `box-sizing: border-box` on `*, *::before, *::after`
  - [ ] `body` sets `font-family: var(--font-family-base)`, `background-color: var(--color-bg)`, `color: var(--color-text-primary)`, `line-height: 1.6`
  - [ ] `img` set to `max-width: 100%; display: block`
  - [ ] `a` default color inherits; no underline by default; transition on color using `var(--transition-fast)`
  - [ ] Heading tags (`h1`–`h3`) set `font-weight: 700`, `line-height: 1.2`, `letter-spacing: -0.02em`
  - [ ] `h1` font-size: `clamp(2.5rem, 5vw, 4rem)` (fluid sizing)
  - [ ] `h2` font-size: `clamp(1.75rem, 3vw, 2.5rem)`
  - [ ] `h3` font-size: `1.25rem`
  - [ ] `.container` utility class: `max-width: var(--max-width); margin: 0 auto; padding: 0 var(--space-md)`

#### Technical Context

File to create: `assets/css/base.css`

Do not put any component-specific styles in this file. Only global resets, body, typography, and utility classes belong here.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 1-4: Build navigation component

**Phase:** Foundation & Design System
**Priority:** P0
**Dependencies:** Task 1-1, Task 1-2, Task 1-3
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want a sticky navigation bar at the top of the page so that I can jump to any section from anywhere while scrolling.

#### Acceptance Criteria

- **AC1: Nav sticks to top on scroll**
  - Given: The page is longer than the viewport
  - When: The user scrolls down
  - Then: The nav remains fixed at the top of the viewport at all times

- **AC2: Nav links scroll to correct sections**
  - Given: The nav is visible
  - When: The user clicks any nav link (About, Projects, Pipeline, Skills, Contact)
  - Then: The page smooth-scrolls to the corresponding section

- **AC3: Glassmorphism background effect**
  - Given: Content is scrolled behind the nav
  - When: The nav is inspected visually
  - Then: The nav has a semi-transparent dark background with a blur effect (`backdrop-filter: blur(10px)`) and a subtle bottom border

- **AC4: Nav structure and responsiveness**
  - [ ] Nav contains Brett's name on the left as a `<span>` or `<a href="#hero">` (not an `<img>`)
  - [ ] Nav contains anchor links on the right: About, Projects, Pipeline, Skills, Contact — each an `<a href="#[section-id]">`
  - [ ] Nav collapses link text gracefully on screens below `768px` (links may stack or hide — hamburger menu is NOT required for this phase)
  - [ ] `position: sticky; top: 0` applied
  - [ ] `z-index` high enough to render above all section content
  - [ ] Background: `rgba(18, 18, 18, 0.85)` with `backdrop-filter: blur(10px)`; fallback for no `backdrop-filter` support: `rgba(18, 18, 18, 0.95)` solid
  - [ ] Bottom border: `1px solid var(--color-border)`
  - [ ] `scroll-behavior: smooth` added to `html` in `base.css`

#### Technical Context

Files to create/edit:
- Create: `assets/css/nav.css`
- Edit: `index.html` — populate the `<nav>` shell with real HTML content

Nav HTML structure:
```html
<nav class="nav">
  <div class="container nav__inner">
    <a href="#hero" class="nav__logo">Brett Hardiman</a>
    <ul class="nav__links">
      <li><a href="#about">About</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#pipeline">Pipeline</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</nav>
```

CSS naming: kebab-case classes (`nav__inner`, `nav__logo`, `nav__links`).

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review
