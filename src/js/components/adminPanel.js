/* ==========================================================================
   ADMIN PANEL COMPONENT
   Allows administrator to add new job offers, manage existing jobs & update state
   ========================================================================== */

import { JOBS_DATA, JOB_CATEGORIES } from '../data/jobsData.js';
import { MUNICIPALITIES } from '../data/municipalities.js';

export class AdminPanel {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onJobAdded = options.onJobAdded || (() => {});
    this.onJobDeleted = options.onJobDeleted || (() => {});

    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderStructure();
    this.setupListeners();
  }

  renderStructure() {
    this.container.innerHTML = `
      <div class="admin-panel-card">
        <div class="admin-header">
          <div class="admin-title-box">
            <span class="badge-admin"><i class="fa-solid fa-user-shield"></i> Panel de Administración</span>
            <h2>Gestión de Ofertas Laborales en Nuevo León</h2>
            <p>Agrega nuevas vacantes de empleo o administra las ofertas existentes para los 51 municipios.</p>
          </div>
          <div class="admin-badge-count">
            <i class="fa-solid fa-briefcase text-gold"></i>
            <span id="admin-total-jobs-count">${JOBS_DATA.length} vacantes en catálogo</span>
          </div>
        </div>

        <div class="admin-grid-layout">
          <!-- Left Column: Add New Job Form -->
          <div class="admin-form-box">
            <h3><i class="fa-solid fa-circle-plus text-cyan"></i> Publicar Nueva Oferta de Empleo</h3>
            <form id="admin-add-job-form" class="admin-form">

              <div class="form-group">
                <label for="adm-title">Título de la Vacante <span class="required">*</span></label>
                <input type="text" id="adm-title" placeholder="Ej. Ingeniero de Manufactura / Desarrollador Web" required />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="adm-company">Empresa Empleadora <span class="required">*</span></label>
                  <input type="text" id="adm-company" placeholder="Ej. CEMEX, Softtek, KIA..." required />
                </div>
                <div class="form-group">
                  <label for="adm-muni">Municipio de NL <span class="required">*</span></label>
                  <select id="adm-muni" required>
                    ${MUNICIPALITIES.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="adm-category">Categoría <span class="required">*</span></label>
                  <select id="adm-category" required>
                    ${JOB_CATEGORIES.filter(c => c.id !== 'all').map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label for="adm-modality">Modalidad <span class="required">*</span></label>
                  <select id="adm-modality" required>
                    <option value="presencial">Presencial</option>
                    <option value="hibrido">Híbrido</option>
                    <option value="remoto">100% Remoto</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="adm-salary">Sueldo Mensual Estimado <span class="required">*</span></label>
                <input type="text" id="adm-salary" placeholder="Ej. $35,000 - $45,000 MXN / mes" required />
              </div>

              <div class="form-group">
                <label for="adm-desc">Descripción General del Puesto <span class="required">*</span></label>
                <textarea id="adm-desc" rows="3" placeholder="Resumen de responsabilidades y actividades del puesto en el municipio..." required></textarea>
              </div>

              <div class="form-group">
                <label for="adm-reqs">Requisitos (separados por coma)</label>
                <input type="text" id="adm-reqs" placeholder="Ej. 3+ años experiencia, Cédula Profesional, Inglés Avanzado" />
              </div>

              <div class="form-group">
                <label for="adm-benefits">Beneficios (separados por coma)</label>
                <input type="text" id="adm-benefits" placeholder="Ej. SGMM familiar, Vales de despensa $3,500, Fondo de Ahorro" />
              </div>

              <div class="form-checkbox">
                <input type="checkbox" id="adm-featured" />
                <label for="adm-featured">Marcar como Vacante Destacada (Insignia Dorada)</label>
              </div>

              <button type="submit" class="btn-primary glow-gold full-width" style="margin-top: 10px;">
                <i class="fa-solid fa-cloud-arrow-up"></i> Publicar Vacante en la Bolsa de NL
              </button>
            </form>
          </div>

          <!-- Right Column: Current Jobs Table -->
          <div class="admin-table-box">
            <h3><i class="fa-solid fa-list-check text-gold"></i> Vacantes Publicadas</h3>
            <div class="table-wrapper">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Vacante / Empresa</th>
                    <th>Municipio</th>
                    <th>Sueldo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="admin-jobs-tbody">
                  <!-- Rendered dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    this.renderTableRows();
  }

  setupListeners() {
    const form = document.getElementById('admin-add-job-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCreateJob();
      });
    }
  }

  handleCreateJob() {
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
      requirements: reqsStr ? reqsStr.split(',').map(s => s.trim()) : ['Experiencia comprobable en el área.'],
      benefits: benStr ? benStr.split(',').map(s => s.trim()) : ['Prestaciones superiores a la ley.']
    };

    // Add to top of dataset
    JOBS_DATA.unshift(newJob);

    // Update Municipality job count
    if (muniObj) muniObj.totalJobs += 1;

    // Reset Form
    document.getElementById('admin-add-job-form').reset();

    // Render Table & Trigger Callbacks
    this.renderTableRows();
    const countEl = document.getElementById('admin-total-jobs-count');
    if (countEl) countEl.innerText = `${JOBS_DATA.length} vacantes en catálogo`;

    this.onJobAdded(newJob);
    alert(`¡Vacante "${title}" en ${muniName} publicada exitosamente!`);
  }

  renderTableRows() {
    const tbody = document.getElementById('admin-jobs-tbody');
    if (!tbody) return;

    tbody.innerHTML = JOBS_DATA.map(job => `
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
          <button class="adm-delete-btn" data-id="${job.id}" title="Eliminar vacante"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.adm-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.handleDeleteJob(id);
      });
    });
  }

  handleDeleteJob(id) {
    const idx = JOBS_DATA.findIndex(j => j.id === id);
    if (idx !== -1) {
      const removed = JOBS_DATA.splice(idx, 1)[0];
      this.renderTableRows();
      const countEl = document.getElementById('admin-total-jobs-count');
      if (countEl) countEl.innerText = `${JOBS_DATA.length} vacantes en catálogo`;
      this.onJobDeleted(removed);
    }
  }
}
