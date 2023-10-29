function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const emailError = document.querySelector('.email-error');
  const passwordError = document.querySelector('.password-error');

  if (isValidEmail(email)) {
    emailError.classList.remove('active');
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
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '../index.html';
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
        passwordError.classList.add('active');
      });
  } else {
    emailError.classList.add('active');
  }
});
