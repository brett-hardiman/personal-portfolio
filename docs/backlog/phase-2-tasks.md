# Phase 2 — Content Sections

> **Objective:** Populate all essential content sections with real data, styled and responsive. At the end of this phase the site is a complete, functional portfolio — just without animations or advanced interactions.
>
> **Dependencies:** Phase 1 (all foundation tasks must be complete).

---

### Task 2-1: Implement the Hero Section

**Phase:** Content Sections
**Priority:** P0
**Dependencies:** Task 1-3, Task 1-4
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to see Brett's name, title, and a clear call-to-action the moment I land on the page so that I immediately understand who this site is for and what action to take.

#### Acceptance Criteria

- **AC1: Hero fills the full viewport height**
  - Given: The user loads the page
  - When: The hero section is rendered
  - Then: It occupies at least 100vh of vertical space and Brett's name, title, tagline, and CTA buttons are visible without scrolling on any viewport size

- **AC2: Hero text uses the responsive hero font size**
  - Given: The hero section is rendered
  - When: The viewport width is resized from 320px to 1440px
  - Then: The `.hero-name` heading scales fluidly using `clamp(2.5rem, 6vw, 5rem)` (i.e., `--font-size-hero`) and does not overflow or truncate

- **AC3: CTA buttons are functional**
  - Given: The hero is rendered
  - When: A user clicks "View My Work"
  - Then: The page smooth-scrolls to the `#projects` section
  - Given: The hero is rendered
  - When: A user clicks "Connect on LinkedIn"
  - Then: Brett's LinkedIn profile (`https://www.linkedin.com/in/brett-hardiman-75682a205`) opens in a new tab with `rel="noopener noreferrer"`

- **AC4: CSS-only decorative background is applied**
  - Given: The hero is rendered
  - When: JavaScript is disabled
  - Then: A subtle visual background (CSS gradient, radial gradient, or geometric pattern using CSS `background` or pseudo-elements) is visible behind the hero text — no image files required

- **AC5: Hero content checklist**
  - [ ] `.hero-greeting` paragraph is present with text "Hello, I'm"
  - [ ] `.hero-name` h1 is present with text "Brett Hardiman"
  - [ ] `.hero-title` paragraph contains "Business Analyst" and "AI/ML Product Developer" with a `<span class="hero-separator">|</span>`
  - [ ] `.hero-tagline` paragraph is present with the value proposition text
  - [ ] `.hero-cta` div contains both CTA buttons
  - [ ] "View My Work" button has class `btn btn--primary` and `href="#projects"`
  - [ ] "Connect on LinkedIn" button has class `btn btn--ghost`, correct LinkedIn URL, `target="_blank"`, and `rel="noopener noreferrer"`
  - [ ] `css/hero.css` contains all hero-specific styles
  - [ ] Button styles (`btn`, `btn--primary`, `btn--ghost`) are defined in `css/layout.css` or a dedicated button section so they are reusable across sections
  - [ ] Hero content is readable at WCAG AA contrast ratio (>= 4.5:1) against its background

#### Technical Context

HTML structure from the project plan:
```html
<section id="hero" class="section section--hero">
  <div class="hero-content">
    <p class="hero-greeting">Hello, I'm</p>
    <h1 class="hero-name">Brett Hardiman</h1>
    <p class="hero-title">Business Analyst <span class="hero-separator">|</span> AI/ML Product Developer</p>
    <p class="hero-tagline">Building intelligent agents that transform how teams work.</p>
    <div class="hero-cta">
      <a href="#projects" class="btn btn--primary">View My Work</a>
      <a href="https://www.linkedin.com/in/brett-hardiman-75682a205" class="btn btn--ghost" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
    </div>
  </div>
</section>
```

Hero CSS key requirements:
- `min-height: 100vh` with Flexbox centering (center both axes)
- CSS gradient background using `--color-bg-primary` and `--color-green` (subtle, not loud)
- `.hero-name` uses `var(--font-size-hero)` which is `clamp(2.5rem, 6vw, 5rem)`
- `.hero-separator` colored `var(--color-green)` for accent

Button styles (reusable across the site):
```css
.btn {
  display: inline-flex;
  align-items: center;
  padding: var(--space-sm) var(--space-xl);
  border-radius: 50px;
  font-family: 'Montserrat', system-ui, sans-serif;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.btn--primary {
  background-color: var(--color-green);
  color: var(--color-black);
}

.btn--primary:hover {
  background-color: var(--color-green-hover);
}

.btn--ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-border);
}

.btn--ghost:hover {
  border-color: var(--color-green);
  color: var(--color-green);
}
```

Phase 3 will add `data-parallax-speed` attributes to decorative hero elements — design the hero CSS to support absolutely positioned decorative child elements (the paralax layer structure is added in Task 3-3).

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 2-2: Implement the About Section

**Phase:** Content Sections
**Priority:** P0
**Dependencies:** Task 1-3
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to read Brett's professional narrative so that I understand his background, his pivot into AI/ML, and the scope of impact he has had.

#### Acceptance Criteria

- **AC1: About section renders with section number**
  - Given: The about section is scrolled into view
  - When: The section is inspected
  - Then: The section number "01" is displayed as a large styled label above the section title "About Me"

- **AC2: Professional narrative is present and complete**
  - Given: The about section is rendered
  - When: A user reads the content
  - Then: Three paragraphs are present covering: (1) Brett's background starting at Booz Allen Hamilton in a traditional requirements role, (2) his self-directed pivot into AI/ML and the 3 AI initiatives he led (with mention of congressional committee reporting), (3) his promotion from Senior Consultant to Associate and focus on agentic AI workflows

- **AC3: Two-column layout on desktop**
  - Given: The viewport is 1024px or wider
  - When: The about section is rendered
  - Then: The text content occupies approximately two-thirds of the width and an image placeholder occupies the remaining one-third, side by side

- **AC4: Stacked layout on mobile**
  - Given: The viewport is less than 768px
  - When: The about section is rendered
  - Then: The text content and image placeholder stack vertically with no horizontal overflow

- **AC5: About section checklist**
  - [ ] Section has `id="about"`, `class="section"`, and `data-section-number="01"`
  - [ ] `.section-number` span displays "01"
  - [ ] `.section-title` h2 reads "About Me"
  - [ ] `.about-text` contains at least 3 `<p>` tags with substantive professional content (not lorem ipsum)
  - [ ] `.about-image` div contains an `<img>` element with `src="assets/images/headshot.jpg"`, `alt="Brett Hardiman"`, and `loading="lazy"`
  - [ ] Image is styled with `border-radius` and fits proportionally within the layout
  - [ ] `css/about.css` contains all about-section-specific styles
  - [ ] Section content uses `--color-text-secondary` for body paragraphs

#### Technical Context

HTML structure from the project plan:
```html
<section id="about" class="section" data-section-number="01">
  <div class="section-container">
    <span class="section-number">01</span>
    <h2 class="section-title">About Me</h2>
    <div class="about-content">
      <div class="about-text">
        <p>...</p>
        <p>...</p>
        <p>...</p>
      </div>
      <div class="about-image">
        <div class="about-image-placeholder" aria-hidden="true"></div>
      </div>
    </div>
  </div>
</section>
```

Content to include (all three paragraphs must reference these facts):
- Started career as a Business Analyst at Johnson & Johnson Insurance (April 2022 – December 2023), gathering requirements for 7+ projects, managing SQL databases, and leading functional/regression testing
- Moved to Booz Allen Hamilton as a Technical Requirements Analyst (December 2023 – Present), where he elicits and manages requirements for AI-powered products across an AI/ML Agile Release Train
- Served as requirements lead across 4 AI product initiatives, driving each through MVP delivery
- Earned CSM and CSPO certifications; completed the Booz Allen Data Science Tech Excellence Program covering Python, ML, NLP, and LLMs
- Built AI-powered agents that automated roadmap generation, Jira issue creation, requirements authoring, and sprint summarization
- B.S. in Computer Information Systems from College of Charleston (2017–2021)
- Bridges the gap between AI/ML engineering teams and business stakeholders

Section number styling should follow this pattern:
```css
.section-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--font-size-sm);
  color: var(--color-green);
  letter-spacing: 0.2em;
  display: block;
  margin-bottom: var(--space-sm);
}
```

Section title styling:
```css
.section-title {
  font-family: 'Montserrat', system-ui, sans-serif;
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2xl);
}
```

Add `data-reveal` attributes to the `.about-content` div (and optionally child elements) so Phase 3's scroll-reveal system can animate them in. The `data-reveal` attribute is added here even though the JS observer is not yet active — it will not affect the static appearance.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 2-3: Implement the Skills Section

**Phase:** Content Sections
**Priority:** P0
**Dependencies:** Task 1-3
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to scan Brett's technical skills organized by category so that I can quickly assess whether his skill set matches what I am looking for.

#### Acceptance Criteria

- **AC1: All four skill categories are rendered**
  - Given: The skills section is visible
  - When: The user reads the section
  - Then: Four categories appear with their headings: "AI / ML", "Languages", "Tools", and "Methodologies"

- **AC2: All skills are present under their correct categories**
  - Given: The skills section is rendered
  - When: Each category is inspected
  - Then: "AI / ML" contains Large Language Models, RAG, Generative AI, Agentic AI, NLP, Machine Learning; "Languages" contains SQL, Python, JSON, XML; "Tools" contains Jira, SharePoint, Confluence, Streamlit, Ollama, Excel, G-Suite; "Methodologies" contains Agile, Scrum, SAFe

- **AC3: Skill badges are styled with monospace font and green hover**
  - Given: The skill badges are rendered
  - When: A user hovers over a badge (on desktop)
  - Then: The badge border or background transitions to accent with `--color-green` or `--color-border-hover`

- **AC4: Skills grid is responsive**
  - Given: The viewport is less than 576px
  - When: The skills section is rendered
  - Then: Badges wrap naturally without overflow; no horizontal scrollbar appears

- **AC5: Skills section checklist**
  - [ ] Section has `id="skills"`, `class="section"`, and `data-section-number="02"`
  - [ ] `.section-number` displays "02"
  - [ ] `.section-title` reads "Skills"
  - [ ] Each category uses `<h3 class="skill-category-title">` for its heading
  - [ ] Each skill is a `<li class="skill-badge">` inside `<ul class="skill-list">`
  - [ ] Skill badge text uses JetBrains Mono font
  - [ ] `css/skills.css` contains all skills-specific styles
  - [ ] `data-reveal` and `data-reveal-delay` attributes are added to skill badges for Phase 3 stagger animation (e.g., each badge gets `data-reveal` and an incrementing `data-reveal-delay` value in milliseconds)

#### Technical Context

HTML structure from the project plan:
```html
<div class="skills-grid">
  <div class="skill-category">
    <h3 class="skill-category-title">AI / ML</h3>
    <ul class="skill-list">
      <li class="skill-badge"><span class="skill-name">Large Language Models</span></li>
      <li class="skill-badge"><span class="skill-name">RAG</span></li>
      <li class="skill-badge"><span class="skill-name">Generative AI</span></li>
      <li class="skill-badge"><span class="skill-name">Agentic AI</span></li>
      <li class="skill-badge"><span class="skill-name">NLP</span></li>
      <li class="skill-badge"><span class="skill-name">Machine Learning</span></li>
    </ul>
  </div>
  <div class="skill-category">
    <h3 class="skill-category-title">Languages</h3>
    <ul class="skill-list">
      <li class="skill-badge"><span class="skill-name">SQL</span></li>
      <li class="skill-badge"><span class="skill-name">Python</span></li>
      <li class="skill-badge"><span class="skill-name">JSON</span></li>
      <li class="skill-badge"><span class="skill-name">XML</span></li>
    </ul>
  </div>
  <div class="skill-category">
    <h3 class="skill-category-title">Tools</h3>
    <ul class="skill-list">
      <li class="skill-badge"><span class="skill-name">Jira</span></li>
      <li class="skill-badge"><span class="skill-name">SharePoint</span></li>
      <li class="skill-badge"><span class="skill-name">Confluence</span></li>
      <li class="skill-badge"><span class="skill-name">Streamlit</span></li>
      <li class="skill-badge"><span class="skill-name">Ollama</span></li>
      <li class="skill-badge"><span class="skill-name">Excel</span></li>
      <li class="skill-badge"><span class="skill-name">G-Suite</span></li>
    </ul>
  </div>
  <div class="skill-category">
    <h3 class="skill-category-title">Methodologies</h3>
    <ul class="skill-list">
      <li class="skill-badge"><span class="skill-name">Agile</span></li>
      <li class="skill-badge"><span class="skill-name">Scrum</span></li>
      <li class="skill-badge"><span class="skill-name">SAFe</span></li>
    </ul>
  </div>
</div>
```

Skill badge styling from the project plan:
```css
.skill-badge {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: var(--space-xs) var(--space-md);
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  transition: border-color 0.2s ease, color 0.2s ease;
}

.skill-badge:hover {
  border-color: var(--color-green);
  color: var(--color-text-primary);
}
```

Skill list should use `list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: var(--space-sm);`

For the stagger animation, add incrementing `data-reveal-delay` values to each badge in multiples of 50ms (e.g., first badge: `data-reveal-delay="0"`, second: `data-reveal-delay="50"`, etc.). These are consumed by the Intersection Observer in Phase 3.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 2-4: Implement the Work Experience Section

**Phase:** Content Sections
**Priority:** P0
**Dependencies:** Task 1-3
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to see Brett's career timeline clearly laid out so that I understand his progression from requirements engineering to AI/ML specialization.

#### Acceptance Criteria

- **AC1: Two timeline entries are rendered in reverse chronological order**
  - Given: The experience section is visible
  - When: The user reads the timeline
  - Then: Two entries are displayed in reverse chronological order: (1) Technical Requirements Analyst at Booz Allen Hamilton (December 2023 – Present), (2) Business Analyst at Johnson & Johnson Insurance (April 2022 – December 2023)

- **AC2: Timeline has a vertical connecting line**
  - Given: The experience section is rendered on desktop (1024px+)
  - When: The timeline is inspected
  - Then: A vertical line connects the timeline markers (implemented with CSS `::before` or `::after` pseudo-element on `.timeline`)

- **AC3: Timeline layout is responsive**
  - Given: The viewport is less than 768px
  - When: The experience section is rendered
  - Then: All timeline cards stack vertically in a single column; the connecting line remains; no horizontal overflow occurs

- **AC4: Timeline content is accurate and complete**
  - Given: The experience section is rendered
  - When: The user reads each entry
  - Then: Entry 1 (Booz Allen Hamilton) includes: role title "Technical Requirements Analyst", dates "December 2023 – Present", location "Charleston, SC", and bullet points covering AI/ML ART requirements, 4 AI product initiatives through MVP, Scrum Master duties, building AI-powered agents for automation, and completing the Data Science Tech Excellence Program; Entry 2 (Johnson & Johnson Insurance) includes: role title "Business Analyst", dates "April 2022 – December 2023", location "Mount Pleasant, SC", and bullet points covering requirements gathering for 7+ projects, functional specifications, SQL database management, functional/regression testing, and technical documentation

- **AC5: Experience section checklist**
  - [ ] Section has `id="experience"`, `class="section"`, and `data-section-number="03"`
  - [ ] `.section-number` displays "03"
  - [ ] `.section-title` reads "Experience"
  - [ ] Two `.timeline-item` elements are present (Booz Allen Hamilton and Johnson & Johnson Insurance)
  - [ ] Each `.timeline-item` contains: `.timeline-marker` (dot on the line), `.timeline-date` span, `.timeline-role` h3, `.timeline-company` paragraph, `.timeline-details` unordered list
  - [ ] `css/experience.css` contains all timeline styles
  - [ ] `.timeline-marker` is styled as a green dot (`background-color: var(--color-green)`)
  - [ ] `data-reveal` attributes added to each `.timeline-item` for Phase 3

#### Technical Context

HTML structure with real content:
```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <span class="timeline-date">December 2023 — Present</span>
      <h3 class="timeline-role">Technical Requirements Analyst</h3>
      <p class="timeline-company">Booz Allen Hamilton · Charleston, SC</p>
      <ul class="timeline-details">
        <li>Elicit, document, and manage requirements for AI-powered products across an AI/ML Agile Release Train, translating stakeholder needs into user stories, acceptance criteria, and test scenarios</li>
        <li>Served as requirements lead across 4 AI product initiatives, driving each through MVP delivery in coordination with developers, data scientists, and product owners</li>
        <li>Served as Scrum Master facilitating daily standups, backlog refinements, sprint planning, and retrospectives for AI product teams</li>
        <li>Built AI-powered agents that automated roadmap generation, Jira issue creation, requirements authoring, and sprint summarization</li>
        <li>Completed the Booz Allen Data Science Tech Excellence Program covering Python, machine learning, NLP, and large language models</li>
      </ul>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <span class="timeline-date">April 2022 — December 2023</span>
      <h3 class="timeline-role">Business Analyst</h3>
      <p class="timeline-company">Johnson & Johnson Insurance · Mount Pleasant, SC</p>
      <ul class="timeline-details">
        <li>Gathered and documented business requirements for 7+ projects, partnering with stakeholders from discovery through production release</li>
        <li>Translated requirements into functional specifications and coordinated iterative feedback cycles with development teams</li>
        <li>Managed relational database updates using SQL to maintain client compliance and data integrity</li>
        <li>Led functional and regression testing, performing root cause analysis and initiating corrective actions prior to release</li>
        <li>Authored and maintained technical documentation including process flows, system specs, and end-user guides</li>
      </ul>
    </div>
  </div>
</div>
```

Timeline vertical line CSS approach:
```css
.timeline {
  position: relative;
  padding-left: var(--space-3xl);
}

.timeline::before {
  content: '';
  position: absolute;
  left: 12px; /* align with marker center */
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--color-border);
}

.timeline-marker {
  position: absolute;
  left: 0; /* relative to .timeline-item */
  top: var(--space-sm);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-green);
  border: 3px solid var(--color-bg-primary);
}
```

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 2-5: Implement the Projects Section

**Phase:** Content Sections
**Priority:** P0
**Dependencies:** Task 1-3, Task 1-5
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to see Brett's projects presented in a visually clear card layout so that I can quickly understand what he has built and navigate to the source code.

#### Acceptance Criteria

- **AC1: Two project cards are rendered**
  - Given: The projects section is visible
  - When: The user views the section
  - Then: Exactly two project cards are displayed: "Local LLM App" and "AI Agent Pipeline Portfolio"

- **AC2: Each project card has the correct content**
  - Given: The "Local LLM App" card is rendered
  - When: The user reads it
  - Then: It shows the title, the description "A working chat-based AI app that runs entirely on your computer. No cloud APIs, no data leaving your machine.", a "Python" tech badge, and a "View on GitHub" link to `https://github.com/brett-hardiman/Local-LLM-App`
  - Given: The "AI Agent Pipeline Portfolio" card is rendered
  - When: The user reads it
  - Then: It shows the title, description referencing the 8-agent Claude Code pipeline, tech badges for HTML, CSS, JavaScript, and Claude Code, and a "View on GitHub" link to `https://github.com/brett-hardiman/personal-portfolio`

- **AC3: GitHub links open in a new tab safely**
  - Given: Any project card link is clicked
  - When: The link is activated
  - Then: The GitHub URL opens in a new browser tab and the link has `rel="noopener noreferrer"` (inspectable in browser DevTools)

- **AC4: Cards are in a two-column grid on desktop and single column on mobile**
  - Given: The viewport is 768px or wider
  - When: The projects section is rendered
  - Then: Both cards appear side by side in a two-column CSS Grid layout
  - Given: The viewport is less than 768px
  - When: The projects section is rendered
  - Then: Cards stack vertically, each occupying full width

- **AC5: Project card image placeholder renders**
  - Given: The `assets/images/project-placeholder.svg` file exists (created in Task 1-5)
  - When: The cards render
  - Then: Each card shows the placeholder image at the correct aspect ratio; the `<img>` has a descriptive `alt` attribute and `loading="lazy"`

- **AC6: Projects section checklist**
  - [ ] Section has `id="projects"`, `class="section"`, and `data-section-number="04"`
  - [ ] `.section-number` displays "04"
  - [ ] `.section-title` reads "Projects"
  - [ ] Each card uses `<div class="project-card">` containing `.project-card-image`, `.project-card-content`, `.project-card-title` (h3), `.project-card-description`, `.project-card-tech`, and `.project-card-links`
  - [ ] Tech badges use `<span class="tech-badge">` inside `.project-card-tech`
  - [ ] `css/projects.css` contains all project card styles
  - [ ] Cards have `--color-bg-card` background, `border-radius`, and `border: 1px solid var(--color-border)`
  - [ ] CSS hover state on `.project-card:hover` raises the card with `box-shadow` and changes border to `var(--color-green)` (JS-driven 3D tilt is added in Phase 3)
  - [ ] `data-reveal` attributes added to each `.project-card`

#### Technical Context

HTML structure for each card from the project plan:
```html
<div class="project-card">
  <div class="project-card-image">
    <img src="assets/images/project-placeholder.svg" alt="Local LLM App screenshot" loading="lazy">
  </div>
  <div class="project-card-content">
    <h3 class="project-card-title">Local LLM App</h3>
    <p class="project-card-description">A working chat-based AI app that runs entirely on your computer. No cloud APIs, no data leaving your machine.</p>
    <div class="project-card-tech">
      <span class="tech-badge">Python</span>
    </div>
    <div class="project-card-links">
      <a href="https://github.com/brett-hardiman/Local-LLM-App" class="project-link" target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  </div>
</div>
```

CSS for projects grid:
```css
.projects-grid {
  display: grid;
  grid-template-columns: 1fr; /* mobile: single column */
  gap: var(--space-xl);
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

Card hover CSS (Phase 3 adds JS-driven 3D tilt on top of this):
```css
.project-card {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  border-color: var(--color-green);
  box-shadow: 0 8px 30px rgba(29, 185, 84, 0.15);
}
```

The grid layout and card wrapper must be inside the section container. The projects wrapper HTML:
```html
<section id="projects" class="section" data-section-number="04">
  <div class="section-container">
    <span class="section-number">04</span>
    <h2 class="section-title">Projects</h2>
    <div class="projects-grid">
      <!-- project cards here -->
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

### Task 2-6: Implement the Contact Section

**Phase:** Content Sections
**Priority:** P0
**Dependencies:** Task 1-3, Task 2-7
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want a clear and prominent call-to-action at the end of the page so that I know exactly how to reach Brett and can take action without hunting for contact information.

#### Acceptance Criteria

- **AC1: Contact section has a centered layout with the LinkedIn CTA as the primary element**
  - Given: The contact section is rendered
  - When: The user scrolls to the bottom of the page
  - Then: The section title "Get In Touch", a brief paragraph, and a prominent "Connect on LinkedIn" button are centered on the page

- **AC2: LinkedIn button opens the correct URL in a new tab**
  - Given: The contact section is rendered
  - When: The user clicks "Connect on LinkedIn"
  - Then: `https://www.linkedin.com/in/brett-hardiman-75682a205` opens in a new tab with `rel="noopener noreferrer"`

- **AC3: GitHub and LinkedIn social icon links are present**
  - Given: The contact section is rendered
  - When: The user looks below the primary CTA button
  - Then: Two icon links are visible — one for GitHub and one for LinkedIn — each with a descriptive `aria-label`

- **AC4: Contact section checklist**
  - [ ] Section has `id="contact"`, `class="section"`, and `data-section-number="07"`
  - [ ] `.section-number` displays "07"
  - [ ] `.section-title` reads "Get In Touch"
  - [ ] `.contact-text` paragraph describes the invitation to connect
  - [ ] Primary CTA button uses `btn btn--primary btn--large` classes
  - [ ] GitHub social link points to `https://github.com/brett-hardiman` with `aria-label="GitHub profile"`
  - [ ] LinkedIn social link points to `https://www.linkedin.com/in/brett-hardiman-75682a205` with `aria-label="LinkedIn profile"`
  - [ ] Both social links have `target="_blank"` and `rel="noopener noreferrer"`
  - [ ] SVG icons from Task 2-7 are embedded in the social link anchors
  - [ ] `css/contact.css` contains all contact-section-specific styles
  - [ ] `data-reveal` added to the section container for Phase 3 animation

#### Technical Context

HTML structure from the project plan:
```html
<section id="contact" class="section" data-section-number="07">
  <div class="section-container section-container--centered">
    <span class="section-number">07</span>
    <h2 class="section-title">Get In Touch</h2>
    <p class="contact-text">Interested in working together or just want to connect? Reach out on LinkedIn.</p>
    <a href="https://www.linkedin.com/in/brett-hardiman-75682a205" class="btn btn--primary btn--large" target="_blank" rel="noopener noreferrer">
      Connect on LinkedIn
    </a>
    <div class="social-links">
      <a href="https://github.com/brett-hardiman" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
        <!-- GitHub SVG icon -->
      </a>
      <a href="https://www.linkedin.com/in/brett-hardiman-75682a205" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
        <!-- LinkedIn SVG icon -->
      </a>
    </div>
  </div>
</section>
```

The `.section-container--centered` modifier should apply `text-align: center` and `display: flex; flex-direction: column; align-items: center`.

The `.btn--large` modifier adds extra padding: `padding: var(--space-md) var(--space-3xl); font-size: var(--font-size-md);`

Social links container:
```css
.social-links {
  display: flex;
  gap: var(--space-xl);
  margin-top: var(--space-2xl);
  align-items: center;
}

.social-links a {
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.social-links a:hover {
  color: var(--color-green);
}

.social-links svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}
```

Note: This task depends on Task 2-7 (SVG Icons) for the icon content. The contact section HTML structure must be added before icons are embedded, but the SVG content can be filled in once Task 2-7 is complete. If creating in a single pass, create both together.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 2-7: Create SVG Icons and Implement the Footer

**Phase:** Content Sections
**Priority:** P0
**Dependencies:** Task 1-3
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to create the SVG icon set and the site footer so that all sections that reference social icons have the correct accessible graphics and the page has a complete, consistently styled conclusion.

#### Acceptance Criteria

- **AC1: All required SVG icons exist and are accessible**
  - Given: The icons are embedded in the HTML
  - When: A screen reader encounters an icon-only link or button
  - Then: The `aria-label` on the parent anchor provides a meaningful accessible name; the SVG itself has `aria-hidden="true"` and `focusable="false"` to prevent double-announcement

- **AC2: Icons render correctly in all major browsers**
  - Given: The page is loaded in Chrome, Firefox, and Safari
  - When: Social icons are inspected
  - Then: GitHub and LinkedIn icons render as recognizable brand icons at 24x24px

- **AC3: Footer is styled and complete**
  - Given: The page is rendered
  - When: The user scrolls to the very bottom
  - Then: The footer displays: copyright line "© 2026 Brett Hardiman", GitHub icon link, LinkedIn icon link, and an optional "Built with Claude Code" credit line

- **AC4: SVG icons checklist**
  - [ ] GitHub SVG icon: standard GitHub mark (Octocat silhouette or simplified mark)
  - [ ] LinkedIn SVG icon: "in" lettermark on rounded square, or the standard LinkedIn mark
  - [ ] External link arrow SVG: a simple arrow or diagonal arrow icon used on project card links
  - [ ] Hamburger icon SVG: three horizontal lines for the mobile nav toggle
  - [ ] Close/X icon SVG: an X shape for closing the mobile menu
  - [ ] All SVGs have `xmlns="http://www.w3.org/2000/svg"` and `viewBox` attributes
  - [ ] All SVGs used inside links have `aria-hidden="true"` and `focusable="false"`
  - [ ] SVG files are saved to `assets/icons/` (e.g., `github.svg`, `linkedin.svg`) AND/OR are defined as reusable inline `<svg>` blocks directly in the HTML

- **AC5: Footer checklist**
  - [ ] `<footer class="site-footer">` element is present
  - [ ] Copyright line uses the correct year (2026) and name
  - [ ] Footer contains GitHub and LinkedIn social icon links with correct URLs and `aria-label` attributes
  - [ ] `css/footer.css` contains all footer-specific styles
  - [ ] Footer has a `border-top: 1px solid var(--color-border)` separator
  - [ ] Footer uses `--color-text-muted` for the copyright text

#### Technical Context

Footer structure from the project plan:
```html
<footer class="site-footer">
  <div class="section-container">
    <p class="footer-copyright">© 2026 Brett Hardiman</p>
    <div class="social-links">
      <a href="https://github.com/brett-hardiman" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
        <!-- GitHub SVG -->
      </a>
      <a href="https://www.linkedin.com/in/brett-hardiman-75682a205" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
        <!-- LinkedIn SVG -->
      </a>
    </div>
    <p class="footer-credit">Built with Claude Code</p>
  </div>
</footer>
```

GitHub SVG (simplified mark — use the standard GitHub Octocat path data from publicly available open-source icon libraries like Simple Icons or Feather Icons, ensuring the icon is freely licensed):
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <!-- GitHub mark path data -->
</svg>
```

For LinkedIn:
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <!-- LinkedIn mark path data -->
</svg>
```

SVG styling (icons inherit color from parent via `fill: currentColor` or explicit fill):
```css
.site-footer svg,
.social-links svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}
```

Footer CSS:
```css
.site-footer {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding: var(--space-2xl) 0;
}

.site-footer .section-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.footer-copyright,
.footer-credit {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
```

Note: The social icon links and `.social-links` CSS class are shared between the Contact section (Task 2-6) and the Footer. The CSS for `.social-links` should be defined in `css/layout.css` or `css/footer.css` in a way that applies to both locations.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review
