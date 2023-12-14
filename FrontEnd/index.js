// @ts-nocheck
import { modalProjectsList } from './components/modal/modal.js';

const gallery = document.querySelector('.gallery');
const loginBtn = document.querySelector('.menu__login');
const logoutBtn = document.querySelector('.menu__logout');
const banner = document.querySelector('.banner');
const editBtn = document.querySelector('.project-headline__edit-btn');
export const user = JSON.parse(localStorage.getItem('user'));

export let projectData; // Projects of the API/works here for uses in other functions

export function galleryProjects(btnId) {
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

export function fetchProjects() {
  fetch('http://localhost:5678/api/works')
    .then((response) => response.json())
    .then((responseData) => {
      projectData = responseData;
      galleryProjects();
      modalProjectsList();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
    });
}
fetchProjects();

/*LOGIN BTN start*/
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
