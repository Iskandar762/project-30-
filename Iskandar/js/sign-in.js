window.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const rememberToggle = document.getElementById('rememberEmail');

  if (emailInput) {
    const savedEmail = localStorage.getItem('beachguardRememberedEmail');
    if (savedEmail) {
      emailInput.value = savedEmail;
      if (rememberToggle) rememberToggle.checked = true;
    }
  }

  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (event) => handleSignIn(event));
  }

  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      toggleNav();
    });
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNav();
      }
    });
  }
});

function toggleNav() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) mobileNav.classList.toggle('open');
}

function handleSignIn(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const rememberToggle = document.getElementById('rememberEmail');

  const email = emailInput ? emailInput.value.trim() : '';
  const remember = !!(rememberToggle && rememberToggle.checked);

  if (remember && email) {
    localStorage.setItem('beachguardRememberedEmail', email);
  } else {
    localStorage.removeItem('beachguardRememberedEmail');
  }

  let displayName = 'Captain';
  const storedEmail = localStorage.getItem('beachguardUserEmail');
  const storedName = localStorage.getItem('beachguardUserName');

  if (storedEmail && storedName && storedEmail.toLowerCase() === email.toLowerCase()) {
    displayName = storedName;
  } else if (email) {
    displayName = email.split('@')[0];
    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  }

  localStorage.setItem('beachguardUserDisplay', displayName);
  window.location.href = 'dashboard.html';
}

