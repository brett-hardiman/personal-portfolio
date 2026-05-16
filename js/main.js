// main.js — Entry point. Imports and initializes all feature modules.

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
