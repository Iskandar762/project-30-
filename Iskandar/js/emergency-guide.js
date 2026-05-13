// Emergency Guide page JS

(function () {
  'use strict';

  window.toggleNav = function toggleNav() {
    const mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) return;
    mobileNav.classList.toggle('open');
  };
})();

