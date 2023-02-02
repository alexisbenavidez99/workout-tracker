const signupHandler = async (event) => {
  event.preventDefault();
  console.log('signupHandler');
  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      // alert response;
      alert('Email or Username already exists. Please try again.');
    }
  }
};

document.querySelector('#create-profile').addEventListener('click', signupHandler);