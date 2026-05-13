function toggleNav(){
  const mobileNav = document.getElementById('mobileNav');
  if(mobileNav) mobileNav.classList.toggle('open');
}

function handleRegister(event){
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if(name && email){
    localStorage.setItem('beachguardUserName', name);
    localStorage.setItem('beachguardUserEmail', email);
    window.location.href = 'sign-in.html';
  }
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

  const form = document.getElementById('register-form');
  if(form){
    form.addEventListener('submit', handleRegister);
  }
});

