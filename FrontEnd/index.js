const gallery = document.querySelector('.gallery');
const filterContainer = document.querySelector('.filter-container');
// const filterBtn = document.querySelectorAll('.filter-btn');

function projects(data, btnCat) {
  console.log('function', data);
  data.map((item, id) => {
    console.log(item, id);
    gallery.innerHTML += `
        <figure>
            <img src="${item.imageUrl}" alt="${item.title}">
            <figcaption>${item.title}</figcaption>
        </figure>
        `;
  });
}

fetch('http://localhost:5678/api/works')
  .then((response) => {
    if (!response.ok) {
      throw new Error('La requête a échoué');
    }
    return response.json();
  })
  .then((data) => {
    projects(data);
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
  .then((data) => {
    console.log(data);
    data.map((item, id) => {
      console.log('btn', item, id);
      filterContainer.innerHTML += `
        <button class="filter-btn" type="button" data-id="${item.id}">${item.name}</button>
        `;
    });
  })
  .catch((error) => {
    console.error("Une erreur s'est produite :", error);
  });

// filterBtn.forEach((btn) => {
//   console.log('test', btn);

//   btn.addEventListener('click', (e) => {
//     console.log(e.target);
//   });
// });

filterContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    console.log(e.target);
    const btnId = e.target.dataset.id;
    if (btnId === '1') {
      console.log('hello');
    }
  }
});
