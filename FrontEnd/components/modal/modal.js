// @ts-nocheck
import { projectData } from '../../index.js';

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
  projectData.map((item) => {
    projects.innerHTML += `
      <div class="modal-card">
        <button class="modal-card--delete">delete</button>
        <img src="${item.imageUrl}" alt="${item.title}">
      </div>
    `;
  });

  const BtnDeleteCard = document.querySelectorAll('.modal-card--delete');
  BtnDeleteCard.forEach((btn, id) => {
    btn.addEventListener('click', (e) => {
      deleteWorks(id);
    });
  });
}

function deleteWorks(id) {
  console.log(id);
}

const form = document.querySelector('.modal-content--new-project');
const title = document.getElementById('title');
const image = document.getElementById('picture-container__select-image');
const category = document.getElementById('categories-select');
const user = JSON.parse(localStorage.getItem("user"));
form.addEventListener('submit', (e) => {
  e.preventDefault();
console.log(image)
console.log(user.token)

const formData = new FormData();
formData.append('title', title.value);
formData.append('category', category.value);
formData.append('image', image.files[0]);

// const newProject = {
//   title: title.value,
//   category: category.value,
//   image: image.files[0],
// }
  
  console.log('formData', formData)
fetch("http://localhost:5678/api/works", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
  body: formData,
  // body: newProject,
})
  .then(data => {
    console.log('Réponse du serveur:', data);
  })
  .catch(error => {
    console.error("Une erreur s'est produite :", error);
  });

});