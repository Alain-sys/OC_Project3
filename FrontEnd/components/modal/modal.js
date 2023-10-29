import { projectData } from '../../index.js';

const modal = document.querySelector('.modal');
const dialogClose = document.querySelector('.modal--close');
const modalProjects = document.querySelector('.modal-gallery');
const editBtn = document.querySelector('.project-headline__edit-btn');

editBtn.addEventListener('click', () => {
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
    modalProjects.innerHTML += `
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
