(function(){
  'use strict';

  function loadAlertSettings(){
    const savedLocation = localStorage.getItem('beachguardAlertLocation');
    const savedFrequency = localStorage.getItem('beachguardAlertFrequency');
    const savedAlertTypes = JSON.parse(localStorage.getItem('beachguardAlertTypes') || '[]');

    if(savedLocation){
      const el = document.getElementById('location');
      if(el) el.value = savedLocation;
    }
    if(savedFrequency){
      const el = document.getElementById('frequency');
      if(el) el.value = savedFrequency;
    }

    if(savedAlertTypes && savedAlertTypes.length > 0){
      document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => { cb.checked = false; });
      savedAlertTypes.forEach(type => {
        const checkbox = document.getElementById(type);
        if(checkbox) checkbox.checked = true;
      });
    }
  }

  function handleSaveAlerts(event){
    event.preventDefault();

    const locationEl = document.getElementById('location');
    const frequencyEl = document.getElementById('frequency');

    const location = locationEl ? locationEl.value.trim() : '';
    const frequency = frequencyEl ? frequencyEl.value : '';

    const alertTypes = Array.from(
      document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked')
    ).map(cb => cb.id);

    localStorage.setItem('beachguardAlertLocation', location);
    localStorage.setItem('beachguardAlertFrequency', frequency);
    localStorage.setItem('beachguardAlertTypes', JSON.stringify(alertTypes));

    const saveButton = document.querySelector('.btn-save');
    if(saveButton){
      saveButton.textContent = 'Saved';
      saveButton.disabled = true;
      setTimeout(() => {
        saveButton.textContent = 'Save Alert Settings';
        saveButton.disabled = false;
      }, 2000);
    }
  }

  // Expose for inline HTML handlers (onsubmit)
  window.handleSaveAlerts = handleSaveAlerts;

  window.addEventListener('DOMContentLoaded', loadAlertSettings);
})();

