# Brett Hardiman — Personal Portfolio

![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-222222?logo=github)
![Built With](https://img.shields.io/badge/Built%20With-8%20AI%20Agents-1DB954)
![No Frameworks](https://img.shields.io/badge/Framework-None%20(Vanilla)-191414?logo=html5)

**Live site:** [bretthardiman.com](https://bretthardiman.com)

---

## This is 2 Projects in 1

Most portfolios are interesting because of the person they showcase. This one is interesting for two reasons.

**Project 1:** A polished, production-quality personal portfolio website for Brett Hardiman — an AI/ML Product Owner and AI Engineer based in South Carolina. Styled after Spotify's dark design language. Fully accessible, responsive from 320px to 1440px, and SEO-optimized.

**Project 2:** A live demonstration of an 8-agent AI development pipeline built with Claude Code. Every line of code on this site — every HTML element, CSS variable, and JavaScript module — was planned, implemented, reviewed, and deployed by a coordinated team of AI agents. The agents handed work to each other, ran tasks in parallel when possible, and enforced code review gates before anything was merged.

This README was written by one of those agents. The meta is intentional.

---

## The Portfolio Website

Brett Hardiman is an AI/ML Product Owner and AI Engineer who spent 2.5 years at Booz Allen Hamilton, progressing from requirements engineering into leading 4 AI product initiatives from concept through MVP. He previously worked as a Business Analyst at Johnson & Johnson Insurance, holds a B.S. in Computer Information Systems from the College of Charleston, and carries CSPO (Certified Scrum Product Owner) and CSM (Certified Scrum Master) certifications.

### What You See When You Visit

When you land on [bretthardiman.com](https://bretthardiman.com), here is what happens:

- A full-screen **Hero section** greets you. Move your mouse around — the background text responds to your cursor with a subtle parallax (3D depth) effect.
- A thin **green progress bar** runs across the very top of the page and fills as you scroll, so you always know how far through the page you are.
- Each section **fades and slides in** as you scroll down to it, using smooth entrance animations.
- The **navigation bar** stays pinned to the top and highlights whichever section is currently in view.
- **Project cards** respond to your mouse with a 3D tilt effect when you hover.
- On mobile, the navigation collapses into a **hamburger menu**.

The full content of the site:

| Section | What It Contains |
|---------|-----------------|
| Hero | Name, title, tagline, call-to-action button |
| About Me | Professional story with headshot |
| Skills | 4 categories of technologies and tools |
| Work Experience | Career timeline with 2 roles |
| Projects | Showcase cards with mockup screenshots |
| Testimonials | 6 real colleague quotes from Booz Allen Hamilton |
| Education & Certifications | Degree, CSPO, CSM with custom Scrum Alliance badge graphics |
| Contact | LinkedIn call-to-action and social links |
| Footer | Copyright, social icons |

### Design

The visual design follows Spotify's dark aesthetic. Everything is built from a design token system (CSS custom properties), so colors, spacing, and typography are defined once and used everywhere.

- Background: `#191414` (Spotify's signature dark brown-black)
- Accent: `#1DB954` (Spotify green)
- Text: white on dark backgrounds
- Fonts: Montserrat (headings), Inter (body), JetBrains Mono (technical labels)

---

## The 8-Agent AI Pipeline

This project was built by a team of 8 specialized AI agents, each with a defined role, operating through Claude Code. The agents did not simply generate code in one shot — they ran a structured software development lifecycle with planning, implementation, parallel execution, review gates, and deployment.

Here is each agent and what it did.

### Agent 1 — IT Solution Architect

**Role:** Designed the entire system before a single line of code was written.

The Architect interviewed Brett about his goals, challenged weak ideas (like using a heavy JavaScript framework for a simple static site), and produced a comprehensive technical blueprint. That blueprint — `docs/project-plan.md` — defines the CSS architecture, JavaScript module structure, design token system, responsive breakpoints, file naming conventions, and every phase of work. Every other agent on the team used this document as the source of truth.

### Agent 2 — Requirements Agent

**Role:** Translated the architecture plan into 26 structured work items.

The Requirements Agent read the project plan and decomposed it into individual tasks, each with explicit acceptance criteria written in Given/When/Then format (a technique borrowed from software testing). This meant every Coding Agent received a precise, testable definition of "done" — not just a vague description of what to build.

The 26 tasks are organized into 4 phases in `docs/backlog/`.

### Agent 3 — Project Manager

**Role:** Orchestrated the entire build from start to finish.

The Project Manager read the task backlog, understood the dependency graph (which tasks had to happen before other tasks could start), and coordinated the team. It spawned Coding Agents for individual tasks, tracked task status, routed completed work through review gates, and maximized parallelism — for example, in Phase 2, six content sections were built simultaneously by separate agents because none of them depended on each other.

### Agent 4 — Coding Agent(s)

**Role:** Implemented all 26 tasks to specification.

Coding Agents were spawned by the Project Manager for individual work items. Each agent read the acceptance criteria for its task, built exactly what was specified, and handed the result off for review. Because the acceptance criteria were precise, the Coding Agent did not need to make design decisions — it executed the blueprint.

### Agent 5 — Code Review Agent

**Role:** Verified every task before it could be marked complete.

After each task was implemented, the Code Review Agent checked the work against the acceptance criteria and the project conventions (naming patterns, file structure, graceful degradation requirements, and so on). If something did not pass, the finding was documented in `docs/reviews/` and the work was sent back. Nothing was marked DONE without passing code review.

### Agent 6 — Security Review Agent

**Role:** Audited every task for security and deployment readiness.

The Security Review Agent specifically looked for hardcoded secrets, environment-specific values, cross-site scripting vulnerabilities, and anything that would prevent safe deployment to a public GitHub Pages site. Findings were documented in `docs/security-reviews/`. This gate ran in parallel with code review.

### Agent 7 — CI/CD Integration Agent

**Role:** Handled all git operations.

CI/CD (Continuous Integration / Continuous Deployment) is the practice of automatically testing and deploying code changes. The CI/CD Integration Agent created feature branches with the correct naming convention (`feature/[TASK-ID]-[short-description]`), wrote commits in the standard format, and opened pull requests. No code was pushed directly to the main branch.

### Agent 8 — Project Summary Agent

**Role:** Wrote this README.

The Project Summary Agent reads the project plan and all other documentation, then produces a plain-language explanation of the project for non-technical audiences. That is this document.

---

## Project Phases

### Phase 1: Foundation and Layout
**What this does:** Builds the structural skeleton of the site before any real content is added.

**What was built:** The HTML document shell with all section placeholders, a complete CSS design system defining every color, font, and spacing value used across the whole site, a responsive layout grid, and the fixed navigation bar.

**Why it matters:** Every subsequent phase builds on this foundation. Getting the design tokens right here means every future component automatically inherits the correct Spotify aesthetic without each developer re-inventing colors and spacing. 5 tasks.

---

### Phase 2: Content Sections
**What this does:** Fills in all the real content — Brett's actual professional history, skills, projects, and contact information.

**What was built:** The Hero section with tagline and call-to-action, the About section with headshot, the Skills grid across 4 categories, the Work Experience timeline with 2 roles, the Projects showcase, the Contact section, the Footer with SVG social icons, and all the resume-accurate data behind each of them.

**Why it matters:** This is what visitors actually read. The content sections are where Brett makes his case to recruiters and technical peers. 7 tasks.

---

### Phase 3: Animations and Interactivity
**What this does:** Adds every interactive and animated element to the site.

**What was built:** The scroll progress bar at the top of the viewport, scroll-triggered reveal animations that fade sections in as the user scrolls, the hero parallax mouse-tracking effect, active navigation link highlighting with click-lock behavior, and the 3D tilt effect on project cards. The final task wired all modules together and verified the complete integrated experience.

**Why it matters:** This is the difference between a static page and a site that feels premium. These effects are what make someone say "this is polished." All animations respect the operating system's reduced-motion preference for users who find motion uncomfortable. 6 tasks.

---

### Phase 4: Polish, SEO, and Nice-to-Haves
**What this does:** Brings the site to production quality and makes it discoverable.

**What was built:** The Testimonials section with 6 real colleague quotes, the Education and Certifications section with custom Scrum Alliance badge SVGs, SEO meta tags and Open Graph data (the information that controls how the site appears when shared on LinkedIn or in a Google search result), a favicon, a full WCAG AA accessibility audit and remediation pass, responsive quality-assurance testing across all breakpoints from 320px to 1440px wide, a performance optimization pass, and a custom 404 error page.

**Why it matters:** A site that cannot be found on Google or shared on LinkedIn is a site that does not get seen. Accessibility ensures the site works for everyone, including users who rely on screen readers. 8 tasks.

---

## Numbers

| Metric | Value |
|--------|-------|
| AI agents on the team | 8 |
| Total tasks completed | 26 |
| Phases | 4 |
| Lines of CSS | ~15 modular files, zero repetition |
| JavaScript libraries used | 0 |
| npm packages | 0 |
| Build tools | 0 |
| Frameworks | 0 |
| Viewport widths supported | 320px – 1440px |
| WCAG accessibility level | AA |
| Site works without JavaScript | Yes |

---

## Tech Stack

| Technology | What It Is | Why We Used It |
|------------|------------|----------------|
| HTML5 | The markup language that defines the structure of web pages | The foundation of every website; semantic HTML5 elements improve accessibility and SEO |
| CSS3 with Custom Properties | The styling language for web pages; custom properties are reusable variables | Allows a full design token system (colors, spacing, fonts defined once, used everywhere) without any build tools |
| Vanilla JavaScript (ES6+) | JavaScript written without any frameworks or libraries | Keeps the site dependency-free and fast; modern browser APIs cover every feature we needed |
| ES Modules | A native JavaScript feature that lets code be split into separate files | Clean code organization without a bundler; browsers load them natively |
| IntersectionObserver API | A browser API that detects when elements enter the visible area of the screen | Drives the scroll-reveal animations efficiently, without listening to every scroll event |
| GitHub Pages | A free static site hosting service provided by GitHub | Zero infrastructure cost, automatic deployment from a git push, supports custom domains |
| Google Fonts | A free library of web fonts hosted by Google | Provides Montserrat, Inter, and JetBrains Mono without self-hosting font files |
| Claude Code | Anthropic's AI coding tool | The platform the 8-agent development pipeline was built on |

---

## Architecture Overview

The site is a single HTML file (`index.html`) with a series of clearly defined sections. The user never navigates to a new page — scrolling and anchor links move between sections within the same document.

**CSS** is organized into 15 modular files, each responsible for one section or concern (variables, reset, typography, layout, nav, hero, about, skills, experience, projects, testimonials, education, contact, footer, animations, responsive). A single entry-point file imports all of them. This means a developer editing the navigation styles only touches `nav.css` — no searching through a single massive stylesheet.

**JavaScript** is split into 6 focused modules: a main entry point that initializes everything, and five specialized modules (nav behavior, scroll progress bar, scroll-reveal animations, parallax effect, project card interactions). Each module exports a single `init()` function. No module knows about any other module — only `main.js` does.

**Content** flows in a single scrolling column: fixed nav at the top, then Hero, About, Skills, Experience, Projects, Testimonials, Education, Contact, Footer. Each section except the Hero is prefixed with a numbered label (01, 02, 03...) that provides visual rhythm and orientation.

**Deployment** is a direct push to GitHub Pages. No build step, no compilation, no pipeline. The files you see in this repository are the exact files the browser receives.

```
GitHub repository
       |
       | git push
       v
  GitHub Pages  ──────────────────────────────────────────────────────>  Browser
  (serves files                                                           index.html
   as-is)                                                                 styles.css
                                                                          js/main.js
                                                                          + 5 modules
```

---

## Running Locally

No installation required. There are no dependencies, no `npm install`, no build step.

**Option 1 — Open directly in your browser (simplest):**

```bash
git clone https://github.com/brett-hardiman/personal-portfolio.git
cd personal-portfolio
open index.html   # macOS
# or double-click index.html in your file explorer on Windows/Linux
```

**Option 2 — Serve with a local web server (recommended for ES modules):**

ES modules (JavaScript `import` statements) require a web server due to browser security rules. If you open the file directly and JavaScript features do not work, use a local server:

```bash
# If you have Python installed:
python3 -m http.server 8080
# Then visit: http://localhost:8080

# If you have Node.js installed:
npx serve .
# Then visit the URL it prints
```

No environment variables are required. The `.env.example` file in the repository documents placeholders for any future configuration.

---

## Repository Structure

```
personal-portfolio/
├── index.html              — The entire site (single-page)
├── styles.css              — CSS entry point (imports all modules)
├── css/                    — 15 modular CSS files
├── js/                     — 6 JavaScript modules
│   ├── main.js             — Entry point
│   ├── nav.js              — Navigation behavior
│   ├── scroll-progress.js  — Top-of-page progress bar
│   ├── scroll-reveal.js    — Scroll-triggered fade-in animations
│   ├── parallax.js         — Hero mouse-tracking effect
│   └── projects.js         — Project card 3D tilt
├── assets/
│   ├── images/             — Headshot, project screenshots
│   └── icons/              — SVG icons
├── docs/
│   ├── project-plan.md     — Full architecture blueprint (IT Solution Architect)
│   ├── backlog/            — 26 structured work items (Requirements Agent)
│   ├── reviews/            — Code review findings (Code Review Agent)
│   ├── security-reviews/   — Security audit findings (Security Review Agent)
│   └── task-log.md         — Task state history (Project Manager)
├── CLAUDE.md               — Agent team conventions and rules
└── README.md               — This file (Project Summary Agent)
```

---

## About the Agent Team Convention

Every agent on this project followed a shared set of conventions defined in `CLAUDE.md`:

- **Branch naming:** `feature/[TASK-ID]-[short-description]`
- **Commit format:** `feat([scope]): [description] — [TASK-ID]`
- **No direct pushes to main** — all changes go through pull requests
- **Two review gates** for every task — Code Review and Security Review — before anything is marked done
- **Graceful degradation** — the site must be fully readable even if JavaScript fails to load
- **No hardcoded values** — all environment-specific configuration lives in `.env.example`

This structure is what made it possible for 8 agents to work on the same codebase without conflicts or inconsistency.

---

*Built by an 8-agent AI pipeline using Claude Code. Showcasing Brett Hardiman.*
