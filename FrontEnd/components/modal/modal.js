// @ts-nocheck
import { fetchProjects, projectData } from '../../index.js';

const modal = document.querySelector('.modal');
const dialogClose = document.querySelector('.modal--close');
const projects = document.querySelector('.modal-gallery');
const editBtn = document.querySelector('.project-headline__edit-btn');
const btnAddProject = document.querySelector('.modal--add-project');
const modalContentGallery = document.querySelector('.modal-content-gallery');
const newProjectContent = document.querySelector('.modal-content--new-project');
const modalPrevBtn = document.querySelector('.modal--prev');

btnAddProject.addEventListener('click', (e) => {
  e.preventDefault();
  modalContentGallery.classList.remove('active');
  modalPrevBtn.classList.add('active');
  newProjectContent.classList.add('active');
  imagePreview.classList.remove('active');
  imageOptions.classList.add('active');
  image.value = '';
});

modalPrevBtn.addEventListener('click', () => {
  modalContentGallery.classList.add('active');
  modalPrevBtn.classList.remove('active');
  newProjectContent.classList.remove('active');
});

editBtn.addEventListener('click', () => {
  newProjectContent.classList.remove('active');
  modalContentGallery.classList.add('active');
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

export function modalProjectsTest() {
  if (projectData.length > 0) {
    projects.innerHTML = '';
    projectData.map((item) => {
      projects.innerHTML += `
      <div class="modal-card">
        <button class="modal-card--delete" data-id="${item.id}">delete</button>
        <img src="${item.imageUrl}" alt="${item.title}">
      </div>
    `;

      /****************** Delete project */
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
    .then((responseData) => {
      console.log('Réponse du serveur:', responseData);
      fetchProjects();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
    });
}

/****************** add project */
const form = document.querySelector('.modal-content--new-project');
const title = document.getElementById('title');
const image = document.getElementById('picture-container__select-image');
const category = document.getElementById('categories-select');
const user = JSON.parse(localStorage.getItem('user'));
// if (title.value.length > 0 && category.value > 0) {
//   console.log('good');
// } else {
//   console.log('bad');
// }

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(image);
  console.log(user.token);

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('category', category.value);
  formData.append('image', image.files[0]);

  console.log('formData', formData);
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    body: formData,
  })
    .then((responseData) => {
      console.log('Réponse du serveur:', responseData);
      fetchProjects();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
    });

  modalContentGallery.classList.add('active');
  modalPrevBtn.classList.remove('active');
  newProjectContent.classList.remove('active');
});

/****************** Preview image */
const imagePreview = document.querySelector('.picture-container__image-preview');
const imageOptions = document.querySelector('.picture-container__image-options');

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