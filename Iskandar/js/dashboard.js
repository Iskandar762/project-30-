function loadGreeting(){
  const name = localStorage.getItem('beachguardUserDisplay') || 'Captain';
  document.getElementById('dashboardGreeting').textContent = `Welcome back, ${name}`;
}
window.addEventListener('DOMContentLoaded', loadGreeting);