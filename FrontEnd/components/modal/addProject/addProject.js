// @ts-nocheck
import { fetchProjects, user } from '../../../index.js';
import { modalContentGallery, newProjectContent } from '../modal.js';

export const modalPrevBtn = document.querySelector('.modal--prev');
export const image = document.getElementById('picture-container__select-image');
const title = document.getElementById('title');
const category = document.getElementById('categories-select');
const form = document.querySelector('.modal-content--new-project');
const btnAddNewProject = document.querySelector('.modal--add-new-project');
export const imagePreview = document.querySelector('.picture-container__image-preview');
export const imageOptions = document.querySelector('.picture-container__image-options');

modalPrevBtn.addEventListener('click', () => {
  modalContentGallery.classList.add('active');
  modalPrevBtn.classList.remove('active');
  newProjectContent.classList.remove('active');
});

export function newProjectValidator() {
  if (title.value.trim() === '' || category.value.trim() === '' || !image.files[0]) {
    btnAddNewProject.disabled = true;
    btnAddNewProject.classList.remove('active');
  } else {
    btnAddNewProject.disabled = false;
    btnAddNewProject.classList.add('active');
  }
}

title.addEventListener('input', newProjectValidator);
category.addEventListener('input', newProjectValidator);
image.addEventListener('change', newProjectValidator);

image.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      imagePreview.src = reader.result;
    };
    reader.readAsDataURL(file);
    imageOptions.classList.remove('active');
    imagePreview.classList.add('active');
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const maxFileSize = 4 * 1024 * 1024;
  if (image.files[0].size > maxFileSize) {
    alert("La taille de l'image dépasse la limite de 4 Mo");
    return;
  }

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('category', category.value);
  formData.append('image', image.files[0]);

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    body: formData,
  })
    .then(() => {
      fetchProjects();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
    });

  modalContentGallery.classList.add('active');
  modalPrevBtn.classList.remove('active');
  newProjectContent.classList.remove('active');
});
