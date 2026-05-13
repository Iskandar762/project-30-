function toggleNav(){
  const mobileNav = document.getElementById('mobileNav');
  if(mobileNav) mobileNav.classList.toggle('open');
}

function loadProfile(){
  const storedName = localStorage.getItem('beachguardUserName');
  const storedEmail = localStorage.getItem('beachguardUserEmail');
  const storedPhone = localStorage.getItem('beachguardPhone');
  const storedVessel = localStorage.getItem('beachguardVessel');
  const storedHomePort = localStorage.getItem('beachguardHomePort');
  const storedExperience = localStorage.getItem('beachguardExperience');

  if(storedName){
    const avatar = storedName.split(' ').map(part => part[0]).join('').slice(0,2).toUpperCase();
    document.querySelector('.profile-name').textContent = storedName;
    const avatarEl = document.querySelector('.profile-avatar');
    if(avatarEl) avatarEl.textContent = avatar;
    const nameInput = document.getElementById('name');
    if(nameInput) nameInput.value = storedName;
  }
  if(storedEmail){
    const emailEl = document.querySelector('.profile-email');
    if(emailEl) emailEl.textContent = storedEmail;
    const emailInput = document.getElementById('email');
    if(emailInput) emailInput.value = storedEmail;
  }
  if(storedPhone){
    const phoneInput = document.getElementById('phone');
    if(phoneInput) phoneInput.value = storedPhone;
  }
  if(storedVessel){
    const vesselInput = document.getElementById('vessel');
    if(vesselInput) vesselInput.value = storedVessel;
  }
  if(storedHomePort){
    const homePortInput = document.getElementById('home-port');
    if(homePortInput) homePortInput.value = storedHomePort;
  }
  if(storedExperience){
    const expInput = document.getElementById('experience');
    if(expInput) expInput.value = storedExperience;
  }
}

function handleSave(event){
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const vessel = document.getElementById('vessel').value;
  const homePort = document.getElementById('home-port').value;
  const experience = document.getElementById('experience').value;

  localStorage.setItem('beachguardUserName', name);
  localStorage.setItem('beachguardUserEmail', email);
  localStorage.setItem('beachguardPhone', phone);
  localStorage.setItem('beachguardVessel', vessel);
  localStorage.setItem('beachguardHomePort', homePort);
  localStorage.setItem('beachguardExperience', experience);

  document.querySelector('.profile-name').textContent = name || 'Your Name';
  document.querySelector('.profile-email').textContent = email || 'your.email@example.com';
  document.querySelector('.profile-avatar').textContent = name
    ? name.split(' ').map(part => part[0]).join('').slice(0,2).toUpperCase()
    : 'JD';

  const saveButton = document.getElementById('saveButton');
  if(saveButton){
    saveButton.textContent = 'Saved';
    saveButton.disabled = true;
    setTimeout(() => {
      saveButton.textContent = 'Save Changes';
      saveButton.disabled = false;
    }, 2000);
  }
}

function deleteAccount(){
  if(confirm('Are you sure you want to delete your account? This action cannot be undone.')){
    alert('Account deletion would be processed here');
  }
}

window.addEventListener('DOMContentLoaded', () => {
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

  const form = document.querySelector('.profile-form');
  if(form){
    form.addEventListener('submit', handleSave);
  }

  const deleteBtn = document.querySelector('button.btn-danger');
  if(deleteBtn){
    deleteBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      deleteAccount();
    });
  }

  loadProfile();
});

