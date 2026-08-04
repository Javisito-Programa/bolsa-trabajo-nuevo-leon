/* ==========================================================================
   JOB LIST COMPONENT
   Renders job offers grid, active municipality filters, search & detail trigger
   ========================================================================== */

import { getStoredJobs, JOB_CATEGORIES, WORK_MODALITIES } from '../data/jobsData.js';
import { MUNICIPALITIES } from '../data/municipalities.js';

export class JobList {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onJobSelect = options.onJobSelect || (() => {});
    
    // Active Filter State
    this.activeMunicipalityId = null;
    this.activeCategory = 'all';
    this.activeModality = 'all';
    this.searchKeyword = '';

    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderLayout();
    this.setupListeners();
    this.updateJobList();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="jobs-section-container">
        <!-- Header Bar -->
        <div class="jobs-header-bar">
          <div class="jobs-title-group">
            <h2 id="jobs-heading-title">
              <i class="fa-solid fa-briefcase text-cyan"></i> Vacantes de Empleo en Nuevo León
            </h2>
            <p id="jobs-heading-subtitle">Mostrando todas las ofertas laborales verificadas en el estado</p>
          </div>

          <div class="jobs-active-badge-pill" id="active-muni-pill">
            <span class="pill-dot"></span>
            <span id="active-muni-pill-text">Todos los Municipios</span>
            <button id="clear-muni-filter-btn" class="pill-close hidden" title="Quitar filtro de municipio"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>

        <!-- Category Pills Filter Bar -->
        <div class="category-pills-bar">
          ${JOB_CATEGORIES.map(cat => `
            <button class="cat-pill ${cat.id === 'all' ? 'active' : ''}" data-cat="${cat.id}">
              <i class="fa-solid ${cat.icon}"></i> ${cat.name}
            </button>
          `).join('')}
        </div>

        <!-- Filter Controls Bar -->
        <div class="filter-controls-row">
          <div class="search-input-wrap">
            <i class="fa-solid fa-magnifying-glass icon"></i>
            <input type="text" id="jobs-keyword-search" placeholder="Buscar puesto o tecnología (ej. React, Automatización, Finanzas)..." />
          </div>

          <div class="modality-select-wrap">
            <i class="fa-solid fa-laptop-house icon"></i>
            <select id="modality-filter-select">
              ${WORK_MODALITIES.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Results Info & Counter -->
        <div class="results-stats-row">
          <span class="results-counter" id="jobs-count-text">Cargando empleos...</span>
          <div class="results-sorter">
            <label for="jobs-sort-select">Ordenar por:</label>
            <select id="jobs-sort-select">
              <option value="recent">Más Recientes</option>
              <option value="salary-high">Mayor Salario</option>
            </select>
          </div>
        </div>

        <!-- Job Cards Grid -->
        <div class="jobs-grid" id="jobs-cards-grid">
          <!-- Dynamic Job Cards rendered here -->
        </div>
      </div>
    `;
  }

  setupListeners() {
    // 1. Category Pill Clicks
    const catPills = this.container.querySelectorAll('.cat-pill');
    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeCategory = pill.getAttribute('data-cat');
        this.updateJobList();
      });
    });

    // 2. Keyword Search
    const searchInput = document.getElementById('jobs-keyword-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchKeyword = e.target.value.toLowerCase().trim();
        this.updateJobList();
      });
    }

    // 3. Modality Filter
    const modalitySelect = document.getElementById('modality-filter-select');
    if (modalitySelect) {
      modalitySelect.addEventListener('change', (e) => {
        this.activeModality = e.target.value;
        this.updateJobList();
      });
    }

    // 4. Clear Municipality Filter Button
    const clearMuniBtn = document.getElementById('clear-muni-filter-btn');
    if (clearMuniBtn) {
      clearMuniBtn.addEventListener('click', () => {
        this.setMunicipalityFilter(null);
      });
    }
  }

  setMunicipalityFilter(municipalityId) {
    this.activeMunicipalityId = municipalityId;
    this.updateHeaderTitle();
    this.updateJobList();
  }

  updateHeaderTitle() {
    const titleEl = document.getElementById('jobs-heading-title');
    const subEl = document.getElementById('jobs-heading-subtitle');
    const pillText = document.getElementById('active-muni-pill-text');
    const clearBtn = document.getElementById('clear-muni-filter-btn');

    if (this.activeMunicipalityId) {
      const muni = MUNICIPALITIES.find(m => m.id === this.activeMunicipalityId);
      const name = muni ? muni.name : 'Municipio seleccionado';
      titleEl.innerHTML = `<i class="fa-solid fa-location-dot text-gold"></i> Vacantes en <span class="highlight-gold">${name}</span>`;
      subEl.innerText = `Mostrando oportunidades de empleo exclusivas en el municipio de ${name}`;
      if (pillText) pillText.innerText = name;
      if (clearBtn) clearBtn.classList.remove('hidden');
    } else {
      titleEl.innerHTML = `<i class="fa-solid fa-briefcase text-cyan"></i> Vacantes de Empleo en Nuevo León`;
      subEl.innerText = `Mostrando todas las ofertas laborales verificadas en el estado`;
      if (pillText) pillText.innerText = 'Todos los Municipios';
      if (clearBtn) clearBtn.classList.add('hidden');
    }
  }

  filterJobs() {
    const jobs = getStoredJobs();
    return jobs.filter(job => {
      if (this.activeMunicipalityId && job.municipalityId !== this.activeMunicipalityId) {
        return false;
      }
      if (this.activeCategory !== 'all' && job.category !== this.activeCategory) {
        return false;
      }
      if (this.activeModality !== 'all' && job.modality !== this.activeModality) {
        return false;
      }
      if (this.searchKeyword) {
        const titleMatch = job.title.toLowerCase().includes(this.searchKeyword);
        const companyMatch = job.company.toLowerCase().includes(this.searchKeyword);
        const descMatch = job.description.toLowerCase().includes(this.searchKeyword);
        const reqMatch = (job.requirements || []).some(r => r.toLowerCase().includes(this.searchKeyword));
        if (!titleMatch && !companyMatch && !descMatch && !reqMatch) {
          return false;
        }
      }
      return true;
    });
  }

  updateJobList() {
    const grid = document.getElementById('jobs-cards-grid');
    const counter = document.getElementById('jobs-count-text');
    if (!grid) return;

    const filtered = this.filterJobs();

    if (counter) {
      counter.innerHTML = `Se encontraron <strong class="text-cyan">${filtered.length}</strong> empleos que coinciden`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-jobs-state">
          <div class="empty-icon"><i class="fa-solid fa-folder-open"></i></div>
          <h3>No se encontraron vacantes para este criterio</h3>
          <p>Intenta cambiar los filtros de búsqueda o seleccionar otro municipio en la lista.</p>
          <button id="reset-all-filters-btn" class="btn-primary glow-cyan">
            <i class="fa-solid fa-rotate-left"></i> Restablecer Filtros
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-all-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.activeCategory = 'all';
          this.activeModality = 'all';
          this.searchKeyword = '';
          document.getElementById('jobs-keyword-search').value = '';
          document.getElementById('modality-filter-select').value = 'all';
          this.setMunicipalityFilter(null);
        });
      }
      return;
    }

    grid.innerHTML = filtered.map(job => this.renderJobCard(job)).join('');

    grid.querySelectorAll('.job-card').forEach(card => {
      card.addEventListener('click', () => {
        const jobId = card.getAttribute('data-id');
        const jobs = getStoredJobs();
        const selectedJob = jobs.find(j => j.id === jobId);
        if (selectedJob) this.onJobSelect(selectedJob);
      });
    });
  }

  renderJobCard(job) {
    const modalityLabels = {
      presencial: { text: 'Presencial', class: 'mod-presencial' },
      hibrido: { text: 'Híbrido', class: 'mod-hibrido' },
      remoto: { text: '100% Remoto', class: 'mod-remoto' }
    };

    const modObj = modalityLabels[job.modality] || { text: job.modality, class: '' };

    return `
      <div class="job-card ${job.featured ? 'featured-card' : ''}" data-id="${job.id}">
        ${job.featured ? `<div class="featured-ribbon"><i class="fa-solid fa-star"></i> Destacado</div>` : ''}

        <div class="job-card-header">
          <div class="company-logo-avatar" style="background-color: ${job.logoBg || '#00A8E8'}">
            ${job.logoText || 'EMP'}
          </div>

          <div class="company-meta">
            <div class="company-name-row">
              <span class="company-name">${job.company}</span>
              ${job.verified ? `<span class="badge-verified" title="Empresa Verificada"><i class="fa-solid fa-circle-check"></i> Verificada</span>` : ''}
            </div>
            <span class="job-posted-time"><i class="fa-regular fa-clock"></i> ${job.postedDate}</span>
          </div>
        </div>

        <h3 class="job-title">${job.title}</h3>

        <div class="job-location-row">
          <span class="loc-badge"><i class="fa-solid fa-location-dot text-cyan"></i> ${job.municipalityName}</span>
          <span class="mod-badge ${modObj.class}">${modObj.text}</span>
          ${job.urgent ? `<span class="urgent-badge"><i class="fa-solid fa-bolt"></i> Urgente</span>` : ''}
        </div>

        <p class="job-snippet">${job.description}</p>

        <div class="job-card-footer">
          <div class="salary-box">
            <span class="salary-label">Sueldo mensual estimado</span>
            <span class="salary-val">${job.salary}</span>
          </div>

          <button class="btn-apply-quick glow-cyan" title="Ver detalles y postularme">
            Postularme <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  }
}
