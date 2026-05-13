function toggleNav(){
  const mobileNav = document.getElementById('mobileNav');
  if(mobileNav) mobileNav.classList.toggle('open');
}

window.addEventListener('DOMContentLoaded', ()=>{
  const hamburger = document.getElementById('hamburger');
  if(hamburger){
    hamburger.addEventListener('click', toggleNav);
    hamburger.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggleNav();
      }
    });
  }

  // Mark notification as read
  const buttons = document.querySelectorAll('.btn-mark-read');
  buttons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
      const item = btn.closest('.notification-item');
      if(item){
        item.classList.add('read');
      }

      btn.disabled = true;
      btn.textContent = 'Read';
    });
  });
});


