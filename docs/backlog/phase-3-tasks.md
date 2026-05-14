# Phase 3: Projects Section

---

### Task 3-1: Build Projects section grid and structure

**Phase:** Projects Section
**Priority:** P0
**Dependencies:** Task 1-4
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to create the Projects section HTML structure and CSS grid layout so that project cards have a responsive, Spotify-style container to render inside.

#### Acceptance Criteria

- **AC1: Two-column grid on desktop, single column on mobile**
  - Given: The Projects section is viewed on a screen wider than `768px`
  - When: The grid renders
  - Then: Two project cards appear side by side in equal-width columns
  - Given: The Projects section is viewed on a screen `768px` or narrower
  - When: The grid renders
  - Then: Cards stack vertically in a single column

- **AC2: Section heading renders correctly**
  - Given: The Projects section is visible
  - When: The heading is inspected
  - Then: An `h2` with the text `What I've Built` is present and uses the `.section-heading` class

- **AC3: Structure requirements**
  - [ ] Section uses `<section id="projects">` with `.container` wrapper
  - [ ] CSS Grid used for card layout (not Flexbox)
  - [ ] Grid gap uses a spacing token: `var(--space-md)` or `var(--space-lg)`
  - [ ] `projects.css` file created; no project card styles yet (cards in Task 3-2)
  - [ ] No hardcoded color values or pixel values for colors

#### Technical Context

Files to create/edit:
- Create: `assets/css/projects.css`
- Edit: `index.html` — populate `<section id="projects">` structure

HTML structure:
```html
<section id="projects">
  <div class="container">
    <h2 class="section-heading">What I've Built</h2>
    <div class="projects__grid">
      <!-- Cards added in Task 3-2 -->
    </div>
  </div>
</section>
```

CSS Grid:
```css
.projects__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

@media (max-width: 768px) {
  .projects__grid {
    grid-template-columns: 1fr;
  }
}
```

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 3-2: Implement project cards with content and hover animations

**Phase:** Projects Section
**Priority:** P0
**Dependencies:** Task 3-1
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to see two Spotify-style project cards with descriptions, tags, and GitHub links so that I can quickly understand what Brett built and navigate to the code.

#### Acceptance Criteria

- **AC1: Card hover animation**
  - Given: A project card is rendered
  - When: The user hovers over the card
  - Then: The card background transitions from `var(--color-surface)` to `var(--color-surface-hover)`, lifts `4px` upward (`translateY(-4px)`), and an accent-colored left border appears — all within `300ms ease`

- **AC2: GitHub links open correctly**
  - Given: Either project card is rendered
  - When: The user clicks the GitHub button
  - Then: The link opens in a new tab with `target="_blank" rel="noopener noreferrer"`

- **AC3: Card 1 — Local RAG LLM App**
  - [ ] Title: `Local RAG LLM Application`
  - [ ] Description: `Built independently — a retrieval-augmented generation app running entirely on local hardware. Demonstrates applied understanding of LLM architecture, embedding pipelines, and context-window management without relying on cloud APIs.`
  - [ ] Tags: `Python`, `RAG`, `Local LLM`, `Vector DB`
  - [ ] GitHub link: `https://github.com/brett-hardiman/Local-LLM-App` — opens in new tab

- **AC4: Card 2 — Agentic AI Development Pipeline**
  - [ ] Title: `8-Agent AI Development Pipeline`
  - [ ] Description: `Designed and built a multi-agent Claude Code workflow that autonomously handles the full software development lifecycle — architecture, requirements, coding, code review, security review, CI/CD, and documentation. This portfolio site is its first production output.`
  - [ ] Tags: `Claude Code`, `Agent Teams`, `AI Orchestration`, `SDLC Automation`
  - [ ] GitHub link: `https://github.com/brett-hardiman/personal-portfolio` — opens in new tab

- **AC5: Visual requirements**
  - [ ] Card thumbnail area: CSS gradient block (no external image) with a relevant icon or letter mark — distinct color per card
  - [ ] Tags rendered as `<span class="tag">` elements — dark pill style with subtle border
  - [ ] Card background: `var(--color-surface)`
  - [ ] Card border-radius: `8px` or `12px`
  - [ ] Card padding: `var(--space-md)`
  - [ ] Left border on hover: `3px solid var(--color-accent)`
  - [ ] No raw color hex values in CSS

#### Technical Context

Files to edit:
- Edit: `assets/css/projects.css` — add card styles
- Edit: `index.html` — add both card HTML inside `.projects__grid`

Card HTML structure (repeat for each project):
```html
<article class="project-card">
  <div class="project-card__thumbnail project-card__thumbnail--[llm|pipeline]"></div>
  <div class="project-card__body">
    <h3 class="project-card__title">[Title]</h3>
    <p class="project-card__description">[Description]</p>
    <div class="project-card__tags">
      <span class="tag">Python</span>
      <!-- additional tags -->
    </div>
    <a href="[github-url]" target="_blank" rel="noopener noreferrer" class="btn btn--secondary project-card__link">View on GitHub</a>
  </div>
</article>
```

Thumbnail gradients (defined in `projects.css`):
- LLM card: `linear-gradient(135deg, #1a1a2e, #16213e)`
- Pipeline card: `linear-gradient(135deg, #0d2137, #1a3a2e)`

Tag styles (add to `base.css` as reusable utility):
```css
.tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: var(--color-surface-hover);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}
```

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review
