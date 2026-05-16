// neural-mesh.js — Animated neural network mesh for the hero background

/**
 * Initializes the neural network mesh canvas inside the hero section.
 * Draws floating green nodes connected by short-range lines that pulse,
 * drift, and gently repel from the user's cursor.
 *
 * Honors prefers-reduced-motion by rendering a single static frame.
 * Silently no-ops if the canvas element is missing.
 */
export function init() {
  const canvas = document.getElementById('mesh-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height, nodes, dpr;
  const mouse = { x: -1000, y: -1000 };

  const CONFIG = {
    nodeCount: 80,
    connectionDist: 160,
    nodeSpeed: 0.3,
    mouseRadius: 200,
    mouseForce: 0.04,
    nodeMinRadius: 1.5,
    nodeMaxRadius: 3.5,
    pulseSpeed: 0.008,
    color: { r: 29, g: 185, b: 84 },
  };

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const hero = canvas.parentElement;
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createNodes() {
    nodes = [];
    for (let i = 0; i < CONFIG.nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * CONFIG.nodeSpeed,
        vy: (Math.random() - 0.5) * CONFIG.nodeSpeed,
        radius: CONFIG.nodeMinRadius + Math.random() * (CONFIG.nodeMaxRadius - CONFIG.nodeMinRadius),
        phase: Math.random() * Math.PI * 2,
        brightness: 0.3 + Math.random() * 0.4,
      });
    }
  }

  function update() {
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;
      node.phase += CONFIG.pulseSpeed;

      const dx = node.x - mouse.x;
      const dy = node.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONFIG.mouseRadius && dist > 0) {
        const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseForce;
        node.vx += (dx / dist) * force;
        node.vy += (dy / dist) * force;
      }

      node.vx *= 0.998;
      node.vy *= 0.998;

      if (node.x < -50) node.x = width + 50;
      if (node.x > width + 50) node.x = -50;
      if (node.y < -50) node.y = height + 50;
      if (node.y > height + 50) node.y = -50;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const { r, g, b } = CONFIG.color;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.connectionDist) {
          const alpha = (1 - dist / CONFIG.connectionDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    for (const node of nodes) {
      const pulse = 0.7 + 0.3 * Math.sin(node.phase);
      const alpha = node.brightness * pulse;
      const rad = node.radius * (0.8 + 0.2 * pulse);

      ctx.beginPath();
      ctx.arc(node.x, node.y, rad * 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.06})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, rad, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
    }
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    resize();
    createNodes();
    draw();
    return;
  }

  window.addEventListener('resize', () => {
    resize();
  });

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - rect.left;
    mouse.y = e.touches[0].clientY - rect.top;
  });

  window.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  resize();
  createNodes();
  animate();
}
