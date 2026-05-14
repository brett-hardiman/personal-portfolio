# Phase 4: "How This Was Built" Section

---

### Task 4-1: Build pipeline section structure and narrative

**Phase:** "How This Was Built" Section
**Priority:** P0
**Dependencies:** Task 1-4
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to read a clear narrative explanation of the agentic pipeline that built this site so that I understand Brett's role as architect and product owner — and why this portfolio is itself the proof of his AI skills.

#### Acceptance Criteria

- **AC1: Section renders with correct heading and narrative**
  - Given: The pipeline section is visible
  - When: The content is read
  - Then: An `h2` heading reads `How This Site Was Built` and the introductory paragraph explains that every line of code was written, reviewed, and committed by AI agents — with Brett as architect and product owner

- **AC2: "View the repo" button links correctly**
  - Given: The pipeline section is rendered
  - When: The user clicks "View the Repo"
  - Then: `https://github.com/brett-hardiman/personal-portfolio` opens in a new tab with `target="_blank" rel="noopener noreferrer"`

- **AC3: Section structure requirements**
  - [ ] `<section id="pipeline">` with `.container` wrapper
  - [ ] `h2` with class `.section-heading` and text `How This Site Was Built`
  - [ ] Introductory paragraph: `This portfolio was built by an 8-agent Claude Code pipeline. Every line of code was written by an AI Coding Agent, reviewed by an AI Code Review Agent, audited by an AI Security Review Agent, and committed by an AI CI/CD Agent. Brett's role: Architect and Product Owner — defining requirements, approving the backlog, and reviewing the output.`
  - [ ] `<figure>` element wrapping the diagram (Task 4-2 populates this)
  - [ ] `<figcaption>` with text: `The 8-agent pipeline — each agent feeds the next automatically`
  - [ ] "View the Repo" button below the figure using `.btn.btn--primary`
  - [ ] `pipeline.css` file created
  - [ ] No hardcoded color values

#### Technical Context

Files to create/edit:
- Create: `assets/css/pipeline.css`
- Edit: `index.html` — populate `<section id="pipeline">` with real content

HTML structure:
```html
<section id="pipeline">
  <div class="container">
    <h2 class="section-heading">How This Site Was Built</h2>
    <p class="pipeline__intro">
      This portfolio was built by an 8-agent Claude Code pipeline. Every line of code was written by an AI Coding Agent, reviewed by an AI Code Review Agent, audited by an AI Security Review Agent, and committed by an AI CI/CD Agent. Brett's role: Architect and Product Owner — defining requirements, approving the backlog, and reviewing the output.
    </p>
    <figure class="pipeline__diagram" aria-label="8-agent AI development pipeline diagram">
      <!-- Diagram nodes added in Task 4-2 -->
    </figure>
    <figcaption class="pipeline__caption">The 8-agent pipeline — each agent feeds the next automatically</figcaption>
    <div class="pipeline__cta">
      <a href="https://github.com/brett-hardiman/personal-portfolio" target="_blank" rel="noopener noreferrer" class="btn btn--primary">View the Repo</a>
    </div>
  </div>
</section>
```

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 4-2: Build agent pipeline diagram (HTML/CSS)

**Phase:** "How This Was Built" Section
**Priority:** P0
**Dependencies:** Task 4-1
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to see a visual diagram of all 8 agents in the pipeline so that I can understand the full automated workflow at a glance — including each agent's role and output artifact.

#### Acceptance Criteria

- **AC1: All 8 agents displayed with correct labels**
  - Given: The pipeline diagram is rendered
  - When: The diagram nodes are counted and read
  - Then: Exactly 8 agent nodes appear in order, each with its name, one-line role, and output artifact as defined in Technical Context

- **AC2: Horizontal layout on desktop, vertical on mobile**
  - Given: The diagram is viewed on a screen wider than `768px`
  - When: The layout renders
  - Then: Agent nodes flow left-to-right in a single horizontal row with connector arrows between them
  - Given: The diagram is viewed on `768px` or narrower
  - When: The layout renders
  - Then: Agent nodes stack top-to-bottom with downward connector arrows between them (handled by `pipeline-diagram.js` in Task 4-3)

- **AC3: Diagram built in pure HTML/CSS**
  - [ ] No SVG, no `<canvas>`, no external diagram libraries
  - [ ] Connector arrows between nodes use CSS `::after` pseudo-elements or border tricks — not images
  - [ ] Each node is a `<div class="pipeline-node">` containing: agent name (`<strong>`), role description (`<span class="pipeline-node__role">`), and output artifact (`<span class="pipeline-node__output">`)
  - [ ] Node background: `var(--color-surface)`; border: `1px solid var(--color-border)`; border-radius: `8px`
  - [ ] Active/accent node style: first node (`it-solution-architect`) has `border-color: var(--color-accent)` to indicate pipeline start
  - [ ] No hardcoded colors

- **AC4: Accessible**
  - [ ] `<figure>` has `aria-label="8-agent AI development pipeline diagram"`
  - [ ] Connector arrows have `aria-hidden="true"`

#### Technical Context

Files to edit:
- Edit: `index.html` — populate `<figure class="pipeline__diagram">` with node HTML
- Edit: `assets/css/pipeline.css` — add node and connector styles

The 8 agents in order:

| # | Agent Name | Role | Output Artifact |
|---|---|---|---|
| 1 | IT Solution Architect | Discovery & architecture planning | `docs/project-plan.md` |
| 2 | Project Manager | Coordinates all agents | `docs/task-log.md` |
| 3 | Requirements Agent | Backlog decomposition | `docs/backlog/` |
| 4 | Coding Agent | Implementation | Source files |
| 5 | Code Review Agent | AC verification & standards | `docs/reviews/` |
| 6 | Security Review Agent | Security audit | `docs/security-reviews/` |
| 7 | CI/CD Integration Agent | Git branching & PRs | Pull requests |
| 8 | Project Summary Agent | Non-technical README | `README.md` |

Node HTML structure (repeat for each agent):
```html
<div class="pipeline-node" data-agent="it-solution-architect">
  <strong class="pipeline-node__name">IT Solution Architect</strong>
  <span class="pipeline-node__role">Discovery & architecture planning</span>
  <span class="pipeline-node__output">→ docs/project-plan.md</span>
</div>
<div class="pipeline-connector" aria-hidden="true"></div>
```

Connector CSS (horizontal):
```css
.pipeline-connector {
  width: 32px;
  height: 2px;
  background-color: var(--color-accent);
  position: relative;
  align-self: center;
  flex-shrink: 0;
}
.pipeline-connector::after {
  content: '';
  position: absolute;
  right: -6px;
  top: -4px;
  border-left: 8px solid var(--color-accent);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
```

Diagram layout (horizontal):
```css
.pipeline__diagram {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow-x: auto;
  gap: 0;
  padding: var(--space-md) 0;
}
```

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 4-3: Add pipeline-diagram.js for responsive layout

**Phase:** "How This Was Built" Section
**Priority:** P1
**Dependencies:** Task 4-2
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to implement `pipeline-diagram.js` using a ResizeObserver so that the pipeline diagram switches between horizontal and vertical layouts at the `768px` breakpoint without requiring a page reload.

#### Acceptance Criteria

- **AC1: Layout switches on resize**
  - Given: The browser window is wider than `768px`
  - When: The user resizes the window below `768px`
  - Then: The `.pipeline__diagram` element gains the class `pipeline__diagram--vertical` and the connectors rotate to point downward

- **AC2: Layout correct on initial load**
  - Given: The page loads on a `480px` wide mobile screen
  - When: `pipeline-diagram.js` runs
  - Then: The diagram immediately renders in vertical layout without a flash of horizontal layout

- **AC3: JS requirements**
  - [ ] Uses `ResizeObserver` (not `window.addEventListener('resize', ...)`)
  - [ ] Observes `.pipeline__diagram` element
  - [ ] Adds class `pipeline__diagram--vertical` when diagram width ≤ `768px`, removes it when wider
  - [ ] Vertical layout CSS defined in `pipeline.css` under `.pipeline__diagram--vertical` modifier class
  - [ ] Script is `defer`'d in `index.html` — already handled by Task 1-1
  - [ ] File has no `console.log` statements

#### Technical Context

File to create: `assets/js/pipeline-diagram.js`

```javascript
const diagram = document.querySelector('.pipeline__diagram');

if (diagram) {
  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      diagram.classList.toggle('pipeline__diagram--vertical', width <= 768);
    }
  });
  observer.observe(diagram);
}
```

Vertical layout CSS to add to `pipeline.css`:
```css
.pipeline__diagram--vertical {
  flex-direction: column;
  align-items: center;
  overflow-x: visible;
}

.pipeline__diagram--vertical .pipeline-connector {
  width: 2px;
  height: 24px;
  margin: 0;
}

.pipeline__diagram--vertical .pipeline-connector::after {
  right: -4px;
  top: auto;
  bottom: -6px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid var(--color-accent);
  border-bottom: none;
}
```

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review
