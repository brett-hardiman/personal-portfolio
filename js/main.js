// main.js — Main entry point for Brett Hardiman Personal Portfolio
// Full implementation: Task 3-6 (integration and verification)

import { initScrollProgress } from './scroll-progress.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initParallax } from './parallax.js';
import { initNav } from './nav.js';
import { initProjectCards } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initScrollReveal();
  initParallax();
  initNav();
  initProjectCards();
});
