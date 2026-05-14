# Phase 2: Hero + About Sections

---

### Task 2-1: Build Hero section

**Phase:** Hero + About Sections
**Priority:** P0
**Dependencies:** Task 1-4
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want a full-viewport hero section with a bold headline, positioning statement, and CTA buttons so that I immediately understand who Brett is and can navigate to his LinkedIn or GitHub with one click.

#### Acceptance Criteria

- **AC1: Hero fills the viewport**
  - Given: The page is loaded on any screen size
  - When: The hero section is viewed
  - Then: The section height is at least `100vh` and the content is vertically centered

- **AC2: CTA buttons open correct external links**
  - Given: The hero section is rendered
  - When: The user clicks the LinkedIn button
  - Then: `https://www.linkedin.com/in/brett-hardiman-75682a205` opens in a new tab
  - When: The user clicks the GitHub button
  - Then: `https://github.com/brett-hardiman` opens in a new tab

- **AC3: Scroll indicator visible**
  - Given: The hero is rendered
  - When: The user has not yet scrolled
  - Then: A downward-pointing animated chevron or arrow is visible at the bottom of the hero section

- **AC4: Hero content requirements**
  - [ ] Headline: `I build with AI. I ship with agents.` (exact text, styled as `h1`)
  - [ ] Subheadline: `AI Product Owner · Bridging strategy and execution from requirements to RAG pipelines.` styled as a paragraph below the `h1`
  - [ ] LinkedIn button: `<a>` tag with `target="_blank" rel="noopener noreferrer"`, text "LinkedIn", accent-colored or outlined style
  - [ ] GitHub button: `<a>` tag with `target="_blank" rel="noopener noreferrer"`, text "GitHub", secondary style
  - [ ] Both buttons are `<a>` elements, not `<button>` elements
  - [ ] Background: subtle radial gradient from `#1a1a2e` or `#1a1a1a` toward `#121212` — dark, not flat black
  - [ ] No hardcoded color values in `hero.css` — all colors from `var(--color-*)` tokens

#### Technical Context

Files to create/edit:
- Create: `assets/css/hero.css`
- Edit: `index.html` — populate `<section id="hero">` with real content

Hero HTML structure:
```html
<section id="hero">
  <div class="container hero__content">
    <h1 class="hero__headline">I build with AI.<br>I ship with agents.</h1>
    <p class="hero__subhead">AI Product Owner · Bridging strategy and execution from requirements to RAG pipelines.</p>
    <div class="hero__ctas">
      <a href="https://www.linkedin.com/in/brett-hardiman-75682a205" target="_blank" rel="noopener noreferrer" class="btn btn--primary">LinkedIn</a>
      <a href="https://github.com/brett-hardiman" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">GitHub</a>
    </div>
    <div class="hero__scroll-indicator" aria-hidden="true">&#8595;</div>
  </div>
</section>
```

Button styles (add to `base.css` as reusable utility classes):
- `.btn`: `display: inline-block; padding: 12px 28px; border-radius: 24px; font-weight: 700; text-decoration: none; transition: var(--transition-fast)`
- `.btn--primary`: `background-color: var(--color-accent); color: #000`; hover: `background-color: var(--color-accent-hover)`
- `.btn--secondary`: `border: 2px solid var(--color-text-secondary); color: var(--color-text-primary)`; hover: `border-color: var(--color-text-primary)`

Scroll indicator: positioned `absolute; bottom: 32px; left: 50%` within the hero, animated with a CSS `@keyframes` bounce.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 2-2: Build About section

**Phase:** Hero + About Sections
**Priority:** P0
**Dependencies:** Task 1-4
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to read Brett's career arc narrative and see his key stats so that I understand the journey from non-technical consultant to hands-on AI practitioner — and remember it.

#### Acceptance Criteria

- **AC1: Two-column layout on desktop, single column on mobile**
  - Given: The About section is viewed on a screen wider than `768px`
  - When: The layout renders
  - Then: The narrative text occupies the left column and the stat callouts occupy the right column
  - Given: The About section is viewed on a screen `768px` or narrower
  - When: The layout renders
  - Then: The narrative text stacks above the stat callouts in a single column

- **AC2: Stat callouts display correctly**
  - Given: The About section is rendered
  - When: The stat cards are inspected
  - Then: Three stat callouts are visible with the values: `3 AI Initiatives`, `1 Congressional Report`, `8 Agents Built`

- **AC3: Narrative content requirements**
  - [ ] Section heading: `About` or `My Story` as an `h2`
  - [ ] Narrative paragraph 1: Covers entering Booz Allen with no AI background, traditional requirements work, earning CSM + CSPO, enrolling in Booz Allen Data Science Tech Excellence Program
  - [ ] Narrative paragraph 2: Covers being pulled onto the AI/ML ART, promotion from Senior Consultant to Associate, leading 3 AI initiatives (one reported to a congressional committee), contributing to architecture discussions
  - [ ] Narrative paragraph 3: Covers moving to BIA Product Line, building local RAG LLM app independently, building AI agents for the team (daily standup, stakeholder summaries, requirements drafting), now building agentic AI pipelines
  - [ ] Closing line: `None of that was the plan when I walked in the door. It happened because I bet on myself.`
  - [ ] Stat cards styled as Spotify-style dark surface cards (`var(--color-surface)` background, `var(--color-accent)` accent on the number)
  - [ ] No hardcoded color values — all from `var(--color-*)` tokens

#### Technical Context

Files to create/edit:
- Create: `assets/css/about.css`
- Edit: `index.html` — populate `<section id="about">` with real content

About HTML structure:
```html
<section id="about">
  <div class="container">
    <h2 class="section-heading">My Story</h2>
    <div class="about__grid">
      <div class="about__narrative">
        <p>[paragraph 1]</p>
        <p>[paragraph 2]</p>
        <p>[paragraph 3]</p>
        <p class="about__closing"><em>None of that was the plan when I walked in the door. It happened because I bet on myself.</em></p>
      </div>
      <div class="about__stats">
        <div class="stat-card">
          <span class="stat-card__number">3</span>
          <span class="stat-card__label">AI Initiatives Led</span>
        </div>
        <div class="stat-card">
          <span class="stat-card__number">1</span>
          <span class="stat-card__label">Congressional Report</span>
        </div>
        <div class="stat-card">
          <span class="stat-card__number">8</span>
          <span class="stat-card__label">AI Agents Built</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

Add `.section-heading` as a reusable utility in `base.css`: `font-size: var(--h2-size); margin-bottom: var(--space-lg); color: var(--color-text-primary)`.

Stat card number: `font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 900; color: var(--color-accent)`.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review
