// main.js — Entry point. Imports and initializes all feature modules.

import { initGallery } from './gallery.js';
import { initScrollProgress } from './scroll-progress.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initParallax } from './parallax.js';
import { initNav } from './nav.js';
import { initProjectCards } from './projects.js';
import { init as initNeuralMesh } from './neural-mesh.js';

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initScrollProgress();
  initScrollReveal();
  initParallax();
  initNav();
  initProjectCards();
  initNeuralMesh();
});
