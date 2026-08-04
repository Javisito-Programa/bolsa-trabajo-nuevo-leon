/* ==========================================================================
   MAP RENDERER COMPONENT - NUEVO LEÓN VIBRANT MULTI-COLOR VECTOR MAP
   Inspired by user reference image: Every municipality is an interactive button
   ========================================================================== */

import { MUNICIPALITIES, REGIONS } from '../data/municipalities.js';

export class MapRenderer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onSelectMunicipality = options.onSelectMunicipality || (() => {});
    this.onSelectRegion = options.onSelectRegion || (() => {});
    this.activeMunicipalityId = null;
    this.activeRegionId = 'all';

    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderContainerStructure();
    this.renderSVGMap();
    this.setupEventListeners();
  }

  renderContainerStructure() {
    this.container.innerHTML = `
      <div class="map-card-wrapper">
        <div class="map-header">
          <div class="map-title-box">
            <span class="badge-tag glow-cyan"><i class="fa-solid fa-map-location-dot"></i> Mapa Interactivo por Municipios</span>
            <h2>Selecciona un Municipio de Nuevo León</h2>
            <p>Haz clic en cualquier municipio del mapa para ver las ofertas de empleo exclusivas</p>
          </div>

          <div class="map-search-box">
            <div class="input-with-icon">
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
              <input type="text" id="map-search-input" placeholder="Buscar municipio (ej. Monterrey, San Pedro, Apodaca)..." autocomplete="off" />
              <button id="map-search-clear" class="clear-btn hidden" title="Limpiar"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div id="map-search-results" class="search-dropdown hidden"></div>
          </div>
        </div>

        <!-- Region Filter Pills -->
        <div class="region-filters" id="region-filters-bar">
          <button class="region-pill active" data-region="all">
            <span class="dot" style="background: var(--accent-cyan);"></span> Todo Nuevo León (51)
          </button>
          ${Object.values(REGIONS).map(r => `
            <button class="region-pill" data-region="${r.id}">
              <span class="dot" style="background: ${r.color}"></span> ${r.name}
            </button>
          `).join('')}
        </div>

        <!-- Main Map Interactive Canvas -->
        <div class="map-canvas-container">
          <div class="map-badge-info" id="map-active-badge">
            <i class="fa-solid fa-location-crosshairs text-gold"></i>
            <span id="map-badge-text">Haz clic en un botón-municipio para filtrar empleos</span>
          </div>

          <div class="map-zoom-controls">
            <button id="map-reset-btn" title="Restablecer Vista"><i class="fa-solid fa-rotate-left"></i> Ver Todo NL</button>
          </div>

          <!-- Vector SVG Map of Nuevo León with Multi-color Municipalities -->
          <div class="svg-wrapper" id="svg-map-wrapper">
            <!-- Dynamically rendered -->
          </div>

          <!-- Floating Tooltip -->
          <div id="map-tooltip" class="map-tooltip hidden">
            <div class="tooltip-header">
              <span class="tooltip-title" id="tt-name">Monterrey</span>
              <span class="tooltip-badge" id="tt-region">Metropolitana</span>
            </div>
            <div class="tooltip-body">
              <div class="tooltip-stat">
                <i class="fa-solid fa-briefcase text-gold"></i>
                <strong id="tt-jobs">4,820</strong> vacantes activas
              </div>
              <p class="tooltip-desc" id="tt-desc">Capital industrial y financiera de Nuevo León.</p>
              <div class="tooltip-tags" id="tt-industries"></div>
            </div>
            <div class="tooltip-footer">
              <span>Haz clic para ver ofertas <i class="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>
        </div>

        <!-- Quick Municipality Selector Dropdown for Accessibility -->
        <div class="quick-muni-bar">
          <label for="quick-muni-select"><i class="fa-solid fa-list-check"></i> Seleccionar por lista:</label>
          <select id="quick-muni-select">
            <option value="all">Ver todo Nuevo León (51 Municipios)</option>
            ${MUNICIPALITIES.map(m => `<option value="${m.id}">${m.name} (${m.totalJobs} vacantes)</option>`).join('')}
          </select>
        </div>
      </div>
    `;
  }

  renderSVGMap() {
    const svgWrapper = document.getElementById('svg-map-wrapper');
    if (!svgWrapper) return;

    // Multicolor SVG Map based on provided reference image
    const svgContent = `
      <svg id="nl-svg-map" viewBox="0 0 900 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <!-- Map Outline -->
        <path class="nl-state-bg" d="
          M 380,80 L 450,110 L 520,240 L 580,270 L 670,330 L 740,400 L 710,480 L 620,600 L 600,720
          L 560,880 L 470,950 L 440,860 L 440,730 L 420,630 L 320,530 L 300,420 L 330,300 L 350,180 Z
        " fill="rgba(13, 45, 76, 0.05)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="3" />

        <!-- Compass Rose in Top Left matching user map image -->
        <g transform="translate(70, 70)">
          <circle cx="0" cy="0" r="28" fill="#FFFFFF" stroke="#0D2D4C" stroke-width="2"/>
          <text x="0" y="-32" text-anchor="middle" font-size="12" font-weight="bold" fill="#FFFFFF">N</text>
          <text x="0" y="42" text-anchor="middle" font-size="12" font-weight="bold" fill="#FFFFFF">S</text>
          <text x="-40" y="4" text-anchor="middle" font-size="12" font-weight="bold" fill="#FFFFFF">O</text>
          <text x="40" y="4" text-anchor="middle" font-size="12" font-weight="bold" fill="#FFFFFF">E</text>
          <polygon points="0,-22 5,-4 0,0 -5,-4" fill="#E60000"/>
          <polygon points="0,22 5,4 0,0 -5,4" fill="#0D2D4C"/>
          <polygon points="22,0 4,5 0,0 4,-5" fill="#0D2D4C"/>
          <polygon points="-22,0 -4,5 0,0 -4,-5" fill="#0D2D4C"/>
        </g>

        <!-- Municipalities Vector Node Buttons -->
        <g id="municipalities-group">
          ${MUNICIPALITIES.map(m => {
            const { x, y, r } = m.coords;
            const size = Math.max(r * 2.2, 40);
            const isHub = m.totalJobs > 1500;

            return `
              <g class="municipality-node" data-id="${m.id}" data-region="${m.region}" tabIndex="0" role="button" aria-label="${m.name}">
                <!-- Outer Pulse Ring -->
                <circle class="muni-glow-ring" cx="${x}" cy="${y}" r="${size / 2 + 8}" fill="${m.color}" opacity="0.25"></circle>

                <!-- Municipality Interactive Button Shape -->
                <rect class="muni-shape" x="${x - size/2}" y="${y - size/2}" width="${size}" height="${size}" rx="12"
                      fill="${m.color}" stroke="#FFFFFF" stroke-width="2.5"
                      data-id="${m.id}" />

                ${m.isCapital ? `<text x="${x}" y="${y - size/2 - 8}" text-anchor="middle" fill="#FFD700" font-size="13" font-weight="800">★ CAPITAL</text>` : ''}

                <!-- Text Label inside button -->
                <text x="${x}" y="${y - 4}" class="muni-label-name" text-anchor="middle" font-size="${isHub ? '13' : '11'}" font-weight="800" fill="#FFFFFF" style="text-shadow: 0 1px 3px rgba(0,0,0,0.8);">
                  ${m.name.length > 13 ? m.name.substring(0, 11) + '...' : m.name}
                </text>
                <text x="${x}" y="${y + 13}" class="muni-label-count" text-anchor="middle" font-size="10" font-weight="700" fill="#FFFFFF" style="text-shadow: 0 1px 3px rgba(0,0,0,0.8);">
                  ${m.totalJobs.toLocaleString()} vacantes
                </text>
              </g>
            `;
          }).join('')}
        </g>
      </svg>
    `;

    svgWrapper.innerHTML = svgContent;
  }

  setupEventListeners() {
    const tooltip = document.getElementById('map-tooltip');
    const nodes = this.container.querySelectorAll('.municipality-node');
    const regionPills = this.container.querySelectorAll('.region-pill');
    const searchInput = document.getElementById('map-search-input');
    const searchClear = document.getElementById('map-search-clear');
    const searchResults = document.getElementById('map-search-results');
    const quickSelect = document.getElementById('quick-muni-select');
    const resetBtn = document.getElementById('map-reset-btn');

    // 1. Mouse interactions on Map Nodes
    nodes.forEach(node => {
      const id = node.getAttribute('data-id');
      const muniData = MUNICIPALITIES.find(m => m.id === id);

      node.addEventListener('mouseenter', (e) => {
        this.showTooltip(e, muniData, tooltip);
        node.classList.add('hovered');
      });

      node.addEventListener('mousemove', (e) => {
        this.positionTooltip(e, tooltip);
      });

      node.addEventListener('mouseleave', () => {
        tooltip.classList.add('hidden');
        node.classList.remove('hovered');
      });

      node.addEventListener('click', () => {
        this.selectMunicipality(id);
      });
    });

    // 2. Region Pills Click
    regionPills.forEach(pill => {
      pill.addEventListener('click', () => {
        regionPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const region = pill.getAttribute('data-region');
        this.filterByRegion(region);
      });
    });

    // 3. Search Input Filtering
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length > 0) {
          searchClear.classList.remove('hidden');
          this.renderSearchResults(query, searchResults);
        } else {
          searchClear.classList.add('hidden');
          searchResults.classList.add('hidden');
        }
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.add('hidden');
        searchResults.classList.add('hidden');
      });
    }

    // 4. Quick Select Dropdown
    if (quickSelect) {
      quickSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'all') {
          this.clearSelection();
        } else {
          this.selectMunicipality(val);
        }
      });
    }

    // 5. Reset View Button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.clearSelection();
      });
    }
  }

  showTooltip(event, data, tooltip) {
    if (!tooltip || !data) return;

    const regionObj = REGIONS[data.region];
    document.getElementById('tt-name').innerText = data.name;
    document.getElementById('tt-region').innerText = regionObj.name;
    document.getElementById('tt-region').style.backgroundColor = data.color;
    document.getElementById('tt-jobs').innerText = data.totalJobs.toLocaleString();
    document.getElementById('tt-desc').innerText = data.description;

    const indContainer = document.getElementById('tt-industries');
    indContainer.innerHTML = data.topIndustries.slice(0, 3).map(ind => `
      <span class="tt-tag"><i class="fa-solid fa-check text-cyan"></i> ${ind}</span>
    `).join('');

    tooltip.classList.remove('hidden');
    this.positionTooltip(event, tooltip);
  }

  positionTooltip(event, tooltip) {
    const rect = this.container.querySelector('.map-canvas-container').getBoundingClientRect();
    let x = event.clientX - rect.left + 15;
    let y = event.clientY - rect.top - 10;

    if (x + 280 > rect.width) x = event.clientX - rect.left - 290;
    if (y + 180 > rect.height) y = event.clientY - rect.top - 190;

    tooltip.style.left = `${Math.max(10, x)}px`;
    tooltip.style.top = `${Math.max(10, y)}px`;
  }

  selectMunicipality(id) {
    this.activeMunicipalityId = id;
    const data = MUNICIPALITIES.find(m => m.id === id);

    // Highlight node on map
    const nodes = this.container.querySelectorAll('.municipality-node');
    nodes.forEach(n => {
      if (n.getAttribute('data-id') === id) {
        n.classList.add('selected');
      } else {
        n.classList.remove('selected');
      }
    });

    // Update badge text
    const badgeText = document.getElementById('map-badge-text');
    if (badgeText && data) {
      badgeText.innerHTML = `Mostrando empleos para: <strong class="text-gold">${data.name}</strong> (${data.totalJobs} vacantes)`;
    }

    // Update Quick Select
    const quickSelect = document.getElementById('quick-muni-select');
    if (quickSelect) quickSelect.value = id;

    // Trigger callback to update jobs list
    this.onSelectMunicipality(id, data);
  }

  filterByRegion(regionId) {
    this.activeRegionId = regionId;
    const nodes = this.container.querySelectorAll('.municipality-node');

    nodes.forEach(n => {
      const reg = n.getAttribute('data-region');
      if (regionId === 'all' || reg === regionId) {
        n.style.opacity = '1';
        n.style.pointerEvents = 'auto';
      } else {
        n.style.opacity = '0.25';
      }
    });

    this.onSelectRegion(regionId);
  }

  clearSelection() {
    this.activeMunicipalityId = null;
    const nodes = this.container.querySelectorAll('.municipality-node');
    nodes.forEach(n => n.classList.remove('selected'));

    const badgeText = document.getElementById('map-badge-text');
    if (badgeText) badgeText.innerHTML = 'Haz clic en un botón-municipio para filtrar empleos';

    const quickSelect = document.getElementById('quick-muni-select');
    if (quickSelect) quickSelect.value = 'all';

    this.onSelectMunicipality(null, null);
  }

  renderSearchResults(query, dropdown) {
    const matches = MUNICIPALITIES.filter(m =>
      m.name.toLowerCase().includes(query) ||
      m.topIndustries.some(i => i.toLowerCase().includes(query))
    );

    if (matches.length === 0) {
      dropdown.innerHTML = `<div class="search-item-empty">No se encontró municipio con "${query}"</div>`;
    } else {
      dropdown.innerHTML = matches.map(m => `
        <div class="search-item" data-id="${m.id}">
          <div class="search-item-name">${m.name}</div>
          <div class="search-item-meta">
            <span class="region-badge" style="background: ${m.color}">${REGIONS[m.region].name}</span>
            <span>${m.totalJobs} vacantes</span>
          </div>
        </div>
      `).join('');

      dropdown.querySelectorAll('.search-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.getAttribute('data-id');
          this.selectMunicipality(id);
          dropdown.classList.add('hidden');
          document.getElementById('map-search-input').value = '';
        });
      });
    }

    dropdown.classList.remove('hidden');
  }
}
