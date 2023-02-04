

const form1 = document.querySelector('form');
if (form1) {
  form1.addEventListener('submit', function(event) {
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
          alert('Password reset email sent');
        } else {
          // Show an error message
          alert('Failed to send password reset email');
        }
      });
  });
}







const form = document.querySelector('form');

if(form){
  form.addEventListener('submit', async (event) => {
    const passwordInput = document.querySelector('#password').value.trim();
    const confirmPasswordInput = document.querySelector('#confirmPassword').value.trim();
    const token = document.querySelector('#token').textContent;

    event.preventDefault();


    const password = passwordInput;
    const confirmPassword = confirmPasswordInput;

    if (password !== confirmPassword) {
    // Show an error message
      alert('Passwords do not match');
      return;
    }




    try {
      const response = await fetch(`/api/users/reset-password/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      // Show a success message
      alert('Password reset successfully');
      document.location.replace('/login');
    } catch (error) {
      console.error(error);
    }
  });
}



