/* ============================================================
   SCRIPT.JS — NEXUS CYBER-TECH WEBSITE
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── CUSTOM CURSOR ──────────────────────────────────────── */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    const ease = 0.12;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function animateCursor() {
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      if (dot)  dot.style.cssText  = `left:${mx}px;top:${my}px`;
      if (ring) ring.style.cssText = `left:${rx}px;top:${ry}px`;
      requestAnimationFrame(animateCursor);
    })();

    document.addEventListener('mouseleave', () => { if(dot) dot.style.opacity='0'; if(ring) ring.style.opacity='0'; });
    document.addEventListener('mouseenter', () => { if(dot) dot.style.opacity='1'; if(ring) ring.style.opacity='1'; });
  }

  /* ─── NAVBAR SCROLL ──────────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ─── HAMBURGER MENU ──────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => { s.style.transform=''; s.style.opacity=''; });
      }
    });
  }

  /* ─── PARTICLE CANVAS ─────────────────────────────────────── */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles;

    const COLORS = ['rgba(0,212,255,', 'rgba(191,0,255,', 'rgba(0,255,229,', 'rgba(0,128,255,'];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.r  = Math.random() * 1.8 + 0.4;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.life  = 0;
        this.maxLife = Math.random() * 400 + 200;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.life++;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H || this.life > this.maxLife) this.reset();
      }
      draw() {
        const fade = this.life < 60 ? this.life/60 : this.life > this.maxLife-60 ? (this.maxLife-this.life)/60 : 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = this.color + (this.alpha * fade) + ')';
        ctx.fill();
      }
    }

    function initParticles() {
      const count = Math.floor(W * H / 12000);
      particles = Array.from({length: Math.min(count, 120)}, () => new Particle());
    }

    let lineThreshold = 140;
    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < lineThreshold) {
            const alpha = (1 - dist/lineThreshold) * 0.08;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();
    window.addEventListener('resize', () => { resize(); initParticles(); });
  }

  /* ─── TYPING EFFECT ───────────────────────────────────────── */
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const words  = ['Digital Excellence', 'Future Technology', 'Creative Innovation', 'Smart Solutions', 'Premium Experiences'];
    let wi = 0, ci = 0, deleting = false;
    const speed = { type: 80, delete: 45, pause: 1800 };

    function type() {
      const word = words[wi];
      typingEl.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);

      let delay = deleting ? speed.delete : speed.type;
      if (!deleting && ci > word.length) { delay = speed.pause; deleting = true; }
      else if (deleting && ci < 0)       { deleting = false; wi = (wi+1) % words.length; ci = 0; delay = 400; }
      setTimeout(type, delay);
    }
    setTimeout(type, 1500);
  }

  /* ─── AOS (Animate On Scroll) ─────────────────────────────── */
  function initAOS() {
    const items = document.querySelectorAll('[data-aos]');
    const opts  = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };
    const delays = { 0:0, 100:100, 200:200, 300:300, 400:400, 500:500, 600:600, 700:700 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-aos-delay') || 0);
          setTimeout(() => entry.target.classList.add('aos-animate'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, opts);

    items.forEach(item => observer.observe(item));
  }
  initAOS();

  /* ─── STATS COUNTER ───────────────────────────────────────── */
  function animateCounter(el, target, suffix, duration = 1800) {
    const isPercent = suffix === '%';
    const start = Date.now();
    const startVal = 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startVal + (target - startVal) * eased);
      el.textContent = (isPercent ? '' : '') + current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = current + suffix;
    };
    requestAnimationFrame(tick);
  }

  const statNumbers = document.querySelectorAll('[data-count]');
  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => counterObserver.observe(el));
  }

  /* ─── SKILL BARS ──────────────────────────────────────────── */
  const skillBars = document.querySelectorAll('.skill-bar[data-width]');
  if (skillBars.length) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          setTimeout(() => { bar.style.width = width + '%'; }, 200);
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.4 });
    skillBars.forEach(bar => barObserver.observe(bar));
  }

  /* ─── PARALLAX HERO ───────────────────────────────────────── */
  const heroRings = document.querySelectorAll('.hero-bg-ring');
  if (heroRings.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroRings.forEach((ring, i) => {
        ring.style.transform = `translateY(${y * (0.08 + i * 0.04)}px) scale(${1 + i * 0.01})`;
      });
    }, { passive: true });
  }

  /* ─── CARD TILT EFFECT ────────────────────────────────────── */
  document.querySelectorAll('.feature-card, .team-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-6px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── GLITCH TITLE EFFECT (subtle) ───────────────────────── */
  const glitchEls = document.querySelectorAll('.hero-title, .about-title');
  glitchEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.textShadow = '2px 0 rgba(0,212,255,0.5), -2px 0 rgba(191,0,255,0.5)';
      setTimeout(() => { el.style.textShadow = ''; }, 200);
    });
  });

  /* ─── SMOOTH SCROLL LINKS ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ─── ACTIVE NAV LINK ─────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  if (sections.length && navAnchors.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
      });
      navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
      });
    }, { passive: true });
  }

  /* ─── PAGE LOAD PROGRESS BAR ──────────────────────────────── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#00d4ff,#bf00ff);z-index:99998;transition:width 0.3s ease;width:0';
  document.body.prepend(progressBar);
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });

  console.log('%cNEXUS TECH 🚀', 'color:#00d4ff;font-family:monospace;font-size:18px;font-weight:bold;text-shadow:0 0 10px #00d4ff');
  console.log('%cBuilding the future through innovation.', 'color:#bf00ff;font-family:monospace;font-size:12px;');
});