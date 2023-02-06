const loginButton = document.querySelector('#login-button');

const loginFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();


  if (!username || !password) {
    showErrorModal('Please fill out all fields.');
  } else {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      sessionStorage.setItem('username', username);
      document.location.replace(`/profile/${username}`);
    } else {
      data = await response.json();
      showErrorModal(data.message);
    }
  }
};

if (loginButton) {
  loginButton.addEventListener('click', loginFormHandler);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    loginFormHandler(event);
  }
});

