(function(){
  'use strict';

  // This page uses inline onClick: toggleNav() and syncDevice()
  window.toggleNav = function toggleNav(){
    const el = document.getElementById('mobileNav');
    if(el) el.classList.toggle('open');
  };

  window.syncDevice = function syncDevice(){
    const status = document.getElementById('status');
    if(!status) return;

    status.textContent = 'Syncing...';
    setTimeout(() => {
      status.textContent = 'Device synced successfully!';
      status.style.color = 'var(--success)';
    }, 2000);
  };
})();

