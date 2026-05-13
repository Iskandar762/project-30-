function toggleNav(){
  document.getElementById('mobileNav').classList.toggle('open');
}

function loadContactData(){
  const savedName = localStorage.getItem('beachguardContactName');
  const savedEmail = localStorage.getItem('beachguardContactEmail');
  const savedSubject = localStorage.getItem('beachguardContactSubject');
  const savedMessage = localStorage.getItem('beachguardContactMessage');

  if(savedName){
    document.getElementById('name').value = savedName;
  }
  if(savedEmail){
    document.getElementById('email').value = savedEmail;
  }
  if(savedSubject){
    document.getElementById('subject').value = savedSubject;
  }
  if(savedMessage){
    document.getElementById('message').value = savedMessage;
  }
}

function handleContactSubmit(event){
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Store contact data
  localStorage.setItem('beachguardContactName', name);
  localStorage.setItem('beachguardContactEmail', email);
  localStorage.setItem('beachguardContactSubject', subject);
  localStorage.setItem('beachguardContactMessage', message);

  // Store in contact history
  const contactHistory = JSON.parse(localStorage.getItem('beachguardContactHistory') || '[]');
  contactHistory.push({
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('beachguardContactHistory', JSON.stringify(contactHistory));

  const submitButton = document.querySelector('.btn-submit');
  submitButton.textContent = 'Message Sent';
  submitButton.disabled = true;
  setTimeout(() => {
    submitButton.textContent = 'Send Message';
    submitButton.disabled = false;
  }, 2000);
}

window.addEventListener('DOMContentLoaded', () => {
  loadContactData();
});