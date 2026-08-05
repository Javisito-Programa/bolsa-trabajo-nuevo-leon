/* ==========================================================================
   APPLY MODAL COMPONENT WITH 5KM GPS DISTANCE VERIFICATION
   Handles job details preview drawer, 5KM GPS pickup validation & Messenger redirection
   ========================================================================== */

import { TRANSPORT_ROUTES } from '../data/routesData.js';

export const RECRUITER_MESSENGER_LINK = 'https://m.me/61593038273758';
export const RECRUITER_FB_PROFILE = 'https://www.facebook.com/profile.php?id=61593038273758&sk=followers';

export class ApplyModal {
  constructor(modalContainerId) {
    this.container = document.getElementById(modalContainerId);
    this.currentJob = null;
    this.userGpsLocation = null;
    this.nearestPickupResult = null;

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

            <!-- Tabs: Details vs Form & Messenger Direct -->
            <div class="modal-tabs-bar">
              <button id="tab-btn-details" class="tab-btn active"><i class="fa-solid fa-file-lines"></i> Descripción del Puesto</button>
              <button id="tab-btn-form" class="tab-btn"><i class="fa-brands fa-facebook-messenger"></i> Postularme por Messenger</button>
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
                <button id="btn-switch-to-messenger-tab" class="btn-primary glow-cyan full-width" style="background: #1877F2; padding: 14px;">
                  <i class="fa-brands fa-facebook-messenger"></i> Iniciar Postulación por Messenger
                </button>
              </div>
            </div>

            <!-- Tab Content 2: Direct Messenger Application Form with 5KM Check -->
            <div id="tab-content-form" class="tab-panel">
              <div class="fb-direct-card" style="background: #F0F6FF; border: 2px solid #1877F2; border-radius: var(--radius-lg); padding: 20px; text-align: center; margin-bottom: 20px;">
                <div class="fb-icon-wrapper">
                  <i class="fa-brands fa-facebook-messenger" style="font-size: 3rem; color: #1877F2;"></i>
                </div>
                <h3 style="color: var(--primary-navy-dark); font-size: 1.2rem; margin-top: 6px;">Postulación Directa a Messenger</h3>
                <p style="font-size: 0.85rem; color: var(--text-medium);">
                  Revisaremos tu ubicación para asignarte la ruta de transporte más cercana (Límite 5 km).
                </p>
              </div>

              <form id="job-application-form" class="app-form">
                <div class="form-group">
                  <label for="app-job-title">Empresa y Puesto de Interés</label>
                  <div class="input-icon-group">
                    <i class="fa-solid fa-briefcase icon"></i>
                    <input type="text" id="app-job-title" readonly style="background: var(--bg-subtle); font-weight: 700; color: var(--primary-navy-dark);" />
                  </div>
                </div>

                <div class="form-group">
                  <label for="app-full-name">Nombre Completo <span class="required">*</span></label>
                  <div class="input-icon-group">
                    <i class="fa-solid fa-user icon"></i>
                    <input type="text" id="app-full-name" placeholder="Ej. Roberto Garza Sada" required />
                  </div>
                </div>

                <div class="form-group">
                  <label for="app-phone">Número de Teléfono (WhatsApp / Llamada) <span class="required">*</span></label>
                  <div class="input-icon-group">
                    <i class="fa-solid fa-phone icon"></i>
                    <input type="tel" id="app-phone" placeholder="Ej. 81 1234 5678" required />
                  </div>
                </div>

                <!-- GPS Location & 5KM Check Button -->
                <div class="form-group" style="margin-top: 14px; background: rgba(0,168,232,0.06); padding: 14px; border-radius: var(--radius-md); border: 1px dashed var(--accent-cyan);">
                  <button type="button" id="btn-modal-gps-check" class="btn-secondary full-width" style="padding: 10px; font-weight: 700; font-size: 0.88rem;">
                    <i class="fa-solid fa-location-crosshairs text-cyan"></i> Detectar mi Ubicación GPS (Verificar Transporte < 5KM)
                  </button>
                  <div id="modal-gps-result-box" style="margin-top: 10px; font-size: 0.85rem; font-weight: 600;"></div>
                </div>

                <div class="form-actions" style="margin-top: 20px;">
                  <button type="button" id="cancel-app-btn" class="btn-secondary">Cancelar</button>
                  <button type="submit" class="btn-primary glow-cyan" style="background: #1877F2; padding: 14px 24px; font-size: 1rem;">
                    <i class="fa-brands fa-facebook-messenger"></i> Copiar Datos y Abrir Chat en Messenger
                  </button>
                </div>
              </form>

              <!-- Success View -->
              <div id="application-success-view" class="success-card hidden" style="text-align: center; padding: 24px;">
                <div class="success-checkmark-icon">
                  <i class="fa-solid fa-circle-check text-green" style="font-size: 3rem;"></i>
                </div>
                <h3 style="font-size: 1.3rem; color: var(--primary-navy-dark); margin: 12px 0 6px 0;">¡Datos Copiados al Portapapeles!</h3>
                <p style="font-size: 0.88rem; color: var(--text-medium); margin-bottom: 16px;">
                  Tus datos y la información de tu transporte fueron copiados. Pégalos en el chat de Messenger que acabamos de abrir.
                </p>
                <div class="fb-button-wrap" style="margin: 16px 0;">
                  <a id="btn-reopen-messenger" href="${RECRUITER_MESSENGER_LINK}" target="_blank" rel="noopener noreferrer" class="btn-primary glow-cyan" style="background: #1877F2; color: #FFFFFF; text-decoration: none; padding: 12px 24px;">
                    <i class="fa-brands fa-facebook-messenger"></i> Abrir Chat de Messenger Nuevamente
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
    const btnSwitchTab = document.getElementById('btn-switch-to-messenger-tab');
    const cancelBtn = document.getElementById('cancel-app-btn');
    const gpsBtn = document.getElementById('btn-modal-gps-check');
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
    if (btnSwitchTab) btnSwitchTab.addEventListener('click', () => switchTab('form'));

    // GPS Location Check
    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => this.detectModalGpsLocation());
    }

    // Form Submission: Copy Personal Data & Open Messenger
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const jobTitle = document.getElementById('app-job-title').value;
        const fullName = document.getElementById('app-full-name').value.trim();
        const phone = document.getElementById('app-phone').value.trim();

        let transportInfo = '';

        if (this.nearestPickupResult) {
          const { route, stop, distance } = this.nearestPickupResult;
          if (distance <= 5.0) {
            transportInfo = `\n🚌 Parada de Transporte (${distance.toFixed(1)} km): ${route.name} - ${stop.name} (${stop.ta})`;
          } else {
            transportInfo = `\n⚠️ NO HAY RECOLECCIÓN A MENOS DE 5KM (Parada más cercana a ${distance.toFixed(1)} km: ${route.name} - ${stop.name})`;
          }
        } else {
          transportInfo = `\n🚌 Transporte: Solicito verificar parada más cercana al contactar.`;
        }

        const messageText = `Hola, me interesa postularme a la vacante:\n📌 Vacante: ${jobTitle}\n👤 Nombre Completo: ${fullName}\n📞 Teléfono: ${phone}${transportInfo}`;

        // Copy message text to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(messageText).catch(() => {});
        }

        // Open direct Messenger URL
        window.open(RECRUITER_MESSENGER_LINK, '_blank');

        this.showSuccessView();
      });
    }

    if (successCloseBtn) {
      successCloseBtn.addEventListener('click', () => {
        closeModal();
      });
    }
  }

  detectModalGpsLocation() {
    const resultBox = document.getElementById('modal-gps-result-box');
    const gpsBtn = document.getElementById('btn-modal-gps-check');

    if (!navigator.geolocation) {
      if (resultBox) resultBox.innerHTML = `<span class="text-red">Navegador no soporta GPS.</span>`;
      return;
    }

    if (resultBox) resultBox.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-cyan"></i> Verificando GPS...`;
    if (gpsBtn) gpsBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;

        this.calculateNearestPickup(uLat, uLng);

        if (gpsBtn) gpsBtn.disabled = false;
      },
      (err) => {
        // Fallback to Monterrey
        this.calculateNearestPickup(25.6866, -100.3161);
        if (gpsBtn) gpsBtn.disabled = false;
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  calculateNearestPickup(uLat, uLng) {
    let closestStop = null;
    let closestRoute = null;
    let minDistance = Infinity;

    TRANSPORT_ROUTES.forEach(route => {
      route.stops.forEach(stop => {
        const d = this.getHaversineKm(uLat, uLng, stop.lat, stop.lng);
        if (d < minDistance) {
          minDistance = d;
          closestStop = stop;
          closestRoute = route;
        }
      });
    });

    this.nearestPickupResult = { route: closestRoute, stop: closestStop, distance: minDistance };

    const resultBox = document.getElementById('modal-gps-result-box');
    if (!resultBox) return;

    if (minDistance <= 5.0) {
      resultBox.innerHTML = `
        <div style="background: rgba(16,185,129,0.1); color: var(--status-green); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--status-green);">
          <i class="fa-solid fa-circle-check"></i> <strong>Recolección Disponible (${minDistance.toFixed(1)} km)</strong><br>
          ${closestRoute.name} &bull; ${closestStop.name} (${closestStop.ta})
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div style="background: rgba(239,68,68,0.1); color: var(--status-red); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--status-red);">
          <i class="fa-solid fa-triangle-exclamation"></i> <strong>NO HAY RECOLECCIÓN A MENOS DE 5KM</strong><br>
          La parada más cercana está a ${minDistance.toFixed(1)} km (${closestStop.name}).
        </div>
      `;
    }
  }

  getHaversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  openWithJob(job) {
    this.currentJob = job;
    this.nearestPickupResult = null;
    const backdrop = document.getElementById('job-modal-backdrop');
    if (!backdrop || !job) return;

    // Reset Tabs & Views
    document.getElementById('tab-btn-details').click();
    document.getElementById('job-application-form').classList.remove('hidden');
    document.getElementById('application-success-view').classList.add('hidden');
    
    const gpsResultBox = document.getElementById('modal-gps-result-box');
    if (gpsResultBox) gpsResultBox.innerHTML = '';

    // Auto-fill Job Title in Form
    const appJobTitleInput = document.getElementById('app-job-title');
    if (appJobTitleInput) {
      appJobTitleInput.value = `${job.company} - ${job.title}`;
    }

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
