/* ==========================================================================
   APPLY MODAL COMPONENT
   Handles job details preview drawer, Facebook contact redirection & application form
   ========================================================================== */

export const RECRUITER_FB_LINK = 'https://www.facebook.com/profile.php?id=61593038273758&sk=followers';

export class ApplyModal {
  constructor(modalContainerId) {
    this.container = document.getElementById(modalContainerId);
    this.currentJob = null;

    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderModalStructure();
    this.setupListeners();
  }

  renderModalStructure() {
    this.container.innerHTML = `
      <div id="job-modal-backdrop" class="modal-backdrop hidden">
        <div class="modal-content-card">
          <button id="modal-close-btn" class="modal-close-x" title="Cerrar ventana"><i class="fa-solid fa-xmark"></i></button>

          <!-- Drawer Body -->
          <div class="modal-scroll-area">
            <!-- Job Header -->
            <div class="modal-job-header" id="modal-job-header">
              <!-- Dynamically populated -->
            </div>

            <!-- Tabs: Details vs Apply Form / Facebook Direct -->
            <div class="modal-tabs-bar">
              <button id="tab-btn-details" class="tab-btn active"><i class="fa-solid fa-file-lines"></i> Descripción del Puesto</button>
              <button id="tab-btn-form" class="tab-btn"><i class="fa-brands fa-facebook-messenger"></i> Contactar al Reclutador en Facebook</button>
            </div>

            <!-- Tab Content 1: Job Description -->
            <div id="tab-content-details" class="tab-panel active">
              <div class="job-detail-section">
                <h4><i class="fa-solid fa-align-left text-cyan"></i> Descripción General</h4>
                <p id="modal-job-desc"></p>
              </div>

              <div class="job-detail-section">
                <h4><i class="fa-solid fa-list-check text-cyan"></i> Requisitos Clave</h4>
                <ul id="modal-job-reqs" class="custom-check-list"></ul>
              </div>

              <div class="job-detail-section">
                <h4><i class="fa-solid fa-gift text-gold"></i> Beneficios y Prestaciones</h4>
                <ul id="modal-job-benefits" class="custom-gift-list"></ul>
              </div>

              <div class="modal-action-footer" style="display: flex; gap: 14px; flex-wrap: wrap;">
                <a id="modal-direct-fb-btn" href="${RECRUITER_FB_LINK}" target="_blank" rel="noopener noreferrer" class="btn-primary glow-cyan full-width" style="background: #1877F2; text-decoration: none;">
                  <i class="fa-brands fa-facebook"></i> Postularme Directo en Facebook (Contacto Oficial)
                </a>
              </div>
            </div>

            <!-- Tab Content 2: Application Form & Direct Contact -->
            <div id="tab-content-form" class="tab-panel">
              <div class="fb-direct-card">
                <div class="fb-icon-wrapper">
                  <i class="fa-brands fa-facebook" style="font-size: 3.5rem; color: #1877F2;"></i>
                </div>
                <h3>Postulación Directa vía Facebook Messenger</h3>
                <p>Al hacer clic en el botón a continuación, serás redirigido a nuestro perfil oficial de atención para enviar tu solicitud directamente al reclutador.</p>

                <div class="fb-button-wrap" style="margin: 24px 0;">
                  <a href="${RECRUITER_FB_LINK}" target="_blank" rel="noopener noreferrer" class="btn-primary glow-cyan" style="background: #1877F2; padding: 16px 32px; font-size: 1.1rem; border-radius: var(--radius-full);">
                    <i class="fa-brands fa-facebook"></i> Abrir Perfil de Facebook para Postulaciones <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
              </div>

              <hr style="border: none; border-top: 1px solid var(--border-color); margin: 30px 0;" />

              <form id="job-application-form" class="app-form">
                <h4> O registra tus datos en nuestra base local:</h4>
                <div class="form-group">
                  <label for="app-full-name">Nombre Completo <span class="required">*</span></label>
                  <div class="input-icon-group">
                    <i class="fa-solid fa-user icon"></i>
                    <input type="text" id="app-full-name" placeholder="Ej. Roberto Garza Sada" required />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="app-email">Correo Electrónico <span class="required">*</span></label>
                    <div class="input-icon-group">
                      <i class="fa-solid fa-envelope icon"></i>
                      <input type="email" id="app-email" placeholder="roberto@ejemplo.com" required />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="app-phone">Teléfono de Contacto (NL) <span class="required">*</span></label>
                    <div class="input-icon-group">
                      <i class="fa-solid fa-phone icon"></i>
                      <input type="tel" id="app-phone" placeholder="81 1234 5678" required />
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="button" id="cancel-app-btn" class="btn-secondary">Cancelar</button>
                  <button type="submit" class="btn-primary glow-cyan">
                    <i class="fa-solid fa-paper-plane"></i> Enviar y Redirigir a Facebook
                  </button>
                </div>
              </form>

              <!-- Success View -->
              <div id="application-success-view" class="success-card hidden">
                <div class="success-checkmark-icon">
                  <i class="fa-solid fa-circle-check text-green"></i>
                </div>
                <h3>¡Postulación Registrada!</h3>
                <p>Redirigiendo al perfil oficial de contacto en Facebook...</p>
                <div class="fb-button-wrap" style="margin: 20px 0;">
                  <a href="${RECRUITER_FB_LINK}" target="_blank" rel="noopener noreferrer" class="btn-primary glow-gold" style="background: #1877F2; color: #FFFFFF;">
                    <i class="fa-brands fa-facebook"></i> Ir a Facebook Ahora
                  </a>
                </div>
                <button id="success-close-btn" class="btn-secondary">Volver al catálogo</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  setupListeners() {
    const backdrop = document.getElementById('job-modal-backdrop');
    const closeBtn = document.getElementById('modal-close-btn');
    const tabDetails = document.getElementById('tab-btn-details');
    const tabForm = document.getElementById('tab-btn-form');
    const contentDetails = document.getElementById('tab-content-details');
    const contentForm = document.getElementById('tab-content-form');
    const cancelBtn = document.getElementById('cancel-app-btn');
    const form = document.getElementById('job-application-form');
    const successCloseBtn = document.getElementById('success-close-btn');

    // Modal Close
    const closeModal = () => backdrop.classList.add('hidden');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
      });
    }

    // Tabs Switch
    const switchTab = (activeTab) => {
      if (activeTab === 'details') {
        tabDetails.classList.add('active');
        tabForm.classList.remove('active');
        contentDetails.classList.add('active');
        contentForm.classList.remove('active');
      } else {
        tabForm.classList.add('active');
        tabDetails.classList.remove('active');
        contentForm.classList.add('active');
        contentDetails.classList.remove('active');
      }
    };

    if (tabDetails) tabDetails.addEventListener('click', () => switchTab('details'));
    if (tabForm) tabForm.addEventListener('click', () => switchTab('form'));

    // Form Submission: Redirects directly to Facebook!
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        window.open(RECRUITER_FB_LINK, '_blank');
        this.showSuccessView();
      });
    }

    if (successCloseBtn) {
      successCloseBtn.addEventListener('click', () => {
        closeModal();
      });
    }
  }

  openWithJob(job) {
    this.currentJob = job;
    const backdrop = document.getElementById('job-modal-backdrop');
    if (!backdrop || !job) return;

    // Reset Tabs
    document.getElementById('tab-btn-details').click();
    document.getElementById('job-application-form').classList.remove('hidden');
    document.getElementById('application-success-view').classList.add('hidden');

    // Populate Job Header
    const headerEl = document.getElementById('modal-job-header');
    headerEl.innerHTML = `
      <div class="modal-company-badge" style="background-color: ${job.logoBg}">
        ${job.logoText}
      </div>
      <div class="modal-header-info">
        <span class="modal-company-title">${job.company} ${job.verified ? '<i class="fa-solid fa-circle-check text-cyan" title="Empresa Verificada"></i>' : ''}</span>
        <h2 class="modal-job-title">${job.title}</h2>
        <div class="modal-meta-tags">
          <span><i class="fa-solid fa-location-dot text-gold"></i> ${job.municipalityName}</span>
          <span><i class="fa-solid fa-money-bill-wave text-green"></i> ${job.salary}</span>
          <span><i class="fa-solid fa-clock text-cyan"></i> Publicado ${job.postedDate}</span>
        </div>
      </div>
    `;

    // Populate Details Tab
    document.getElementById('modal-job-desc').innerText = job.description;

    const reqsUl = document.getElementById('modal-job-reqs');
    reqsUl.innerHTML = job.requirements.map(r => `<li><i class="fa-solid fa-check text-cyan"></i> ${r}</li>`).join('');

    const benefitsUl = document.getElementById('modal-job-benefits');
    benefitsUl.innerHTML = (job.benefits || []).map(b => `<li><i class="fa-solid fa-star text-gold"></i> ${b}</li>`).join('');

    backdrop.classList.remove('hidden');
  }

  showSuccessView() {
    const form = document.getElementById('job-application-form');
    const successView = document.getElementById('application-success-view');

    if (form) form.classList.add('hidden');
    if (successView) successView.classList.remove('hidden');
  }
}
