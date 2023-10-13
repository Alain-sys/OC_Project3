const gallery = document.querySelector('.gallery');
const filterContainer = document.querySelector('.filter-container');

let projectData; // Projects of the API/works here for uses in other functions

function projects(btnId) {
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

fetch('http://localhost:5678/api/works')
  .then((response) => {
    if (!response.ok) {
      throw new Error('La requête a échoué');
    }
    return response.json();
  })
  .then((responseData) => {
    projectData = responseData;
    projects();
  })
  .catch((error) => {
    console.error("Une erreur s'est produite :", error);
  });
fetch('http://localhost:5678/api/categories')
  .then((response) => {
    if (!response.ok) {
      throw new Error('La requête a échoué');
    }
    return response.json();
  })
  .then((responseData) => {
    responseData.map((item) => {
      filterContainer.innerHTML += `
        <button class="filter-btn" type="button" data-id="${item.id}">${item.name}</button>
      `;
    });

    filterBtn = document.querySelectorAll('.filter-btn');
    filterBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        console.log('btnlist', btn);
        filterBtn.forEach((btn) => {
          btn.classList.remove('active');
        });
        btn.classList.add('active');
        const btnId = parseInt(e.target.dataset.id, 10);
        projects(btnId);
      });
    });
  })
  .catch((error) => {
    console.error("Une erreur s'est produite :", error);
  });
