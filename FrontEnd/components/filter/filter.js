// @ts-nocheck

import { galleryProjects } from '../../index.js';

const filterContainer = document.querySelector('.filter-container');

function fetchCategories() {
  fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((categoriesBtn) => {
      createBtnFilters(categoriesBtn);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
    });
}
fetchCategories();

function createBtnFilters(categoriesBtn) {
  categoriesBtn.map((item) => {
    filterContainer.innerHTML += `
        <button class="filter-btn" type="button" data-id="${item.id}">${item.name}</button>
      `;
  });
  const filterBtn = document.querySelectorAll('.filter-btn');
  filterBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      filterBtn.forEach((btn) => {
        btn.classList.remove('active');
      });
      btn.classList.add('active');
      const btnId = parseInt(e.target.dataset.id, 10);
      galleryProjects(btnId);
    });
  });
}
