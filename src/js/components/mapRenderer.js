/* ==========================================================================
   INTERACTIVE TRANSPORT MAP & GEOLOCATION PICKUP LOCATOR COMPONENT
   Uses Leaflet.js & HTML5 Geolocation to find nearest pickup points in NL with 5KM Limit
   ========================================================================== */

import { TRANSPORT_ROUTES } from '../data/routesData.js';
import { ApplyModal, RECRUITER_MESSENGER_LINK } from './applyModal.js';

export class TransportMapRenderer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.map = null;
    this.markers = [];
    this.userLocationMarker = null;
    this.nearestStop = null;

    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderLayout();
    this.initLeafletMap();
    this.setupListeners();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="transport-map-card">
        <div class="map-card-header">
          <div class="map-title-box">
            <span class="badge-tag glow-cyan"><i class="fa-solid fa-bus-simple"></i> Transporte Gratuito de Personal</span>
            <h2>Mapa Interactivo de Rutas y Puntos de Abordo en NL</h2>
            <p>Nuestras unidades te recogen cerca de tu domicilio (límite 5 km) y te llevan directo a tu entrevista. <strong>¡Favor de estar 10 minutos antes!</strong></p>
          </div>
          
          <button id="btn-detect-location" class="btn-primary glow-gold" style="padding: 14px 24px; font-size: 1rem;">
            <i class="fa-solid fa-location-crosshairs"></i> Detectar mi Ubicación y Buscar Parada Más Cercana
          </button>
        </div>

        <!-- Filter Controls -->
        <div class="map-filter-bar">
          <div class="filter-group">
            <label for="map-route-select"><i class="fa-solid fa-route text-cyan"></i> Seleccionar Ruta:</label>
            <select id="map-route-select">
              <option value="all">Todas las Rutas (Incluye Ruta Especial Exprés)</option>
              ${TRANSPORT_ROUTES.map(r => `<option value="${r.id}">${r.name} (${r.municipality})</option>`).join('')}
            </select>
          </div>
          
          <div id="location-status-badge" class="location-status-badge">
            <i class="fa-solid fa-circle-info text-cyan"></i> Haz clic en "Detectar mi Ubicación" para verificar tu distancia al transporte.
          </div>
        </div>

        <!-- Map Container -->
        <div id="transport-map-container" class="map-canvas-container" style="height: 480px; width: 100%; border-radius: var(--radius-lg); border: 2px solid rgba(0,168,232,0.3); overflow: hidden; position: relative;"></div>

        <!-- Nearest Stop Result Card -->
        <div id="nearest-stop-result-card" class="nearest-result-card hidden">
          <!-- Dynamically populated when location detected -->
        </div>
      </div>
    `;
  }

  initLeafletMap() {
    if (typeof L === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => this.buildMapInstance();
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    } else {
      this.buildMapInstance();
    }
  }

  buildMapInstance() {
    const mapElement = document.getElementById('transport-map-container');
    if (!mapElement) return;

    this.map = L.map('transport-map-container').setView([25.7200, -100.1800], 11);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    this.plotAllRoutes();
  }

  plotAllRoutes(filteredRouteId = 'all') {
    if (!this.map) return;

    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];

    const routes = filteredRouteId === 'all' 
      ? TRANSPORT_ROUTES 
      : TRANSPORT_ROUTES.filter(r => r.id === filteredRouteId);

    routes.forEach(route => {
      route.stops.forEach(stop => {
        const marker = L.circleMarker([stop.lat, stop.lng], {
          radius: route.id === 'R-EXPRESS' ? 10 : 8,
          fillColor: route.color || '#00A8E8',
          color: '#FFFFFF',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        }).addTo(this.map);

        const googleMapsBtn = stop.mapUrl ? `
          <a href="${stop.mapUrl}" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; margin-bottom: 8px; font-size: 0.78rem; color: #1877F2; font-weight: 700; text-decoration: underline;">
            <i class="fa-solid fa-map-location-dot"></i> Abrir Ubicación en Google Maps
          </a>
        ` : '';

        const popupContent = `
          <div style="font-family: sans-serif; padding: 4px; max-width: 270px;">
            <strong style="color: #081B2F; font-size: 0.95rem; display: block;">${route.name}</strong>
            <span style="font-size: 0.82rem; color: #00A8E8; font-weight: 700; display: block; margin-bottom: 6px;">
              Parada: ${stop.name}
            </span>
            <div style="font-size: 0.78rem; background: #F0F6FF; padding: 6px 10px; border-radius: 6px; margin-bottom: 8px;">
              <strong>Horario de paso (Estar 10 min antes):</strong><br>
              ⏰ Hora: ${stop.ta}
            </div>
            ${googleMapsBtn}
            <button class="btn-select-stop-trigger" data-route="${route.name}" data-stop="${stop.name}" data-time="${stop.ta}" style="background: #1877F2; color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-weight: 700; cursor: pointer; width: 100%; font-size: 0.8rem;">
              <i class="fa-brands fa-facebook-messenger"></i> Elegir esta Parada e Ir a Messenger
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);
        this.markers.push(marker);
      });
    });

    this.map.on('popupopen', () => {
      document.querySelectorAll('.btn-select-stop-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
          const rName = btn.getAttribute('data-route');
          const sName = btn.getAttribute('data-stop');
          const sTime = btn.getAttribute('data-time');
          this.applyWithSelectedStop(rName, sName, sTime);
        });
      });
    });
  }

  setupListeners() {
    const detectBtn = document.getElementById('btn-detect-location');
    const routeSelect = document.getElementById('map-route-select');

    if (detectBtn) {
      detectBtn.addEventListener('click', () => this.detectUserLocation());
    }

    if (routeSelect) {
      routeSelect.addEventListener('change', (e) => {
        this.plotAllRoutes(e.target.value);
      });
    }
  }

  detectUserLocation() {
    const statusBadge = document.getElementById('location-status-badge');
    const detectBtn = document.getElementById('btn-detect-location');

    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización.');
      return;
    }

    if (statusBadge) {
      statusBadge.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-gold"></i> Calculando distancia GPS a las paradas...`;
    }
    if (detectBtn) detectBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        this.handleUserLocationFound(userLat, userLng);
        if (detectBtn) detectBtn.disabled = false;
      },
      (err) => {
        console.warn('Geolocation error:', err);
        this.handleUserLocationFound(25.6866, -100.3161, true);
        if (statusBadge) {
          statusBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-gold"></i> Ubicación aproximada. Selecciona tu parada en el mapa.`;
        }
        if (detectBtn) detectBtn.disabled = false;
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  handleUserLocationFound(userLat, userLng, isFallback = false) {
    if (!this.map) return;

    let closestStop = null;
    let closestRoute = null;
    let minDistance = Infinity;

    TRANSPORT_ROUTES.forEach(route => {
      route.stops.forEach(stop => {
        const dist = this.calculateHaversineDistance(userLat, userLng, stop.lat, stop.lng);
        if (dist < minDistance) {
          minDistance = dist;
          closestStop = stop;
          closestRoute = route;
        }
      });
    });

    this.nearestStop = { route: closestRoute, stop: closestStop, distance: minDistance };

    this.map.setView([userLat, userLng], 14);

    if (this.userLocationMarker) this.map.removeLayer(this.userLocationMarker);
    this.userLocationMarker = L.circleMarker([userLat, userLng], {
      radius: 10,
      fillColor: minDistance <= 5.0 ? '#10B981' : '#EF4444',
      color: '#FFFFFF',
      weight: 3,
      opacity: 1,
      fillOpacity: 1
    }).addTo(this.map).bindPopup(`<b>📍 Tu Ubicación Actual</b><br>${minDistance <= 5.0 ? '✅ Cobertura disponible' : '⚠️ Sin parada < 5km'}`).openPopup();

    const resultCard = document.getElementById('nearest-stop-result-card');
    const statusBadge = document.getElementById('location-status-badge');

    const isWithin5Km = minDistance <= 5.0;

    if (statusBadge && !isFallback) {
      if (isWithin5Km) {
        statusBadge.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> ¡Recolección disponible! Parada encontrada a ${minDistance.toFixed(1)} km.`;
      } else {
        statusBadge.innerHTML = `<i class="fa-solid fa-circle-xmark text-red"></i> ⚠️ NO HAY RECOLECCIÓN A MENOS DE 5KM (Parada más cercana a ${minDistance.toFixed(1)} km).`;
      }
    }

    if (resultCard && closestStop && closestRoute) {
      resultCard.classList.remove('hidden');

      const mapLinkHtml = closestStop.mapUrl ? `
        <a href="${closestStop.mapUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="font-size: 0.85rem; padding: 8px 14px; text-decoration: none;">
          <i class="fa-solid fa-map-location-dot text-cyan"></i> Ver en Google Maps
        </a>
      ` : '';

      const badgeBg = isWithin5Km ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.25)';
      const badgeColor = isWithin5Km ? 'var(--status-green)' : '#FF4D4D';
      const badgeText = isWithin5Km 
        ? `<i class="fa-solid fa-circle-check"></i> PUNTO DE ABORDO DISPONIBLE A ${minDistance.toFixed(1)} KM`
        : `<i class="fa-solid fa-triangle-exclamation"></i> ⚠️ NO HAY RECOLECCIÓN A MENOS DE 5KM (Más cercana a ${minDistance.toFixed(1)} km)`;

      resultCard.innerHTML = `
        <div class="nearest-stop-box" style="background: linear-gradient(135deg, #081B2F 0%, #0D2847 100%); color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 2px solid ${isWithin5Km ? 'var(--status-green)' : 'var(--status-red)'}; margin-top: 20px; display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: ${badgeBg}; color: ${badgeColor}; padding: 6px 14px; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 800; margin-bottom: 10px;">
              ${badgeText}
            </div>
            <h3 style="font-family: var(--font-family-heading); font-size: 1.3rem; margin-bottom: 6px; color: #fff;">
              ${closestRoute.name}
            </h3>
            <p style="font-size: 1.05rem; font-weight: 700; color: var(--accent-cyan); margin-bottom: 8px;">
              <i class="fa-solid fa-location-dot"></i> Parada: ${closestStop.name}
            </p>
            <div style="font-size: 0.88rem; color: #E5A93C; font-weight: 700; margin-bottom: 12px;">
              <i class="fa-solid fa-clock"></i> Hora de salida: ${closestStop.ta} (¡Estar 10 minutos antes!)
            </div>
            <div>${mapLinkHtml}</div>
          </div>

          <div>
            <button id="btn-apply-with-nearest-stop" class="btn-primary ${isWithin5Km ? 'glow-gold' : ''}" style="background: ${isWithin5Km ? '#1877F2' : '#DC2626'}; padding: 14px 24px; font-size: 0.95rem; white-space: nowrap;">
              <i class="fa-brands fa-facebook-messenger"></i> ${isWithin5Km ? 'Postularme con este Punto de Abordo' : 'Notificar Reclutador en Messenger'}
            </button>
          </div>
        </div>
      `;

      document.getElementById('btn-apply-with-nearest-stop').addEventListener('click', () => {
        this.applyWithSelectedStop(closestRoute.name, closestStop.name, closestStop.ta, isWithin5Km, minDistance);
      });
    }
  }

  applyWithSelectedStop(routeName, stopName, timeStr, isWithin5Km, distanceKm) {
    let messageText = '';

    if (isWithin5Km) {
      messageText = `Hola, me interesa postularme.\n🚌 Punto de Abordo (${distanceKm.toFixed(1)} km): ${routeName} - ${stopName} (${timeStr})\n👤 Mi nombre es:\n📞 Mi teléfono es:`;
      alert(`¡Punto de abordo seleccionado!\n"${routeName} - ${stopName} (${timeStr})"\n\nCopiamos esta información. Ahora te redirigiremos al chat de Messenger.`);
    } else {
      messageText = `Hola, me interesa postularme.\n⚠️ NOTA: El candidato se encuentra a ${distanceKm.toFixed(1)} km de la parada más cercana (NO HAY RECOLECCIÓN A MENOS DE 5KM).\n👤 Mi nombre es:\n📞 Mi teléfono es:`;
      alert(`⚠️ NO HAY RECOLECCIÓN A MENOS DE 5KM\nLa parada más cercana está a ${distanceKm.toFixed(1)} km.\n\nSe incluyó este aviso en tu mensaje para informar al reclutador.`);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(messageText).catch(() => {});
    }

    window.open(RECRUITER_MESSENGER_LINK, '_blank');
  }

  calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}
