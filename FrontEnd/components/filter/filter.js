import { galleryProjects } from '../../index.js';

const filterContainer = document.querySelector('.filter-container');

function fetchCategories() {
  fetch('http://localhost:5678/api/categories')
    .then((response) => {
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      return response.json();
    })
    .then((responseData) => {
      toto(responseData);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
    });
}
fetchCategories();

function toto(responseData) {
  responseData.map((item) => {
    filterContainer.innerHTML += `
        <button class="filter-btn" type="button" data-id="${item.id}">${item.name}</button>
      `;
  });
  const filterBtn = document.querySelectorAll('.filter-btn');
  filterBtn.forEach((btn, id) => {
    btn.addEventListener('click', (e) => {
      console.log('btnlist', btn);
      filterBtn.forEach((btn) => {
        btn.classList.remove('active');
      });
      btn.classList.add('active');
      const btnId = parseInt(e.target.dataset.id, 10);
      galleryProjects(btnId);
    });
  });
}
