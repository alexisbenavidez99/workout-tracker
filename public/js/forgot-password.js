

const form1 = document.querySelector('form');
if (form1) {
  form1.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the email value from the input
    const email = document.getElementById('email').value;

    // Validate the email
    if (!email) {
      document.getElementById('email-error').classList.remove('hidden');
      return;
    } else {
      document.getElementById('email-error').classList.add('hidden');
    }

    // Make the API call to send the password reset email
    fetch('/api/users/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(response => {
        if (response.ok) {
          // Show a success message
          showErrorModal('If this email exist in our database, you will receive an email shortly.');
        } else {
          // Show an error message
          showErrorModal('If this email exist in our database, you will receive an email shortly.');
        }
      });
  });
}















