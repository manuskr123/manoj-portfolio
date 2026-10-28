/* ==========================================
   MANOJ X STUDIO — 3D Tilt & Animation Engine
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile Menu Toggle & Active Links
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });
  }

  const currentLocation = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    const itemPath = item.getAttribute('href');
    if (currentLocation.includes(itemPath) && itemPath !== 'index.html') {
      item.classList.add('active');
    } else if ((currentLocation.endsWith('/') || currentLocation.includes('index.html')) && itemPath === 'index.html') {
      item.classList.add('active');
    }
  });

  // 2. Advanced 3D Tilt Effect & Light Sheen Tracking on Cards
  const tiltCards = document.querySelectorAll('div[style*="background-color: var(--surface)"], .cinematic-card, .timeline-content');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate mouse position for light sheen
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Calculate 3D tilt rotation
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = (x - xc) / (xc / 12); // Tilt intensity
      const dy = (y - yc) / (yc / 12);

      card.style.transform = `perspective(1000px) rotateX(${-dy}deg) rotateY(${dx}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
    });
  });

  // 3. Scroll Reveal Intersection Observer
  const sectionsAndCards = document.querySelectorAll('section, .cinematic-card, .timeline-item');
  sectionsAndCards.forEach(el => el.classList.add('reveal-on-scroll'));

  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  sectionsAndCards.forEach(el => scrollObserver.observe(el));

  // 4. Button Ripple Click Effect
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (btn) {
      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;
      const rect = btn.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-effect');

      const existingRipple = btn.querySelector('.ripple-effect');
      if (existingRipple) existingRipple.remove();

      btn.appendChild(circle);
    }
  });

  // 5. Floating Particles Background Canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'bgCanvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 55 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.8 + 0.6,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.45 + 0.15
  }));

  function renderParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(197, 244, 103, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(renderParticles);
  }
  renderParticles();
});