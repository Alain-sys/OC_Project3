import { modalProjectsTest } from './components/modal.js';

const gallery = document.querySelector('.gallery');
const filterContainer = document.querySelector('.filter-container');
/*LOGIN BTN start*/
const loginBtn = document.querySelector('.menu__login');
const logoutBtn = document.querySelector('.menu__logout');
const banner = document.querySelector('.banner');
const editBtn = document.querySelector('.project-headline__edit-btn');
export let projectData; // Projects of the API/works here for uses in other functions

const user = JSON.parse(localStorage.getItem('user'));
console.log('test', user);

if (user) {
  logoutBtn.classList.add('active');
  banner.classList.add('active');
  editBtn.classList.add('active');
} else {
  loginBtn.classList.add('active');
  banner.classList.remove('active');
  editBtn.classList.remove('active');
}

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
});
/*LOGIN BTN end*/

function galleryProjects(btnId) {
  const projectFiltered = projectData.reduce((result, item) => {
    if (item.category.id === btnId) {
      result += `
        <figure>
            <img src="${item.imageUrl}" alt="${item.title}">
            <figcaption>${item.title}</figcaption>
        </figure>
      `;
    } else if (!btnId) {
      result += `
        <figure>
            <img src="${item.imageUrl}" alt="${item.title}">
            <figcaption>${item.title}</figcaption>
        </figure>
      `;
    }
    return result;
  }, '');
  gallery.innerHTML = projectFiltered;
}

async function fetchProjects() {
  fetch('http://localhost:5678/api/works')
    .then((response) => {
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      return response.json();
    })
    .then((responseData) => {
      projectData = responseData;
      galleryProjects();
      modalProjectsTest();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
    });
}
fetchProjects();

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
