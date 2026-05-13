function toggleNav(){
  const mobileNav = document.getElementById('mobileNav');
  if(mobileNav) mobileNav.classList.toggle('open');
}

function initSmartFuelRangeEstimator(){
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

  const form = document.getElementById('fuel-form');
  if(form){
    form.addEventListener('submit', calculateFuel);
  }

  const signoutBtn = document.querySelector('[data-signout]');
  if(signoutBtn){
    signoutBtn.addEventListener('click', ()=>{
      location.href = 'sign-in.html';
    });
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initSmartFuelRangeEstimator);
}else{
  initSmartFuelRangeEstimator();
}


function calculateFuel(event){
  // Save history (front-end demo only)

  // - stores results + selected upload URLs (via object URLs) + entered hyperlinks

  event.preventDefault();

  
  const vesselType = document.getElementById('vessel-type').value;
  const fuelCapacity = parseFloat(document.getElementById('fuel-capacity').value);
  const cruisingSpeed = parseFloat(document.getElementById('cruising-speed').value);
  const distance = parseFloat(document.getElementById('distance').value);
  const conditions = document.getElementById('conditions').value;
  
  if(!fuelCapacity || !cruisingSpeed || !distance){
    alert('Please fill in all required fields');
    return;
  }
  
  // Simple estimation logic (in real app, this would be more sophisticated)
  let fuelEfficiency = 1.5; // nm per gallon base
  if(vesselType === 'Speedboat') fuelEfficiency = 1.2;
  else if(vesselType === 'Yacht') fuelEfficiency = 2.0;
  else if(vesselType === 'Jet Ski') fuelEfficiency = 0.8;
  
  if(conditions === 'Moderate') fuelEfficiency *= 0.9;
  else if(conditions === 'Rough') fuelEfficiency *= 0.7;
  
  const fuelConsumption = distance / fuelEfficiency;
  const range = fuelCapacity * fuelEfficiency;
  const time = distance / cruisingSpeed;
  
  document.getElementById('fuel-consumption').textContent = fuelConsumption.toFixed(1) + ' gallons';
  document.getElementById('range').textContent = range.toFixed(1) + ' nm';
  document.getElementById('efficiency').textContent = fuelEfficiency.toFixed(1) + ' nm/gallon';
  document.getElementById('time').textContent = time.toFixed(1) + ' hours';

  // Persist history to localStorage (front-end demo)
  try{
    const STORAGE_KEY = 'fuelRangeHistory';
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    // Media previews: convert selected files to object URLs
    const imagesInput = document.getElementById('images-upload');
    const videosInput = document.getElementById('videos-upload');

    const images = imagesInput && imagesInput.files ? Array.from(imagesInput.files).slice(0,15).map(f => URL.createObjectURL(f)) : [];
    const videos = videosInput && videosInput.files ? Array.from(videosInput.files).slice(0,15).map(f => URL.createObjectURL(f)) : [];

    // Hyperlinks
    const links = [];
    for(let i=1;i<=10;i++){
      const el = document.querySelector(`input[name="hyperlink-${i}"]`);
      if(el && el.value){
        links.push(el.value.trim());
      }else{
        links.push('');
      }
    }

    const record = {
      createdAt: new Date().toISOString(),
      vesselType,
      conditions,
      fuelCapacity,
      cruisingSpeed,
      distance,
      fuelConsumption,
      range,
      efficiency: fuelEfficiency,
      time,
      images,
      videos,
      links
    };

    existing.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }catch(e){
    // ignore if localStorage fails
  }
  
  alert('Fuel & Range calculation saved!');
  document.getElementById('results').style.display = 'block';
}

