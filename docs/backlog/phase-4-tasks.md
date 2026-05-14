# Phase 4 — Polish, SEO, and Nice-to-Haves

> **Objective:** Add the nice-to-have sections (Testimonials, Education), implement SEO meta tags and Open Graph data, run a final accessibility audit, and apply visual polish. This phase transforms the site from "good" to "ready to share."
>
> **Dependencies:** Phase 2 (all content sections must exist) and Phase 3 (animations must be working so polish can be applied on top).

---

### Task 4-1: Implement the Testimonials Section

**Phase:** Polish, SEO, and Nice-to-Haves
**Priority:** P2
**Dependencies:** Task 1-3, Task 3-2
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to see a testimonials section that Brett can easily activate when he collects real quotes, so that the site can immediately become more credible without structural changes.

#### Acceptance Criteria

- **AC1: Testimonials section is present in the HTML but hidden by default**
  - Given: The site is deployed with no real testimonial content
  - When: The page loads
  - Then: `<section id="testimonials">` exists in the DOM but has `display: none` applied via a CSS rule or an inline style; it does not appear in the visible page layout
  - A code comment in the HTML explains: `<!-- To activate: remove the 'hidden' class or the inline display:none from this section -->`

- **AC2: Testimonials section has the correct structure with placeholder content**
  - Given: The testimonials section is temporarily made visible (by removing its hidden state)
  - When: The section is rendered
  - Then: Section number "05" and title "What Colleagues Say" appear, and at least two `<blockquote class="testimonial-card">` elements are visible with clear placeholder text

- **AC3: Testimonial cards are styled with the green left border accent**
  - Given: The testimonials section is visible
  - When: A testimonial card is inspected
  - Then: Each `.testimonial-card` has a `border-left: 3px solid var(--color-green)` accent and italicized quote text

- **AC4: CSS quote marks decorate the testimonial text**
  - Given: The testimonials section is visible
  - When: The `.testimonial-quote` paragraphs are inspected
  - Then: A large decorative quotation mark is rendered via a `::before` CSS pseudo-element on `.testimonial-quote` or `.testimonial-card`

- **AC5: Testimonials section checklist**
  - [ ] Section has `id="testimonials"`, `class="section"`, and `data-section-number="05"`
  - [ ] Section is hidden by default (class `section--hidden` with `display: none` or `hidden` attribute)
  - [ ] `.section-number` displays "05"
  - [ ] `.section-title` reads "What Colleagues Say"
  - [ ] At least 2 `<blockquote class="testimonial-card">` elements with placeholder text
  - [ ] Each card has `.testimonial-quote` (the quote text), `.testimonial-name` (`<cite>`), and `.testimonial-role`
  - [ ] `css/testimonials.css` contains all testimonial-specific styles
  - [ ] `data-reveal` attributes are present on cards for when the section is activated

#### Technical Context

HTML structure from the project plan:
```html
<section id="testimonials" class="section section--hidden" data-section-number="05">
  <div class="section-container">
    <span class="section-number">05</span>
    <h2 class="section-title">What Colleagues Say</h2>
    <div class="testimonials-grid">
      <blockquote class="testimonial-card" data-reveal>
        <p class="testimonial-quote">"[Testimonial text placeholder — replace with actual quote.]"</p>
        <footer class="testimonial-author">
          <cite class="testimonial-name">Colleague Name</cite>
          <span class="testimonial-role">Role, Company</span>
        </footer>
      </blockquote>
      <blockquote class="testimonial-card" data-reveal data-reveal-delay="100">
        <p class="testimonial-quote">"[Testimonial text placeholder — replace with actual quote.]"</p>
        <footer class="testimonial-author">
          <cite class="testimonial-name">Colleague Name</cite>
          <span class="testimonial-role">Role, Company</span>
        </footer>
      </blockquote>
    </div>
  </div>
</section>
```

Hidden state CSS in `css/testimonials.css`:
```css
.section--hidden {
  display: none;
}
```

Testimonial card CSS:
```css
.testimonials-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
}

@media (min-width: 768px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.testimonial-card {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-green);
  border-radius: 8px;
  padding: var(--space-xl);
  margin: 0;
}

.testimonial-quote {
  font-style: italic;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
  position: relative;
}

.testimonial-quote::before {
  content: '\201C'; /* Unicode left double quotation mark */
  font-size: var(--font-size-5xl);
  color: var(--color-green);
  opacity: 0.3;
  position: absolute;
  top: -1rem;
  left: -0.5rem;
  font-family: 'Montserrat', system-ui, sans-serif;
  line-height: 1;
}

.testimonial-author {
  display: block;
}

.testimonial-name {
  display: block;
  font-style: normal;
  font-weight: 600;
  color: var(--color-text-primary);
}

.testimonial-role {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
```

Also update the nav in `index.html` to NOT include a link to `#testimonials` while it is hidden. The nav link can be added manually when Brett activates the section.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 4-2: Implement the Education & Certifications Section

**Phase:** Polish, SEO, and Nice-to-Haves
**Priority:** P1
**Dependencies:** Task 1-3, Task 3-2
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to see Brett's educational background and certifications so that I can understand his academic foundation and professional credentials alongside his work experience.

#### Acceptance Criteria

- **AC1: Education section is visible by default**
  - Given: The site is deployed
  - When: The page loads
  - Then: `<section id="education">` is visible in the page layout (NOT hidden — real data is available)

- **AC2: Education section displays real degree information**
  - Given: The education section is rendered
  - When: The user reads the content
  - Then: The section displays "Bachelor of Science in Computer Information Systems" from "College of Charleston" with "Charleston, SC" and "2017 – 2021"

- **AC3: Certifications are listed**
  - Given: The education section is rendered
  - When: The user reads the certifications area
  - Then: Two certifications are displayed: "Certified Scrum Product Owner (CSPO)" and "Certified Scrum Master (CSM)" — Public Trust clearance is NOT included

- **AC4: Education section checklist**
  - [ ] Section has `id="education"`, `class="section"`, and `data-section-number="06"`
  - [ ] `.section-number` displays "06"
  - [ ] `.section-title` reads "Education & Certifications"
  - [ ] `.education-item` with `.education-degree` h3 reading "Bachelor of Science in Computer Information Systems"
  - [ ] `.education-school` reads "College of Charleston · Charleston, SC"
  - [ ] `.education-detail` reads "2017 – 2021"
  - [ ] Certifications subsection with `.certification-list` containing CSPO and CSM badges
  - [ ] `css/education.css` contains all education-section-specific styles
  - [ ] `data-reveal` attributes added to `.education-item` and certification elements
  - [ ] Public Trust clearance is NOT listed

#### Technical Context

HTML structure with real content:
```html
<section id="education" class="section" data-section-number="06">
  <div class="section-container">
    <span class="section-number">06</span>
    <h2 class="section-title">Education & Certifications</h2>
    <div class="education-list">
      <div class="education-item" data-reveal>
        <h3 class="education-degree">Bachelor of Science in Computer Information Systems</h3>
        <p class="education-school">College of Charleston · Charleston, SC</p>
        <p class="education-detail">2017 – 2021</p>
      </div>
    </div>
    <div class="certifications" data-reveal>
      <h3 class="certification-title">Certifications</h3>
      <ul class="certification-list">
        <li class="certification-badge">Certified Scrum Product Owner (CSPO)</li>
        <li class="certification-badge">Certified Scrum Master (CSM)</li>
      </ul>
    </div>
  </div>
</section>
```

Education CSS (in `css/education.css`):
```css
.education-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
}

.education-item {
  border-left: 3px solid var(--color-green);
  padding-left: var(--space-xl);
}

.education-degree {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.education-school {
  color: var(--color-green);
  font-weight: 500;
  margin-bottom: var(--space-sm);
}

.education-detail {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
```

The certification badges should use a similar style to the skill badges (JetBrains Mono font, bordered pill style with green accent on hover).

```css
.certifications {
  margin-top: var(--space-3xl);
}

.certification-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.certification-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.certification-badge {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: var(--space-xs) var(--space-md);
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  transition: border-color 0.2s ease, color 0.2s ease;
}

.certification-badge:hover {
  border-color: var(--color-green);
  color: var(--color-text-primary);
}
```

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 4-3: Add SEO Meta Tags and Open Graph Data

**Phase:** Polish, SEO, and Nice-to-Haves
**Priority:** P1
**Dependencies:** Task 1-1
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to add all required SEO meta tags, Open Graph tags, and Twitter Card tags to the `<head>` of `index.html` so that search engines correctly index the page and social media shares display a rich preview.

#### Acceptance Criteria

- **AC1: Standard SEO meta tags are present and correct**
  - Given: The `<head>` of `index.html` is inspected
  - When: The meta tags are read
  - Then: `meta[name="description"]`, `meta[name="author"]`, and `meta[name="robots"]` are all present with the correct values

- **AC2: Open Graph tags are present with absolute URLs**
  - Given: The `<head>` is inspected
  - When: Open Graph tags are read
  - Then: `og:type`, `og:title`, `og:description`, `og:url`, and `og:image` meta properties are present; `og:url` is the absolute GitHub Pages URL and `og:image` references the OG image asset path

- **AC3: Twitter Card tags are present**
  - Given: The `<head>` is inspected
  - When: Twitter Card meta tags are read
  - Then: `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` are all present with correct values

- **AC4: Theme color meta tag is present**
  - Given: The page is opened on a mobile browser that supports the theme color meta tag (Chrome for Android)
  - When: The browser chrome is inspected
  - Then: The browser UI chrome (address bar area) uses the dark theme color `#191414`

- **AC5: SEO implementation checklist**
  - [ ] `<meta name="description" content="Brett Hardiman — Business Analyst and AI/ML Product Developer specializing in agentic AI workflows, RAG applications, and LLM-powered tools. View projects and professional background.">`
  - [ ] `<meta name="author" content="Brett Hardiman">`
  - [ ] `<meta name="robots" content="index, follow">`
  - [ ] `<meta property="og:type" content="website">`
  - [ ] `<meta property="og:title" content="Brett Hardiman — Business Analyst & AI/ML Product Developer">`
  - [ ] `<meta property="og:description" content="Portfolio showcasing AI/ML projects, agentic workflows, and professional experience at Booz Allen Hamilton.">`
  - [ ] `<meta property="og:url" content="https://brett-hardiman.github.io/personal-portfolio/">`
  - [ ] `<meta property="og:image" content="https://brett-hardiman.github.io/personal-portfolio/assets/images/og-image.png">`
  - [ ] `<meta name="twitter:card" content="summary_large_image">`
  - [ ] `<meta name="twitter:title" content="Brett Hardiman — Business Analyst & AI/ML Product Developer">`
  - [ ] `<meta name="twitter:description" content="Portfolio showcasing AI/ML projects and agentic AI workflows.">`
  - [ ] `<meta name="twitter:image" content="https://brett-hardiman.github.io/personal-portfolio/assets/images/og-image.png">`
  - [ ] `<meta name="theme-color" content="#191414">`

#### Technical Context

All meta tags from the project plan:
```html
<!-- SEO -->
<meta name="description" content="Brett Hardiman — Business Analyst and AI/ML Product Developer specializing in agentic AI workflows, RAG applications, and LLM-powered tools. View projects and professional background.">
<meta name="author" content="Brett Hardiman">
<meta name="robots" content="index, follow">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="Brett Hardiman — Business Analyst & AI/ML Product Developer">
<meta property="og:description" content="Portfolio showcasing AI/ML projects, agentic workflows, and professional experience at Booz Allen Hamilton.">
<meta property="og:url" content="https://brett-hardiman.github.io/personal-portfolio/">
<meta property="og:image" content="https://brett-hardiman.github.io/personal-portfolio/assets/images/og-image.png">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Brett Hardiman — Business Analyst & AI/ML Product Developer">
<meta name="twitter:description" content="Portfolio showcasing AI/ML projects and agentic AI workflows.">
<meta name="twitter:image" content="https://brett-hardiman.github.io/personal-portfolio/assets/images/og-image.png">

<!-- Theme color for mobile browsers -->
<meta name="theme-color" content="#191414">
```

Important note on absolute URLs: The `og:url` and `og:image` use absolute URLs (`https://brett-hardiman.github.io/personal-portfolio/`) as required by the Open Graph specification. This is the ONLY place in the codebase where absolute URLs appear and is a documented exception to the "relative paths" convention in CLAUDE.md.

The `og:image` references `assets/images/og-image.png`. This image must be created in Task 4-4. If the OG image does not yet exist, add a code comment noting it is created in Task 4-4:
```html
<!-- og:image asset created in Task 4-4 (Favicon and OG Image) -->
```

Meta tags should be placed in the `<head>` after the `<meta charset>` and `<meta viewport>` tags but before the Google Fonts `<link>` tags.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 4-4: Create the Favicon and OG Image

**Phase:** Polish, SEO, and Nice-to-Haves
**Priority:** P1
**Dependencies:** Task 4-3
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to create a favicon and an Open Graph preview image so that the site has a branded identity in browser tabs and on social media shares.

#### Acceptance Criteria

- **AC1: Favicon is a green "BH" monogram SVG and displays in browser tabs**
  - Given: The `<head>` of `index.html` references the favicon
  - When: The page is loaded in Chrome, Firefox, or Safari
  - Then: A favicon appears in the browser tab (the "BH" monogram or an alternative branded mark in the site's green and dark color palette)

- **AC2: Favicon links are present in `<head>` for both SVG and PNG formats**
  - Given: The favicon files exist in `assets/icons/`
  - When: The `<head>` is inspected
  - Then: `<link rel="icon" type="image/svg+xml" href="assets/icons/favicon.svg">` and `<link rel="icon" type="image/png" href="assets/icons/favicon.png">` are both present (the SVG is the primary, PNG is the fallback)

- **AC3: OG image exists at the correct path and correct dimensions**
  - Given: The OG meta tag references `assets/images/og-image.png`
  - When: The file is checked
  - Then: `assets/images/og-image.png` exists with dimensions 1200x630 pixels (the standard OG image size), styled consistently with the site's dark color palette (`#191414` background, `#1DB954` accent, white text showing Brett's name and title)

- **AC4: Favicon and OG image checklist**
  - [ ] `assets/icons/favicon.svg` exists: 32x32 viewBox, dark background circle/square, "BH" or "B" lettermark in `--color-green` (#1DB954)
  - [ ] `assets/icons/favicon.png` exists as a 32x32 PNG fallback (can be a simple approximation of the SVG)
  - [ ] `assets/images/og-image.png` exists at 1200x630px with site branding
  - [ ] OG image contains at minimum: dark background, Brett's name, and his title "AI/ML Engineer & Agentic AI Specialist"
  - [ ] `<link rel="icon" type="image/svg+xml" href="assets/icons/favicon.svg">` is in `<head>`
  - [ ] `<link rel="icon" type="image/png" href="assets/icons/favicon.png">` is in `<head>` (as a fallback after the SVG link)
  - [ ] All `href` paths are relative (no absolute URLs for favicon links)

#### Technical Context

Favicon SVG template from the project plan:
```html
<link rel="icon" type="image/svg+xml" href="assets/icons/favicon.svg">
<link rel="icon" type="image/png" href="assets/icons/favicon.png">
```

Favicon SVG design approach:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#191414"/>
  <text
    x="16" y="22"
    font-family="Montserrat, system-ui, sans-serif"
    font-size="14"
    font-weight="700"
    fill="#1DB954"
    text-anchor="middle"
  >BH</text>
</svg>
```

OG image can be generated as an SVG and then either:
1. Exported to PNG using an SVG-to-PNG converter
2. Created as a styled SVG (saved as `.svg`) and referenced — note that some social platforms only accept PNG/JPEG for OG images, so PNG is strongly preferred

OG image design guidelines:
- Dimensions: 1200x630px
- Background: `#191414`
- Left section: Brett's name in Montserrat Bold (~60px), title in Inter (~28px, `#B3B3B3`)
- Right section or bottom: green accent bar or geometric element using `#1DB954`
- The og-image.png should be designed as a flat static image (no animation)

Note: If automated image generation is not possible in the current tooling environment, an SVG placeholder that clearly communicates the intended design is acceptable, accompanied by a code comment explaining that it should be exported to PNG before deployment.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 4-5: Accessibility Audit and Remediation

**Phase:** Polish, SEO, and Nice-to-Haves
**Priority:** P1
**Dependencies:** Task 3-6, Task 4-1, Task 4-2
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want to navigate Brett's portfolio entirely by keyboard and with a screen reader so that the site is usable regardless of my abilities or assistive technology.

#### Acceptance Criteria

- **AC1: All interactive elements are reachable and operable by keyboard**
  - Given: The user navigates the page using only the Tab key
  - When: The user tabs through all focusable elements
  - Then: Every link, button, and focusable element receives focus in a logical order; no interactive elements are skipped or unreachable

- **AC2: Focus indicators are visible and styled**
  - Given: A keyboard user tabs through the page
  - When: Any focusable element receives focus
  - Then: A green outline (`2px solid #1DB954`) is visible around the focused element; mouse users do not see the outline (`:focus-visible` is used, not `:focus`)

- **AC3: All images have appropriate alt text**
  - Given: The page is loaded with all project images (including placeholders)
  - When: Each `<img>` element is inspected
  - Then: Informative images have descriptive `alt` text (e.g., "Local LLM App screenshot"); decorative images or elements have `alt=""` or `aria-hidden="true"`

- **AC4: Color contrast meets WCAG AA for all text**
  - Given: The page is rendered with its dark theme
  - When: Contrast ratios are measured (using browser DevTools or an accessibility checker)
  - Then: Normal text (`--color-text-secondary: #B3B3B3` on `--color-bg-primary: #191414`) has a contrast ratio >= 4.5:1; large text and UI components have a ratio >= 3:1

- **AC5: Skip-to-content link functions correctly**
  - Given: A keyboard user visits the page
  - When: The user presses Tab as the first action and then Enter
  - Then: Focus moves to `<main id="main-content">` and the visible content area is displayed without the fixed nav blocking it

- **AC6: Screen reader heading hierarchy is correct**
  - Given: The full page HTML is analyzed
  - When: Headings are listed in order
  - Then: There is exactly one `<h1>` (Brett's name in the hero), `<h2>` elements are section titles, `<h3>` elements are subsection titles (job titles, project titles, skill categories); no heading levels are skipped

- **AC7: Accessibility implementation checklist**
  - [ ] `:focus-visible` styles defined in `css/variables.css` or `css/reset.css`:
    ```css
    :focus-visible {
      outline: 2px solid var(--color-green);
      outline-offset: 2px;
    }
    :focus:not(:focus-visible) {
      outline: none;
    }
    ```
  - [ ] All `<img>` tags have `alt` attributes (descriptive text or empty string)
  - [ ] All icon-only links have `aria-label` on the anchor element
  - [ ] All SVG icons inside links have `aria-hidden="true"` and `focusable="false"`
  - [ ] The skip-to-content link (`.skip-link`) is the first focusable element and visible on focus
  - [ ] `.skip-link` CSS is present: visually hidden by default, revealed on `:focus-visible`
  - [ ] The `<html lang="en">` attribute is present
  - [ ] `<nav aria-label="Main navigation">` is present
  - [ ] The hamburger `<button>` has `aria-expanded` and `aria-label="Toggle navigation"`
  - [ ] No positive `tabindex` values are used (no `tabindex="1"` or higher)
  - [ ] `prefers-reduced-motion` CSS and JS guards are in place (verified from Tasks 3-1 through 3-5)
  - [ ] Touch targets on mobile are at least 44x44px for all interactive elements

#### Technical Context

Focus styles from the project plan:
```css
/* In css/reset.css or css/variables.css */
:focus-visible {
  outline: 2px solid var(--color-green);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}
```

Skip link CSS (the link is always in the DOM but visually hidden until focused):
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-md);
  background-color: var(--color-green);
  color: var(--color-black);
  padding: var(--space-sm) var(--space-md);
  border-radius: 0 0 4px 4px;
  font-weight: 600;
  text-decoration: none;
  z-index: 200;
  transition: top 0.2s ease;
}

.skip-link:focus-visible {
  top: 0;
}
```

Contrast ratio check reference:
- `#B3B3B3` on `#191414`: approximately 5.9:1 (passes AA for normal text)
- `#FFFFFF` on `#191414`: approximately 14.7:1 (passes AAA)
- `#1DB954` on `#191414`: approximately 3.6:1 (passes AA for large text only; ensure green is not used for body text)
- `#727272` on `#191414`: approximately 2.9:1 (fails AA — do NOT use `--color-text-muted` for meaningful body text, only for decorative/supporting text)

WCAG AA color contrast thresholds:
- Normal text (< 18pt / < 14pt bold): 4.5:1
- Large text (>= 18pt / >= 14pt bold) and UI components: 3:1

This task is a remediation task — it should review all sections added in Phases 1–3 and fix any issues found. All fixes are modifications to existing files, not new files.

Lighthouse accessibility score target: >= 90 (run Lighthouse in Chrome DevTools).

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 4-6: Final Responsive Polish and Cross-Breakpoint QA

**Phase:** Polish, SEO, and Nice-to-Haves
**Priority:** P1
**Dependencies:** Task 4-5
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want the site to look correct and feel well-proportioned on every screen size — from the smallest phone to a large desktop monitor — so that my experience is excellent regardless of my device.

#### Acceptance Criteria

- **AC1: No horizontal scroll on any viewport from 320px to 1440px**
  - Given: The fully built site
  - When: The viewport is set to any width between 320px and 1440px
  - Then: No horizontal scrollbar appears; `document.body.scrollWidth` equals `window.innerWidth`

- **AC2: All text is readable at every breakpoint (no truncation or overflow)**
  - Given: The page is rendered at 320px viewport width (smallest supported)
  - When: Every section is inspected
  - Then: No text is cut off, overlapping another element, or overflowing its container

- **AC3: Touch targets are at least 44x44px on mobile**
  - Given: The page is rendered at a mobile viewport (< 576px)
  - When: All interactive elements (nav links, buttons, social icons) are measured
  - Then: Each has a clickable/tappable area of at least 44x44px (this may require padding adjustments)

- **AC4: Landscape orientation on mobile renders correctly**
  - Given: A mobile device is rotated to landscape orientation (e.g., 667px wide, 375px tall)
  - When: The page is rendered
  - Then: The hero section is legible without requiring horizontal scroll; the nav bar remains functional

- **AC5: Responsive polish checklist**
  - [ ] Test at 320px — smallest supported width (iPhone SE)
  - [ ] Test at 375px — iPhone standard
  - [ ] Test at 576px — large phone / small tablet
  - [ ] Test at 768px — tablet portrait
  - [ ] Test at 1024px — small laptop
  - [ ] Test at 1280px — desktop
  - [ ] Test at 1440px — large desktop
  - [ ] `css/responsive.css` contains any final overflow fixes identified during QA
  - [ ] All section padding looks proportional at each breakpoint (not too tight on mobile, not too sparse on desktop)
  - [ ] Images (project placeholders) scale correctly with `max-width: 100%`
  - [ ] The timeline section (experience) renders legibly on mobile with no overflow
  - [ ] The skills grid wraps correctly without breaking layout on very narrow viewports

#### Technical Context

Key responsive rules already defined in earlier tasks. This task is a QA-and-fix task — it requires opening the site in browser DevTools and using the device emulation tool to test at all listed widths, documenting any issues found, and adding CSS fixes to `css/responsive.css`.

Common fixes to check for:
- Long words or URLs breaking layout (`word-break: break-word` or `overflow-wrap: break-word`)
- Flex/grid children overflowing their containers (`min-width: 0` on flex children)
- Fixed-size elements that don't adapt on small screens
- Font sizes that are too large on narrow viewports (use `clamp()` where needed)

Print stylesheet (optional — low priority, skip if time is limited):
```css
@media print {
  .site-header,
  .scroll-progress,
  .hero-decorative,
  .nav-toggle {
    display: none !important;
  }
  a[href]::after {
    content: ' (' attr(href) ')';
    font-size: 0.8em;
    color: #333;
  }
}
```

If implementing the print stylesheet, add it to the bottom of `css/responsive.css`.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 4-7: Performance Optimization Pass

**Phase:** Polish, SEO, and Nice-to-Haves
**Priority:** P1
**Dependencies:** Task 3-6, Task 4-4
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want the portfolio to load fast even on a slow mobile connection so that I don't abandon the page before seeing Brett's work.

#### Acceptance Criteria

- **AC1: All images below the fold have `loading="lazy"` and `decoding="async"`**
  - Given: The fully built page HTML is inspected
  - When: All `<img>` elements are examined
  - Then: Every `<img>` that is NOT in the hero section has both `loading="lazy"` and `decoding="async"` attributes; hero images (if any) do not use `loading="lazy"` to avoid render-blocking

- **AC2: Lighthouse performance score is >= 85 on mobile**
  - Given: The site is served (locally or on GitHub Pages)
  - When: A Lighthouse audit is run in Chrome DevTools on mobile preset
  - Then: The Performance score is 85 or higher

- **AC3: Total page weight (excluding images) is under 500KB**
  - Given: The page is loaded with browser DevTools Network panel open
  - When: All resources have loaded (no pending requests)
  - Then: The total transfer size of HTML + CSS + JS files (excluding image assets) is under 500KB

- **AC4: Google Fonts use `display=swap` to prevent FOIT**
  - Given: The Google Fonts `<link>` tag in `<head>` is inspected
  - When: The URL parameters are read
  - Then: `&display=swap` is present in the font URL (already set from Task 1-1 — this is a verification step)

- **AC5: Performance checklist**
  - [ ] `loading="lazy"` on all `<img>` tags below the fold (project card images, about section image placeholder)
  - [ ] `decoding="async"` on all `<img>` tags
  - [ ] `<meta name="theme-color" content="#191414">` is present in `<head>` (added in Task 4-3)
  - [ ] Manual CSS review: no obvious unused selectors (spot-check sections that have not been activated, such as testimonials and education)
  - [ ] All JS files together are under 20KB unminified (verify in Network panel)
  - [ ] No render-blocking resources other than `styles.css` and the Google Fonts `<link>` (which uses `display=swap` to mitigate FOIT)
  - [ ] `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` are in `<head>` (already present from Task 1-1 — verify)

#### Technical Context

Key performance targets from the project plan:
- First Contentful Paint (FCP): < 1.5s on 3G throttling (Lighthouse mobile preset)
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Total page weight (excluding images): < 500KB
- Total JS (unminified): < 20KB

This is primarily a verification and minor-fix task. Run Lighthouse in Chrome DevTools (Lighthouse tab, Mobile preset) and document the score. If the score is below 85, identify and fix the specific failing audits.

Common causes of low Lighthouse performance scores for a static site:
- Render-blocking CSS (the `@import` chain in `styles.css` can cause this — if score is low, consider inlining critical CSS or manually concatenating into a single file)
- Missing `width` and `height` attributes on `<img>` tags (causes CLS if images load after initial paint) — add `width` and `height` to the placeholder `<img>` elements
- Fonts not preloaded (the `preconnect` hints help but a `<link rel="preload">` for the font CSS might be needed)

If changes are needed to pass the performance score threshold, document the specific changes made in a comment within `css/responsive.css` or the relevant file.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 4-8: Create the 404 Error Page

**Phase:** Polish, SEO, and Nice-to-Haves
**Priority:** P2
**Dependencies:** Task 1-2, Task 2-1
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want a styled, on-brand 404 page when I navigate to a URL that does not exist on Brett's portfolio so that I am not left with a confusing default GitHub Pages error page.

#### Acceptance Criteria

- **AC1: `404.html` exists at the repo root and is served by GitHub Pages for missing URLs**
  - Given: A user navigates to any non-existent URL under the GitHub Pages domain
  - When: GitHub Pages returns a 404 response
  - Then: GitHub Pages serves `404.html` from the repo root (GitHub Pages automatically serves `404.html` at the root for 404 errors)

- **AC2: 404 page uses the site's styles and color palette**
  - Given: The 404 page is loaded
  - When: The page renders
  - Then: The dark background (`#191414`), green accent (`#1DB954`), and white text are applied via `styles.css`; the page does not look like a default browser or GitHub error page

- **AC3: 404 page has a working link back to the portfolio**
  - Given: The 404 page is loaded
  - When: The user clicks "Back to Portfolio"
  - Then: The user is redirected to `index.html` (the main portfolio page)

- **AC4: 404 page checklist**
  - [ ] `404.html` exists at the repo root (same level as `index.html`)
  - [ ] `<link rel="stylesheet" href="styles.css">` is present (uses the same `styles.css` as the main site)
  - [ ] `<title>Page Not Found — Brett Hardiman</title>` is set
  - [ ] `<h1>404</h1>` is present in large display type
  - [ ] A brief explanatory message is present (e.g., "This page does not exist.")
  - [ ] A `<a href="index.html" class="btn btn--primary">Back to Portfolio</a>` link is present
  - [ ] The page uses the `.error-page` class for main content layout
  - [ ] The 404 page is centered vertically and horizontally on the viewport (`min-height: 100vh; display: flex; align-items: center; justify-content: center;`)
  - [ ] `<html lang="en">` and all required meta tags are present
  - [ ] The page passes W3C HTML validation

#### Technical Context

Full 404 page HTML from the project plan:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found — Brett Hardiman</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Montserrat:wght@600;700;800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="error-page">
    <div class="error-page-content">
      <h1 class="error-code">404</h1>
      <p class="error-message">This page does not exist.</p>
      <a href="index.html" class="btn btn--primary">Back to Portfolio</a>
    </div>
  </main>
</body>
</html>
```

CSS for the error page (add to `css/layout.css` or create a small block at the end of `styles.css`):
```css
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-xl);
}

.error-code {
  font-size: var(--font-size-5xl);
  font-weight: 800;
  color: var(--color-green);
  line-height: 1;
  margin-bottom: var(--space-md);
}

.error-message {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2xl);
}
```

Note: GitHub Pages automatically serves `404.html` from the root of the repository for any URL that does not match an existing file. No additional configuration is required.

The favicon links (from Task 4-4) should also be added to the 404 page `<head>` for visual consistency.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review
