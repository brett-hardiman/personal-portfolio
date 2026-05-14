# Phase 7: GitHub Pages Deployment

---

### Task 7-1: Security audit — verify no hardcoded URLs in CSS/JS

**Phase:** GitHub Pages Deployment
**Priority:** P0
**Dependencies:** Task 6-3
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to grep all CSS and JS files for hardcoded absolute URLs, localhost references, and IP addresses so that the Security Review Agent can confirm the site is clean before deployment.

#### Acceptance Criteria

- **AC1: No hardcoded localhost or IPs in CSS or JS**
  - Given: All CSS and JS files are complete
  - When: The files are grepped for `localhost`, `127.0.0.1`, `0.0.0.0`
  - Then: Zero matches found in any `assets/css/` or `assets/js/` file

- **AC2: No hardcoded absolute URLs in CSS or JS**
  - Given: All CSS and JS files are complete
  - When: The files are grepped for `http://` or `https://`
  - Then: Zero matches found in any `assets/css/` or `assets/js/` file (URLs belong in HTML `href`/`src` attributes only)

- **AC3: No secrets or tokens**
  - [ ] Grep all files for patterns: `api_key`, `apikey`, `token`, `secret`, `password`, `Bearer`
  - [ ] Zero matches found in any tracked file
  - [ ] `.gitignore` contains `.env` and `.env.*` entries

- **AC4: All asset paths are relative**
  - [ ] Every `<link href="...">` in `index.html` uses a relative path starting with `assets/` (not `/assets/`)
  - [ ] Every `<script src="...">` in `index.html` uses a relative path starting with `assets/`
  - [ ] No paths start with `/` (which would break GitHub Pages subdirectory hosting)

#### Technical Context

Run these audit commands and report results — all must return zero matches:

```bash
# Localhost/IP check (CSS and JS)
grep -r "localhost\|127\.0\.0\.1\|0\.0\.0\.0" assets/

# Absolute URL check in CSS and JS (not HTML)
grep -r "http://" assets/
grep -r "https://" assets/

# Secret patterns
grep -ri "api_key\|apikey\|token\|secret\|password\|Bearer" assets/ index.html

# Absolute path check in HTML
grep "href=\"/" index.html
grep "src=\"/" index.html
```

Document findings in `docs/security-reviews/phase-7-security-review.md` using this format:
```markdown
# Security Review — Phase 7

**Date:** [date]
**Reviewer:** Security Review Agent
**Status:** PASS / FAIL

## Checks

| Check | Command | Result |
|---|---|---|
| Localhost/IP | grep localhost assets/ | 0 matches ✓ |
| Absolute URLs in CSS/JS | grep https:// assets/ | 0 matches ✓ |
| Secret patterns | grep -ri api_key ... | 0 matches ✓ |
| Absolute HTML paths | grep href="/" index.html | 0 matches ✓ |

## Findings

[List any failures with file:line references]

## Resolution

[Steps taken to fix findings, or "No issues found"]
```

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] `docs/security-reviews/phase-7-security-review.md` written with PASS status
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 7-2: Add deployment meta tags (SEO + Open Graph)

**Phase:** GitHub Pages Deployment
**Priority:** P0
**Dependencies:** Task 1-1
**Status:** BACKLOG

#### Value Statement

As the **end user**, I want the portfolio to have correct meta tags so that when Brett shares the URL on LinkedIn, the link preview card shows his name, a description, and the correct URL — not a blank card.

#### Acceptance Criteria

- **AC1: Open Graph tags present and correct**
  - Given: The deployed page URL is inspected with a link preview tool (e.g., LinkedIn post inspector)
  - When: The OG tags are read
  - Then: The preview card shows title, description, and URL — no missing fields

- **AC2: All required meta tags present**
  - [ ] `<meta name="description" content="Brett Hardiman — AI Product Owner. Personal portfolio built by an 8-agent Claude Code pipeline. Showcasing RAG LLM app, agentic AI workflows, and hands-on AI product leadership.">`
  - [ ] `<meta property="og:title" content="Brett Hardiman — AI Product Owner">`
  - [ ] `<meta property="og:description" content="Personal portfolio built by an 8-agent Claude Code pipeline. Showcasing RAG, agentic AI, and hands-on product leadership.">`
  - [ ] `<meta property="og:url" content="https://brett-hardiman.github.io/personal-portfolio/">` (or custom domain if applicable)
  - [ ] `<meta property="og:type" content="website">`
  - [ ] `<meta name="twitter:card" content="summary">`
  - [ ] `<meta name="twitter:title" content="Brett Hardiman — AI Product Owner">`
  - [ ] `<meta name="twitter:description" content="Personal portfolio built by an 8-agent Claude Code pipeline.">`
  - [ ] All meta tags placed in `<head>` before closing `</head>`

#### Technical Context

File to edit: `index.html` — add meta tags to `<head>`

The GitHub Pages URL for this repo will be: `https://brett-hardiman.github.io/personal-portfolio/`

Note: The `og:url` value is an `href` attribute value in an HTML meta tag — this is the one acceptable use of an absolute URL in the project. It does NOT go in any CSS or JS file.

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review

---

### Task 7-3: Final deployment verification

**Phase:** GitHub Pages Deployment
**Priority:** P0
**Dependencies:** Tasks 7-1, 7-2
**Status:** BACKLOG

#### Value Statement

As the **Coding Agent**, I want to verify all deployment prerequisites are in place so that the site deploys to GitHub Pages correctly on the first attempt with no broken assets or links.

#### Acceptance Criteria

- **AC1: `index.html` is at repo root**
  - Given: The repo root is listed
  - When: Files are inspected
  - Then: `index.html` exists at the root level (not inside a `src/` or `public/` subdirectory)

- **AC2: All relative paths resolve correctly**
  - Given: `index.html` is opened directly from the filesystem (via `file://` protocol) and from a local server
  - When: The page loads
  - Then: All CSS loads (no 404s in console), all JS loads, all fonts load

- **AC3: Site works without JavaScript**
  - Given: JavaScript is disabled in the browser
  - When: The page is loaded
  - Then: All content (nav, hero text, about, projects, pipeline narrative, skills, contact) is fully readable — only animations and diagram responsiveness are non-functional

- **AC4: Deployment checklist**
  - [ ] `index.html` at repo root ✓
  - [ ] All CSS files in `assets/css/` ✓
  - [ ] All JS files in `assets/js/` ✓
  - [ ] No `_config.yml` (not needed — GitHub Pages serves static files directly) ✓
  - [ ] `.gitignore` does not exclude any required asset files ✓
  - [ ] All files committed and pushed to `master` branch ✓
  - [ ] GitHub Pages enabled in repo Settings → Pages → Source: `master` branch, `/ (root)` ✓
  - [ ] Deployed URL loads without 404 ✓
  - [ ] Browser console error-free on deployed URL ✓
  - [ ] LinkedIn link preview test: paste deployed URL into LinkedIn post draft and verify OG card renders ✓

#### Technical Context

GitHub Pages setup (manual step for Brett — document instructions in PR description):
1. Go to `https://github.com/brett-hardiman/personal-portfolio/settings/pages`
2. Under "Source", select `Deploy from a branch`
3. Branch: `master`, Folder: `/ (root)`
4. Click Save
5. Wait ~2 minutes, then visit `https://brett-hardiman.github.io/personal-portfolio/`

Note: GitHub Pages deployment is triggered by pushing to `master`. The CI/CD Integration Agent handles the PR merge; Brett enables GitHub Pages in settings manually (one-time setup).

#### Definition of Done

- [ ] All acceptance criteria met
- [ ] Deployment instructions documented in PR description or `README.md`
- [ ] Code follows project conventions defined in CLAUDE.md
- [ ] No hardcoded secrets, keys, tokens, or localhost references
- [ ] Ready for code review
