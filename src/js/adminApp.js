/* ==========================================================================
   PRIVATE ADMIN APP CONTROLLER WITH SHA-256 ENCRYPTED AUTHENTICATION
   Powers admin.html - Private publishing panel for Bolsa de Trabajo NL
   ========================================================================== */

import { getStoredJobs, saveNewJob, deleteJobById, JOB_CATEGORIES } from './data/jobsData.js';
import { MUNICIPALITIES } from './data/municipalities.js';

// SHA-256 Cryptographic Hash of the administrator password
const ADMIN_HASH = '353d949f3749534e875c0b5964dd38247d990ac2cfeb9fab9c298eb60bf7495f';

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  setupAccessGate();
  populateDropdowns();
  renderAdminTable();
  setupFormListener();
});

function setupAccessGate() {
  const pinInput = document.getElementById('admin-pin-input');
  const loginBtn = document.getElementById('admin-login-btn');
  const gateBox = document.getElementById('admin-gate-overlay');
  const dashboard = document.getElementById('admin-dashboard-wrapper');
  const errorMsg = document.getElementById('admin-pin-error');

  // Check if session is already authorized
  if (sessionStorage.getItem('admin_auth_passed') === 'true') {
    if (gateBox) gateBox.classList.add('hidden');
    if (dashboard) dashboard.classList.remove('hidden');
  }

  const verifyPass = async () => {
    const entered = pinInput ? pinInput.value.trim() : '';
    if (!entered) return;

    const hash = await sha256(entered);
    if (hash === ADMIN_HASH) {
      sessionStorage.setItem('admin_auth_passed', 'true');
      if (gateBox) gateBox.classList.add('hidden');
      if (dashboard) dashboard.classList.remove('hidden');
      if (errorMsg) errorMsg.classList.add('hidden');
    } else {
      if (errorMsg) {
        errorMsg.classList.remove('hidden');
        errorMsg.innerText = 'Contraseña incorrecta. Intenta nuevamente.';
      }
    }
  };

  if (loginBtn) loginBtn.addEventListener('click', verifyPass);
  if (pinInput) {
    pinInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') verifyPass();
    });
  }
}

function populateDropdowns() {
  const muniSelect = document.getElementById('adm-muni');
  const catSelect = document.getElementById('adm-category');

  if (muniSelect) {
    muniSelect.innerHTML = MUNICIPALITIES.map(m => `
      <option value="${m.id}">${m.name}</option>
    `).join('');
  }

  if (catSelect) {
    catSelect.innerHTML = JOB_CATEGORIES.filter(c => c.id !== 'all').map(c => `
      <option value="${c.id}">${c.name}</option>
    `).join('');
  }
}

function setupFormListener() {
  const form = document.getElementById('admin-add-job-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('adm-title').value.trim();
    const company = document.getElementById('adm-company').value.trim();
    const municipalityId = document.getElementById('adm-muni').value;
    const category = document.getElementById('adm-category').value;
    const modality = document.getElementById('adm-modality').value;
    const salary = document.getElementById('adm-salary').value.trim();
    const description = document.getElementById('adm-desc').value.trim();
    const reqsStr = document.getElementById('adm-reqs').value.trim();
    const benStr = document.getElementById('adm-benefits').value.trim();
    const featured = document.getElementById('adm-featured').checked;

    const muniObj = MUNICIPALITIES.find(m => m.id === municipalityId);
    const muniName = muniObj ? muniObj.name : municipalityId;

    const newJob = {
      id: `adm-${Date.now()}`,
      title,
      company,
      logoBg: '#00A8E8',
      logoText: company.substring(0, 3).toUpperCase(),
      municipalityId,
      municipalityName: muniName,
      category,
      modality,
      salary,
      featured,
      urgent: false,
      verified: true,
      postedDate: 'Hace un momento',
      description,
      requirements: reqsStr ? reqsStr.split(',').map(s => s.trim()) : ['Experiencia comprobable.'],
      benefits: benStr ? benStr.split(',').map(s => s.trim()) : ['Prestaciones de Ley y superiores.']
    };

    saveNewJob(newJob);
    form.reset();
    renderAdminTable();

    const alertBox = document.getElementById('admin-success-toast');
    if (alertBox) {
      alertBox.classList.remove('hidden');
      alertBox.innerText = `¡Vacante "${title}" en ${muniName} publicada exitosamente! AHORA ES VISIBLE EN EL SITIO PÚBLICO.`;
      setTimeout(() => alertBox.classList.add('hidden'), 5000);
    }
  });
}

function renderAdminTable() {
  const tbody = document.getElementById('admin-jobs-tbody');
  const counter = document.getElementById('admin-total-jobs-count');
  if (!tbody) return;

  const jobs = getStoredJobs();
  if (counter) counter.innerText = `${jobs.length} vacantes publicadas`;

  tbody.innerHTML = jobs.map(job => `
    <tr>
      <td>
        <div class="adm-job-cell">
          <strong>${job.title}</strong>
          <span class="adm-company-sub">${job.company}</span>
        </div>
      </td>
      <td><span class="loc-badge">${job.municipalityName}</span></td>
      <td><span class="adm-salary-sub">${job.salary}</span></td>
      <td>
        <button class="adm-delete-btn" data-id="${job.id}" title="Eliminar vacante del sitio público"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.adm-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('¿Estás seguro de eliminar esta vacante del portal público?')) {
        deleteJobById(id);
        renderAdminTable();
      }
    });
  });
}
