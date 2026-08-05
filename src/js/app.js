/* ==========================================================================
   PUBLIC APP MAIN CONTROLLER
   Powers index.html - Public Job Offers Portal for Nuevo León
   ========================================================================== */

import { JobList } from './components/jobList.js';
import { ApplyModal } from './components/applyModal.js';
import { TransportMapRenderer } from './components/mapRenderer.js';
import { MUNICIPALITIES } from './data/municipalities.js';
import { getStoredJobs } from './data/jobsData.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Apply Modal
  const applyModal = new ApplyModal('job-modal-container');

  // 2. Initialize Interactive Personal Transport Map with GPS Locator
  const transportMap = new TransportMapRenderer('transport-map-mount');

  // 3. Initialize Job List Catalog
  const jobList = new JobList('jobs-section-mount', {
    onJobSelect: (job) => {
      applyModal.openWithJob(job);
    }
  });

  // 4. Update Real Dynamic Job Counter
  const realJobsEl = document.getElementById('stat-real-jobs');
  if (realJobsEl) {
    const jobs = getStoredJobs();
    realJobsEl.innerText = jobs.length;
  }

  // 5. Setup Hero Search Bar
  const heroSearchInput = document.getElementById('hero-search-keyword');
  const heroMuniSelect = document.getElementById('hero-muni-select');
  const heroSearchBtn = document.getElementById('hero-search-btn');

  if (heroMuniSelect) {
    heroMuniSelect.innerHTML = `
      <option value="all">Todos los Municipios (51)</option>
      ${MUNICIPALITIES.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
    `;
  }

  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      const keyword = heroSearchInput ? heroSearchInput.value.trim() : '';
      const selectedMuni = heroMuniSelect ? heroMuniSelect.value : 'all';

      if (keyword) {
        jobList.searchKeyword = keyword.toLowerCase();
        const catalogKeywordInput = document.getElementById('jobs-keyword-search');
        if (catalogKeywordInput) catalogKeywordInput.value = keyword;
      }

      if (selectedMuni !== 'all') {
        jobList.setMunicipalityFilter(selectedMuni);
      } else {
        jobList.setMunicipalityFilter(null);
      }

      const jobsElem = document.getElementById('jobs-section-mount');
      if (jobsElem) {
        jobsElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
});
