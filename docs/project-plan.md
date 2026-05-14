# Project Plan: Brett Hardiman — Personal Portfolio Site

**Owner:** Brett Hardiman  
**Target Roles:** AI Product Owner / AI Product Manager / AI Business Analyst  
**Deployment Target:** GitHub Pages (static hosting)  
**Tech Stack:** Vanilla HTML, CSS, JavaScript — no frameworks  
**Status:** Architecture Complete

---

## Project Overview

A single-page personal portfolio site that doubles as a live demonstration of an agentic AI development pipeline. The site itself is the proof-of-concept output of an 8-agent Claude Code workflow — making the meta-narrative (how the site was built) as compelling as the content it displays.

**Core narrative the site must communicate:**
Brett Hardiman entered consulting with no AI background and, through initiative and deliberate skill-building, became a hands-on contributor to AI/ML initiatives at a major federal contractor — leading three AI projects from concept to MVP, one of which was reported to a congressional committee. The portfolio is not just a resume. It is evidence of the exact capability it describes.

**GitHub:** https://github.com/brett-hardiman  
**LinkedIn:** https://www.linkedin.com/in/brett-hardiman-75682a205

---

## Design System

### Visual Identity: Spotify-Inspired Dark UI

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#121212` | Page background |
| `--color-surface` | `#181818` | Card backgrounds |
| `--color-surface-hover` | `#282828` | Card hover state |
| `--color-accent` | `#1DB954` | Primary accent (green) |
| `--color-accent-hover` | `#1ed760` | Accent hover |
| `--color-text-primary` | `#FFFFFF` | Headings, primary copy |
| `--color-text-secondary` | `#B3B3B3` | Body copy, labels |
| `--color-text-muted` | `#6a6a6a` | Timestamps, metadata |
| `--color-border` | `#282828` | Subtle borders |

**Typography:**
- Font family: `'Inter', system-ui, -apple-system, sans-serif` (Google Fonts — closest free substitute for Spotify's Circular)
- Heading weights: 700–900 (bold/black)
- Body weight: 400
- Letter spacing on headings: slightly tight (`-0.02em`)

**Motion:**
- Scroll-triggered fade-in + slide-up via Intersection Observer API
- Card hover: subtle lift (`transform: translateY(-4px)`) + surface color shift
- All transitions: `200–300ms ease`
- No motion if `prefers-reduced-motion` is set

**Layout:**
- Single-page, vertical scroll
- CSS Grid for card layouts
- Max content width: `1200px`, centered
- Mobile-first responsive breakpoints: `480px`, `768px`, `1024px`

---

## File Structure

```
index.html                  # Single HTML entry point
assets/
  css/
    variables.css           # All CSS custom properties (design tokens)
    base.css                # Reset, body, typography defaults
    nav.css                 # Navigation component
    hero.css                # Hero section
    about.css               # About section
    projects.css            # Projects card grid
    pipeline.css            # "How This Was Built" section
    skills.css              # Skills + certifications section
    contact.css             # Contact/footer section
    animations.css          # Intersection Observer animation classes
  js/
    animations.js           # Scroll-triggered animation logic
    pipeline-diagram.js     # Agent pipeline interactive diagram
docs/
  project-plan.md           # This file
  backlog/                  # Requirements Agent task files
  reviews/                  # Code Review findings
  security-reviews/         # Security Review findings
  task-log.md               # Project Manager state log
```

**Naming conventions (per CLAUDE.md):**
- CSS files and classes: `kebab-case`
- JS variables and functions: `camelCase`
- No absolute URLs anywhere — all paths relative

---

## Page Sections (Top to Bottom)

1. **Navigation** — Sticky top nav
2. **Hero** — Above the fold statement
3. **About** — Career arc narrative
4. **Projects** — Two project showcase cards
5. **How This Was Built** — Agent pipeline meta-section
6. **Skills** — Competencies + certifications
7. **Contact/Footer** — LinkedIn + GitHub links

---

## Phase 1: Foundation & Design System

**Objective:** Establish the HTML skeleton, CSS design token system, base styles, and navigation. All subsequent phases build on this foundation.

**What is being built:**
- `index.html` with all semantic section shells (`<nav>`, `<section id="hero">`, `<section id="about">`, etc.)
- `assets/css/variables.css` — all design tokens as CSS custom properties
- `assets/css/base.css` — CSS reset, `body` defaults, typography scale, global link styles
- `assets/css/nav.css` — sticky navigation bar component
- Navigation HTML: Brett's name/logo on the left, anchor links on the right (About, Projects, Pipeline, Skills, Contact)
- Google Fonts `<link>` for Inter in `<head>`

**Architecture decisions:**
- CSS custom properties (not Sass/LESS) — keeps the stack vanilla and eliminates build steps
- Google Fonts loaded via `<link rel="preconnect">` + `<link rel="stylesheet">` — no self-hosted fonts to simplify deployment
- Semantic HTML throughout (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) — baseline accessibility and SEO without extra work
- Nav uses `position: sticky; top: 0` with a slightly transparent background + `backdrop-filter: blur(10px)` for the Spotify glass effect

**Definition of done:**
- `index.html` renders in browser with all section shells visible
- Nav is sticky and all anchor links scroll to correct sections
- CSS custom properties are defined and applied to background + text colors
- No hardcoded color values outside `variables.css`
- No absolute URLs in any file
- Passes HTML validation (W3C)

---

## Phase 2: Hero + About Sections

**Objective:** Build the two narrative-heavy sections that establish Brett's identity and career story.

**Hero section — what is being built:**
- Full-viewport-height opening section
- Large bold headline: **"I build with AI. I ship with agents."** (or similar — copywriter tone, not resume tone)
- Subheadline: one sentence positioning statement (e.g., "AI Product Owner | From requirements to RAG pipelines — I bridge strategy and execution.")
- Two CTA buttons: LinkedIn (external link, `target="_blank" rel="noopener noreferrer"`) and GitHub (same)
- Subtle background texture or gradient — dark, Spotify-style
- Scroll indicator (animated chevron or dot)

**About section — what is being built:**
- Two-column layout on desktop (narrative left, visual element right), single column on mobile
- Narrative copy based on Brett's career arc:
  - Entered Booz Allen Hamilton with no AI background
  - Traditional requirements work → CSM, CSPO → enrolled in Booz Allen Data Science Tech Excellence Program
  - Pulled onto AI/ML ART, promoted from Senior Consultant to Associate
  - Led 3 AI initiatives from concept to MVP (one reported to a congressional committee)
  - Built a local RAG-powered LLM app independently
  - Moved to BIA Product Line, built AI agents for the team (standup, stakeholder summaries, requirements drafting)
  - Now building agentic AI development pipelines
- Visual element: timeline or stat callouts (e.g., "3 AI initiatives", "1 congressional report", "8 agents built") styled as Spotify-style stat cards

**Architecture decisions:**
- All external links use `target="_blank" rel="noopener noreferrer"` — security baseline, prevents tab-napping
- No hardcoded LinkedIn or GitHub URLs in CSS — URLs only in HTML `href` attributes
- CTA buttons are `<a>` tags styled as buttons, not `<button>` elements (they navigate, not submit)

**Definition of done:**
- Hero section renders above the fold on desktop and mobile
- Both CTA buttons link to correct external URLs
- About narrative reads as authored, not placeholder
- Stat callouts display correctly
- Section is responsive at all three breakpoints
- Passes HTML/CSS validation

---

## Phase 3: Projects Section

**Objective:** Showcase Brett's two key technical projects as Spotify-style cards.

**What is being built:**
- Section heading: "What I've Built"
- Two project cards in a CSS Grid layout (2-col desktop, 1-col mobile)
- Each card: project thumbnail area (colored/gradient block with icon), title, description, tags, and a GitHub link button

**Card 1: Local RAG-Powered LLM App**
- Title: "Local RAG LLM Application"
- Description: Built independently — a retrieval-augmented generation app running entirely on local hardware. Demonstrates applied understanding of LLM architecture, embedding pipelines, and context-window management without relying on cloud APIs.
- Tags: `Python` `RAG` `Local LLM` `Vector DB`
- Link: Brett's GitHub repo (relative to GitHub base — exact repo URL to be confirmed by Brett before deployment)

**Card 2: Agentic AI Development Pipeline**
- Title: "8-Agent AI Development Pipeline"
- Description: Designed and built a multi-agent Claude Code workflow that autonomously handles the full software development lifecycle — architecture, requirements decomposition, coding, code review, security review, CI/CD integration, and documentation. This portfolio site is its first production output.
- Tags: `Claude Code` `Agent Teams` `AI Orchestration` `SDLC Automation`
- Link: GitHub repo for this project

**Card hover behavior:**
- Background shifts from `--color-surface` to `--color-surface-hover`
- Card lifts `translateY(-4px)`
- Accent-colored border appears on left edge (Spotify-style active indicator)

**Architecture decisions:**
- Card thumbnails use CSS gradients (no external image dependencies for core layout)
- GitHub links: relative to `https://github.com/brett-hardiman/` — base URL is not hardcoded in CSS, only in HTML `href`
- Tags rendered as `<span>` elements with a CSS class, not hardcoded inline styles

**Definition of done:**
- Both cards render with correct content
- Hover animations work
- GitHub links open correct repos in new tab
- Grid collapses to single column on mobile
- No hardcoded color values outside `variables.css`

---

## Phase 4: "How This Was Built" Section

**Objective:** The meta-section that makes this portfolio unique — a visual explanation of the 8-agent pipeline that built the site.

**What is being built:**
- Section heading: "How This Site Was Built" (or "The Pipeline Behind This Page")
- Introductory paragraph: explains that this portfolio is the first output of an agentic AI development pipeline — every line of code was written by an AI Coding Agent, reviewed by an AI Code Review Agent, audited by an AI Security Review Agent, and committed by an AI CI/CD Agent. Brett's role was architect and product owner: defining the requirements, approving the backlog, and reviewing the output.
- **Agent pipeline diagram**: horizontal (desktop) / vertical (mobile) flow diagram showing all 8 agents in sequence:
  1. IT Solution Architect → `docs/project-plan.md`
  2. Project Manager → coordinates pipeline
  3. Requirements Agent → `docs/backlog/`
  4. Coding Agent → implementation
  5. Code Review Agent → `docs/reviews/`
  6. Security Review Agent → `docs/security-reviews/`
  7. CI/CD Integration Agent → git branching + PRs
  8. Project Summary Agent → `README.md`
- Each agent node: name, one-line role description, output artifact
- Connector arrows between nodes (CSS borders + pseudo-elements, no SVG dependency)
- "View the repo" button linking to GitHub

**Architecture decisions:**
- Diagram built entirely in HTML + CSS (no canvas, no SVG, no external diagram library) — keeps the stack vanilla and avoids external dependencies that could introduce hardcoded URLs
- `pipeline-diagram.js` handles only layout responsiveness (switching between horizontal/vertical) via a ResizeObserver — no diagram logic in JS
- The diagram is a `<figure>` with `<figcaption>` for accessibility

**Definition of done:**
- Pipeline diagram renders correctly on desktop (horizontal) and mobile (vertical)
- All 8 agents are labeled with correct names and output artifacts
- "View the repo" button links to correct GitHub repo
- Section reads as a coherent narrative, not a bullet list
- No absolute URLs in CSS

---

## Phase 5: Skills + Contact Sections

**Objective:** Surface Brett's competency areas and certifications, then close the page with simple, clean contact links.

**Skills section — what is being built:**
- Section heading: "What I Bring"
- Four competency categories, each as a labeled group of skill chips:
  - **Product & Strategy**: Product Ownership, Requirements Elicitation, Agile/SAFe, Stakeholder Management, User Story Writing, Backlog Grooming
  - **AI & Data**: Agentic AI Workflows, RAG Architecture, LLM Integration, Prompt Engineering, AI Initiative Leadership, Data Science Fundamentals
  - **Technical**: Python, Git, HTML/CSS/JS, Local LLM Deployment, Vector Databases, API Integration
  - **Certifications**: Certified Scrum Master (CSM), Certified Scrum Product Owner (CSPO), Booz Allen Data Science Tech Excellence Program
- Chips styled as Spotify-style pill tags (dark background, subtle border, accent color on certification chips)

**Contact/Footer section — what is being built:**
- Simple, clean closing section
- Heading: "Let's Connect"
- One-line: "Open to AI Product Owner, AI Product Manager, and AI Business Analyst roles."
- Two icon+text links: LinkedIn, GitHub
- Footer: copyright line with Brett's name and current year (year injected by JS — `new Date().getFullYear()`)

**Architecture decisions:**
- No contact form — eliminates any server-side processing requirement and keeps deployment purely static
- Copyright year is JS-injected so it never goes stale without code changes
- Certification chips use a distinct `--color-accent` border to visually differentiate them from skill chips

**Definition of done:**
- All four skill categories render with correct chips
- Certification chips visually distinct from skill chips
- LinkedIn and GitHub links correct and open in new tab
- Copyright year displays correctly
- Footer is responsive

---

## Phase 6: Animations, Accessibility & Polish

**Objective:** Add scroll-triggered animations, verify accessibility compliance, and complete responsive QA across all sections.

**What is being built:**
- `assets/css/animations.css` — defines `.fade-in-up` base state (opacity 0, translateY 20px) and `.is-visible` active state (opacity 1, translateY 0)
- `assets/js/animations.js` — Intersection Observer that adds `.is-visible` class when elements enter the viewport; targets all section headings, cards, stat callouts, pipeline nodes, and skill chips
- `prefers-reduced-motion` media query in `animations.css` — skips all transforms/transitions when user has motion sensitivity enabled
- Full keyboard navigation audit — all interactive elements reachable and operable via Tab/Enter/Space
- ARIA labels on icon-only elements, `aria-label` on external link buttons
- `lang="en"` on `<html>`, proper heading hierarchy (`h1` → `h2` → `h3`)
- Focus ring styles that match the design (accent-color outline, not default browser ring)
- Final responsive QA at 375px, 768px, 1024px, 1440px

**Architecture decisions:**
- Intersection Observer threshold: `0.15` — elements animate in when 15% visible, not on first pixel (avoids janky immediate triggers)
- Observer `rootMargin`: `0px 0px -50px 0px` — elements slightly below viewport before triggering (Spotify-style "content loading in" feel)
- One observer instance observes all animated elements — no per-element observer instantiation

**Risks:**
- `backdrop-filter` (nav blur) not supported in older Firefox — fallback: solid `rgba(18,18,18,0.95)` background. Document as known limitation.

**Definition of done:**
- All sections animate in on scroll
- No motion when `prefers-reduced-motion: reduce` is set
- All interactive elements keyboard-accessible
- No ARIA violations (verified via browser accessibility tree)
- Site renders correctly at all four breakpoints
- HTML validates at W3C
- CSS validates at W3C

---

## Phase 7: GitHub Pages Deployment

**Objective:** Verify the site is deployment-ready, passes security review, and deploys correctly to GitHub Pages.

**What is being built:**
- Final security audit: grep all files for hardcoded `localhost`, `127.0.0.1`, absolute `http://` or `https://` URLs in CSS/JS (HTML `href` attributes are acceptable)
- Verify all asset paths are relative (e.g., `assets/css/variables.css`, not `/assets/css/variables.css`) — GitHub Pages can serve from a subdirectory
- `index.html` at repo root (GitHub Pages default)
- Confirm `<meta charset="UTF-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1.0">` present
- `<meta name="description">` tag with portfolio summary (SEO)
- Open Graph tags (`og:title`, `og:description`, `og:url`) for LinkedIn share preview — since Brett will link this from his LinkedIn profile, the share card must look correct
- `.gitignore` already present from starter-kit
- Deployment instructions documented in `README.md`

**Architecture decisions:**
- No `jekyll` config needed — GitHub Pages serves static files directly when no `_config.yml` is present and `index.html` is at root
- All CSS loaded via `<link>` in `<head>` (no `@import` chains that slow first paint)
- JS files loaded at bottom of `<body>` with `defer` attribute

**Risks:**
- If the repo is nested under a GitHub Pages project URL (e.g., `brett-hardiman.github.io/portfolio/` vs. `brett-hardiman.github.io/`), relative paths must account for the base path. Mitigation: use root-relative paths (`./assets/`) and test against the actual deployed URL before marking complete.

**Definition of done:**
- Security review passes: no hardcoded localhost, IPs, or absolute URLs in CSS/JS
- Site loads correctly at GitHub Pages URL
- Open Graph tags render correctly when URL is pasted into LinkedIn
- All links work on the deployed site (not just local)
- `README.md` documents deployment steps

---

## Non-Functional Requirements

| Requirement | Approach |
|---|---|
| **Performance** | No external JS libraries, no web fonts blocking render (preconnect hint), CSS loaded in `<head>`, JS deferred |
| **Security** | No hardcoded URLs in CSS/JS, no API keys, no localStorage of sensitive data, all external links use `rel="noopener noreferrer"` |
| **Accessibility** | Semantic HTML, ARIA labels, keyboard navigation, `prefers-reduced-motion` support, color contrast ≥ 4.5:1 for all text |
| **Observability** | No server-side logging (static site); browser console must be error-free on load |
| **Error handling** | Graceful degradation — site must be fully readable with JS disabled; animations and diagram interactivity are the only JS-dependent features |
| **Mobile** | Mobile-first CSS, tested at 375px minimum width |

---

## Phase Summary

| Phase | Name | Key Output |
|---|---|---|
| 1 | Foundation & Design System | `index.html` skeleton, CSS variables, nav |
| 2 | Hero + About Sections | Above-fold content, career narrative |
| 3 | Projects Section | Two project cards with GitHub links |
| 4 | "How This Was Built" Section | Agent pipeline diagram + meta-narrative |
| 5 | Skills + Contact Sections | Competency chips, certs, footer links |
| 6 | Animations, Accessibility & Polish | Scroll animations, a11y audit, responsive QA |
| 7 | GitHub Pages Deployment | Security audit, OG tags, live deployment |

**Total phases: 7**

---

## Known Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| `backdrop-filter` unsupported in older browsers | Low | CSS fallback: solid semi-transparent background |
| GitHub Pages base path breaks relative asset links | Medium | Use `./` prefix on all paths; test on deployed URL |
| Local LLM GitHub repo URL not yet confirmed | Low | Card links to profile root until confirmed; update before deploy |
| Open Graph preview on LinkedIn requires `https://` URL | Low | GitHub Pages provides HTTPS by default |
