# Project Conventions

## Agent Team Structure
This project is built by an AI agent team. All agents follow these shared conventions.

## File Structure
- `docs/project-plan.md` — Source of truth for architecture and phasing (IT Solution Architect)
- `docs/backlog/` — Work items organized by phase (Requirements Agent)
- `docs/backlog/index.md` — Master task index with statuses
- `docs/reviews/` — Code review findings
- `docs/security-reviews/` — Security review findings
- `docs/task-log.md` — Running log of all task state transitions (Project Manager)
- `README.md` — Non-technical project summary (Project Summary Agent)

## Code Conventions
<!-- The IT Solution Architect will populate these during the architecture phase -->
- Language: HTML, CSS, JavaScript
- Framework: None (vanilla — static site)
- Naming: camelCase for JS variables/functions, kebab-case for CSS classes and file names
- File naming: kebab-case (e.g., `hero-section.css`, `contact-form.js`)
- Error handling pattern: Graceful degradation — site must work without JS enabled
- Test framework: Manual verification against acceptance criteria
- Linting: Standard HTML validation, CSS validation

## Environment Variables
- All secrets, keys, tokens, and environment-specific values MUST use environment variables.
- Document all required env vars in `.env.example` with placeholder values.
- NEVER hardcode `localhost`, `127.0.0.1`, or environment-specific URLs.
- All URLs must be relative paths or configurable via environment/config.

## Git Conventions
- Branch naming: `feature/[TASK-ID]-[short-description]`
- Commit format: `feat([scope]): [description] — [TASK-ID]`
- No direct pushes to main/master.

## Review Standards
- All code must pass Code Review (AC verification + convention compliance)
- All code must pass Security Review (no secrets, no hardcoded env values, no vulnerabilities)
- Review findings are documented in markdown in `docs/reviews/` and `docs/security-reviews/`

## Deployment
- Target: GitHub Pages (static hosting)
- All paths must be relative (no absolute URLs)
- No server-side processing — everything runs client-side
