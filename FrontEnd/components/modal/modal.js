// @ts-nocheck
import { fetchProjects, projectData, user } from '../../index.js';
import { image, imageOptions, imagePreview, newProjectValidator } from './addProject/addProject.js';

const editBtn = document.querySelector('.project-headline__edit-btn');
const dialogClose = document.querySelector('.modal--close');
const modal = document.querySelector('.modal');
const projects = document.querySelector('.modal-gallery');
export const modalContentGallery = document.querySelector('.modal-content-gallery');
export const newProjectContent = document.querySelector('.modal-content--new-project');
const modalPrevBtn = document.querySelector('.modal--prev');
const btnAddProject = document.querySelector('.modal--add-project');

editBtn.addEventListener('click', () => {
  newProjectContent.classList.remove('active');
  modalContentGallery.classList.add('active');
  modalPrevBtn.classList.remove('active');
  modal.showModal();
});

dialogClose.addEventListener('click', () => {
  modal.close();
});

modal.addEventListener('click', (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close();
  }
});

modalPrevBtn.addEventListener('click', () => {
  modalContentGallery.classList.add('active');
  modalPrevBtn.classList.remove('active');
  newProjectContent.classList.remove('active');
});

btnAddProject.addEventListener('click', () => {
  modalContentGallery.classList.remove('active');
  modalPrevBtn.classList.add('active');
  newProjectContent.classList.add('active');
  imagePreview.classList.remove('active');
  imageOptions.classList.add('active');
  image.value = '';
  newProjectValidator();
});

export function modalProjectsList() {
  if (projectData.length > 0) {
    projects.innerHTML = '';
    projectData.map((item) => {
      projects.innerHTML += `
      <div class="modal-card">
        <button class="modal-card--delete" data-id="${item.id}"><i class="fa-solid fa-trash-can modal-card--delete-icon"></i></button>
        <img src="${item.imageUrl}" alt="${item.title}">
      </div>
    `;

      const BtnDeleteCard = document.querySelectorAll('.modal-card--delete');
      BtnDeleteCard.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const projectId = e.target.dataset.id;
          deleteWorks(projectId);
        });
      });
    });
  }
}

function deleteWorks(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then(() => {
      fetchProjects();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
    });
}
