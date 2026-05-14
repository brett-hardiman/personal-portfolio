# Phase 5: Skills + Contact Sections

---

### Task 5-1: Build Skills section with competency chips and certifications

**Phase:** Skills + Contact Sections
**Priority:** P0
**Dependencies:** Task 1-4
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to see Brett's skills organized into clear categories with visually distinct certification chips so that I can quickly assess his competency profile.

#### Acceptance Criteria

- **AC1: Four skill categories render with correct chips**
  - Given: The Skills section is rendered
  - When: The four category groups are inspected
  - Then: Each group has a category label and the exact chips listed in Technical Context — no additions, no omissions

- **AC2: Certification chips visually distinct**
  - Given: The Skills section is rendered
  - When: Certification chips are compared to skill chips
  - Then: Certification chips have an accent-colored border (`var(--color-accent)`) while regular skill chips have `var(--color-border)`

- **AC3: Skills content requirements**
  - [ ] Section heading: `What I Bring` as `h2` with `.section-heading` class
  - [ ] Four category groups, each with a `<h3>` label and a flex-wrapped row of `.tag` chips
  - [ ] Category 1 — **Product & Strategy**: `Product Ownership`, `Requirements Elicitation`, `Agile / SAFe`, `Stakeholder Management`, `User Story Writing`, `Backlog Grooming`
  - [ ] Category 2 — **AI & Data**: `Agentic AI Workflows`, `RAG Architecture`, `LLM Integration`, `Prompt Engineering`, `AI Initiative Leadership`, `Data Science Fundamentals`
  - [ ] Category 3 — **Technical**: `Python`, `Git`, `HTML / CSS / JS`, `Local LLM Deployment`, `Vector Databases`, `API Integration`
  - [ ] Category 4 — **Certifications**: `Certified Scrum Master (CSM)`, `Certified Scrum Product Owner (CSPO)`, `Booz Allen Data Science Tech Excellence Program`
  - [ ] Certification chips use `.tag.tag--accent` modifier class with `border-color: var(--color-accent)` and `color: var(--color-accent)`
  - [ ] No hardcoded color values

#### Technical Context

Files to create/edit:
- Create: `assets/css/skills.css`
- Edit: `index.html` — populate `<section id="skills">`

HTML structure:
```html
<section id="skills">
  <div class="container">
    <h2 class="section-heading">What I Bring</h2>
    <div class="skills__groups">
      <div class="skills__group">
        <h3 class="skills__category">Product & Strategy</h3>
        <div class="skills__chips">
          <span class="tag">Product Ownership</span>
          <span class="tag">Requirements Elicitation</span>
          <span class="tag">Agile / SAFe</span>
          <span class="tag">Stakeholder Management</span>
          <span class="tag">User Story Writing</span>
          <span class="tag">Backlog Grooming</span>
        </div>
      </div>
      <div class="skills__group">
        <h3 class="skills__category">AI & Data</h3>
        <div class="skills__chips">
          <span class="tag">Agentic AI Workflows</span>
          <span class="tag">RAG Architecture</span>
          <span class="tag">LLM Integration</span>
          <span class="tag">Prompt Engineering</span>
          <span class="tag">AI Initiative Leadership</span>
          <span class="tag">Data Science Fundamentals</span>
        </div>
      </div>
      <div class="skills__group">
        <h3 class="skills__category">Technical</h3>
        <div class="skills__chips">
          <span class="tag">Python</span>
          <span class="tag">Git</span>
          <span class="tag">HTML / CSS / JS</span>
          <span class="tag">Local LLM Deployment</span>
          <span class="tag">Vector Databases</span>
          <span class="tag">API Integration</span>
        </div>
      </div>
      <div class="skills__group">
        <h3 class="skills__category">Certifications</h3>
        <div class="skills__chips">
          <span class="tag tag--accent">Certified Scrum Master (CSM)</span>
          <span class="tag tag--accent">Certified Scrum Product Owner (CSPO)</span>
          <span class="tag tag--accent">Booz Allen Data Science Tech Excellence Program</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

Add `.tag--accent` modifier to `base.css`:
```css
.tag--accent {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

`.skills__chips`: `display: flex; flex-wrap: wrap; gap: var(--space-xs)`
`.skills__category`: `font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); margin-bottom: var(--space-xs)`

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 5-2: Build Contact section and Footer

**Phase:** Skills + Contact Sections
**Priority:** P0
**Dependencies:** Task 1-4
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want a clean, minimal contact section with LinkedIn and GitHub links so that I can immediately reach out to Brett after reviewing the portfolio.

#### Acceptance Criteria

- **AC1: Contact links open correctly**
  - Given: The Contact section is rendered
  - When: The user clicks the LinkedIn link
  - Then: `https://www.linkedin.com/in/brett-hardiman-75682a205` opens in a new tab
  - When: The user clicks the GitHub link
  - Then: `https://github.com/brett-hardiman` opens in a new tab

- **AC2: Copyright year is dynamic**
  - Given: The footer is rendered in any year
  - When: The copyright text is read
  - Then: The year matches the current year (injected by JS — `new Date().getFullYear()`)

- **AC3: Contact content requirements**
  - [ ] Section heading: `Let's Connect` as `h2` with `.section-heading`
  - [ ] Subtext: `Open to AI Product Owner, AI Product Manager, and AI Business Analyst roles.`
  - [ ] LinkedIn link: `<a>` with `href`, `target="_blank"`, `rel="noopener noreferrer"`, text `LinkedIn`
  - [ ] GitHub link: `<a>` with `href`, `target="_blank"`, `rel="noopener noreferrer"`, text `GitHub`
  - [ ] Both links styled with `.btn` classes
  - [ ] `<footer>` contains copyright: `© <span id="copyright-year"></span> Brett Hardiman`
  - [ ] `<script>` at bottom of `<body>` (already deferred per Task 1-1) sets `document.getElementById('copyright-year').textContent = new Date().getFullYear()`
  - [ ] No hardcoded color values in `contact.css`

#### Technical Context

Files to create/edit:
- Create: `assets/css/contact.css`
- Edit: `index.html` — populate `<section id="contact">` and `<footer>`

HTML structure:
```html
<section id="contact">
  <div class="container contact__inner">
    <h2 class="section-heading">Let's Connect</h2>
    <p class="contact__subtext">Open to AI Product Owner, AI Product Manager, and AI Business Analyst roles.</p>
    <div class="contact__links">
      <a href="https://www.linkedin.com/in/brett-hardiman-75682a205" target="_blank" rel="noopener noreferrer" class="btn btn--primary">LinkedIn</a>
      <a href="https://github.com/brett-hardiman" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">GitHub</a>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <p class="footer__copy">© <span id="copyright-year"></span> Brett Hardiman</p>
  </div>
</footer>
```

Copyright year JS — add inline at bottom of `<body>` or inside `animations.js`:
```javascript
const yearEl = document.getElementById('copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
```

Contact section: centered text alignment, generous top/bottom padding (`var(--space-xl)`).
Footer: `border-top: 1px solid var(--color-border); padding: var(--space-md) 0; text-align: center; color: var(--color-text-muted)`.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review
