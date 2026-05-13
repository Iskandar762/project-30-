/* Shared JS extracted from inline <script> blocks */
(function(){
  'use strict';

  // Navigation toggle (expects #mobileNav and .hamburger)
  window.toggleNav = function toggleNav(){
    const mobileNav = document.getElementById('mobileNav');
    if(!mobileNav) return;
    mobileNav.classList.toggle('open');

    const hamburger = document.querySelector('.hamburger');
    if(hamburger){
      const isOpen = mobileNav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    }
  };

  // Smooth scrolling for anchor links
  function setupAnchorSmoothScroll(){
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if(targetElement){
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Reveal animation
  function setupReveal(){
    const els = document.querySelectorAll('.reveal');
    if(!els.length) return;

    if('IntersectionObserver' in window){
      try{
        const obs = new IntersectionObserver(entries=>{
          entries.forEach(e=>{
            if(e.isIntersecting){
              e.target.classList.add('visible');
              obs.unobserve(e.target);
            }
          });
        },{threshold:0.12, rootMargin: '50px'});
        els.forEach(el=>obs.observe(el));
      }catch(err){
        console.warn('Reveal animation failed:', err);
        els.forEach(el => el.classList.add('visible'));
      }
    }else{
      els.forEach(el => el.classList.add('visible'));
    }
  }

  // Close mobile nav on outside click / escape
  function setupMobileNavAccessibility(){
    document.addEventListener('click', function(e) {
      const mobileNav = document.getElementById('mobileNav');
      const hamburger = document.querySelector('.hamburger');
      if(mobileNav && hamburger && !hamburger.contains(e.target) && !mobileNav.contains(e.target)){
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function(e) {
      if(e.key === 'Escape'){
        const mobileNav = document.getElementById('mobileNav');
        const hamburger = document.querySelector('.hamburger');
        if(mobileNav && mobileNav.classList.contains('open')){
          mobileNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger && hamburger.focus && hamburger.focus();
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    setupAnchorSmoothScroll();
    setupReveal();
    setupMobileNavAccessibility();
  });
})();

