// @ts-nocheck
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  function updateErrorMessages(active) {
    const errorMessageList = document.querySelectorAll('.error-message');
    errorMessageList.forEach((item) => {
      item.classList[active ? 'add' : 'remove']('active');
    });
  }

  if (isValidEmail(email)) {
    updateErrorMessages(false);
    const formData = {
      email: email,
      password: password,
    };

    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href = '../index.html';
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
        updateErrorMessages(true);
      });
  } else {
    updateErrorMessages(true);
  }
});
