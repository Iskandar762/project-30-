(function(){
  'use strict';
  // About page needs only nav toggle, which is inlined currently.
  // Keep minimal: provide toggleNav for inline onclick.
  window.toggleNav = function toggleNav(){
    const el = document.getElementById('mobileNav');
    if(el) el.classList.toggle('open');
  };
})();

