function toggleNav(){
  const mobileNav = document.getElementById('mobileNav');
  if(mobileNav) mobileNav.classList.toggle('open');
}

window.addEventListener('DOMContentLoaded', ()=>{
  const hamburger = document.getElementById('hamburger');
  if(!hamburger) return;

  hamburger.addEventListener('click', toggleNav);
  hamburger.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      toggleNav();
    }
  });
});

