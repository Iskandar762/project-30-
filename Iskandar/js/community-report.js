// Expose for inline onclick in HTML (hamburger menu)
function toggleNav(){
  const el = document.getElementById('mobileNav');
  if(el) el.classList.toggle('open');
}

function escapeHtml(str){
  return String(str ?? '')
    .replaceAll('&','&amp;')
    .replaceAll('<','<')
    .replaceAll('>','>')
    .replaceAll('"','"')
    .replaceAll("'",'&#039;');
}

function loadReports(){
  const reports = JSON.parse(localStorage.getItem('beachguardCommunityReports') || 'null');

  if(!reports){
    const defaultReports = [
      {
        type: 'Safety Concern',
        location: 'Port Dickson Beach',
        description: 'Strong rip currents observed near the main swimming area. Multiple swimmers struggling in the water.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        images: [],
        videos: [],
        link: ''
      },
      {
        type: 'Water Condition',
        location: 'Teluk Kemang',
        description: 'Water appears cloudy with possible algal bloom. Visibility reduced to about 2 meters.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        images: [],
        videos: [],
        link: ''
      },
      {
        type: 'Marine Life',
        location: 'Pulau Tioman',
        description: 'Large group of jellyfish sighted near the coral reef. Advise caution for snorkelers.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        images: [],
        videos: [],
        link: ''
      }
    ];
    localStorage.setItem('beachguardCommunityReports', JSON.stringify(defaultReports));
    displayReports(defaultReports);
  } else {
    displayReports(reports);
  }
}

function getTimeAgo(date){
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if(diffHours < 1){
    return 'Less than an hour ago';
  } else if(diffHours < 24){
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
}

function renderReportItem(report){
  const timeAgo = getTimeAgo(new Date(report.timestamp));
  const images = Array.isArray(report.images) ? report.images : [];
  const videos = Array.isArray(report.videos) ? report.videos : [];
  const link = report.link ? String(report.link).trim() : '';

  const imagesHtml = images.length ? `
    <div class="report-media" style="margin-top:12px;display:flex;flex-wrap:wrap;gap:12px;">
      ${images.map(img => {
        const src = img.objectUrl || '';
        if(!src) return '';
        return `<div class="thumb" style="width:120px;height:90px;border:1px solid var(--border);border-radius:10px;overflow:hidden;background:rgba(13,43,78,0.03)">
          <img src="${src}" alt="report image" style="width:100%;height:100%;object-fit:cover;display:block;" />
        </div>`;
      }).join('')}
    </div>
  ` : '';

  const videosHtml = videos.length ? `
    <div class="report-videos" style="margin-top:12px;display:flex;flex-wrap:wrap;gap:12px;">
      ${videos.map(v => {
        const src = v.objectUrl || '';
        if(!src) return '';
        return `<div style="width:260px;max-width:100%;border:1px solid var(--border);border-radius:10px;overflow:hidden;">
          <video src="${src}" controls style="width:100%;height:auto;display:block;background:#000"></video>
        </div>`;
      }).join('')}
    </div>
  ` : '';

  const linkHtml = link ? `
    <div class="report-link" style="margin-top:12px;">
      <div style="font-family:'Inter',sans-serif;font-size:12px;color:var(--text-muted);margin-bottom:6px;">Hyperlink</div>
      <a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer" style="color:var(--teal);font-family:'Inter',sans-serif;font-size:13px;word-break:break-all;">${escapeHtml(link)}</a>
    </div>
  ` : '';

  const safeLocation = escapeHtml(report.location);
  const safeDescription = escapeHtml(report.description);
  const safeType = escapeHtml(report.type);

  return `
    <div class="report-header">
      <span class="report-type">${safeType}</span>
      <span class="report-time">${timeAgo}</span>
    </div>
    <div class="report-content">
      <div class="report-location">${safeLocation}</div>
      <div class="report-description">${safeDescription}</div>
    </div>
    ${imagesHtml}
    ${videosHtml}
    ${linkHtml}
  `;
}

function displayReports(reports){
  const reportsList = document.getElementById('reportsList');
  if(!reportsList) return;

  reportsList.innerHTML = '';

  (reports || []).forEach(report => {
    const reportItem = document.createElement('div');
    reportItem.className = 'report-item';
    reportItem.innerHTML = renderReportItem(report);
    reportsList.appendChild(reportItem);
  });
}

function initCommunityReportForm(){
  const form = document.getElementById('community-report-form');
  if(!form) return;

  const imagesInput = document.getElementById('images-upload');
  const videosInput = document.getElementById('videos-upload');
  const videoPreviewEl = document.getElementById('report-video-preview');

  const renderVideoSelectionPreview = ()=>{
    if(!videosInput || !videoPreviewEl) return;
    videoPreviewEl.innerHTML = '';
    const files = videosInput.files ? Array.from(videosInput.files) : [];
    files.slice(0,5).forEach(file => {
      const url = URL.createObjectURL(file);
      const wrap = document.createElement('div');
      wrap.style.width = '260px';
      wrap.style.maxWidth = '100%';
      wrap.style.border = '1px solid var(--border)';
      wrap.style.borderRadius = '10px';
      wrap.style.overflow = 'hidden';

      const v = document.createElement('video');
      v.src = url;
      v.controls = true;
      v.style.width = '100%';
      v.style.height = 'auto';
      v.style.display = 'block';
      v.style.background = '#000';

      wrap.appendChild(v);
      videoPreviewEl.appendChild(wrap);
    });
  };

  if(videosInput){
    videosInput.addEventListener('change', renderVideoSelectionPreview);
  }

  form.addEventListener('submit', (event)=>{
    event.preventDefault();

    const type = document.getElementById('report-type')?.value;
    const location = document.getElementById('location')?.value.trim();
    const description = document.getElementById('description')?.value.trim();
    const links = [];
    for(let i=1;i<=10;i++){
      const el = document.querySelector(`input[name="report-link-${i}"]`);
      const val = el && typeof el.value === 'string' ? el.value.trim() : '';
      if(val) links.push(val);
    }

    if(!type || !location || !description){

      alert('Please fill in Type, Location, and Description');
      return;
    }

    const imagesFiles = imagesInput && imagesInput.files ? Array.from(imagesInput.files) : [];
    const videosFiles = videosInput && videosInput.files ? Array.from(videosInput.files) : [];

    const images = imagesFiles.map(f => ({
      name: f.name,
      type: f.type,
      objectUrl: URL.createObjectURL(f)
    }));

    const videos = videosFiles.map(f => ({
      name: f.name,
      type: f.type,
      objectUrl: URL.createObjectURL(f)
    }));

    const newReport = {
      type,
      location,
      description,
      timestamp: new Date().toISOString(),
      images,
      videos,
      link: link || ''
    };

    const reports = JSON.parse(localStorage.getItem('beachguardCommunityReports') || '[]');
    reports.unshift(newReport);
    localStorage.setItem('beachguardCommunityReports', JSON.stringify(reports));

    displayReports(reports);

    // Clear form
    document.getElementById('location').value = '';
    document.getElementById('description').value = '';
    if(imagesInput) imagesInput.value = '';
    if(videosInput) videosInput.value = '';
    if(videoPreviewEl) videoPreviewEl.innerHTML = '';
    const linkEl = document.getElementById('report-link');
    if(linkEl) linkEl.value = '';

    const submitButton = form.querySelector('.btn-submit');
    if(submitButton){
      submitButton.textContent = 'Report Submitted';
      submitButton.disabled = true;
      setTimeout(()=>{
        submitButton.textContent = 'Submit Report';
        submitButton.disabled = false;
      }, 2000);
    }
  });
}

window.addEventListener('DOMContentLoaded', ()=>{
  loadReports();
  initCommunityReportForm();
});

