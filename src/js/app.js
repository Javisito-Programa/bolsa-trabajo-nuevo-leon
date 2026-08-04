/* ==========================================================================
   PUBLIC APP MAIN CONTROLLER
   Powers index.html - Public Job Offers Portal for Nuevo León
   ========================================================================== */

import { JobList } from './components/jobList.js';
import { ApplyModal } from './components/applyModal.js';
import { MUNICIPALITIES } from './data/municipalities.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Apply Modal
  const applyModal = new ApplyModal('job-modal-container');

  // 2. Initialize Job List Catalog
  const jobList = new JobList('jobs-section-mount', {
    onJobSelect: (job) => {
      applyModal.openWithJob(job);
    }
  });

  // 3. Setup Hero Search Bar
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

  // 4. Statistics Counter Animation
  animateCounters();
});

function animateCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    let count = 0;
    const speed = target / 60;

    const update = () => {
      count += speed;
      if (count < target) {
        counter.innerText = Math.ceil(count).toLocaleString();
        setTimeout(update, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    update();
  });
}
