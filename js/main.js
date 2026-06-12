// main.js — Entry point for the portfolio (loaded by portfolio.html).
// The gallery shell is a SEPARATE page (index.html) that loads
// js/gallery.js standalone and iframes this portfolio inside its frame.

import { initScrollProgress } from './scroll-progress.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initParallax } from './parallax.js';
import { initNav } from './nav.js';
import { initProjectCards } from './projects.js';
import { init as initNeuralMesh } from './neural-mesh.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initScrollReveal();
  initParallax();
  initNav();
  initProjectCards();
  initNeuralMesh();
});
