const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', async (event) => {
    const passwordInput = document.querySelector('#password').value.trim();
    const confirmPasswordInput = document.querySelector('#confirmPassword').value.trim();
    const user = document.querySelector('#user').textContent.trim();

    event.preventDefault();


    const password = passwordInput;
    const confirmPassword = confirmPasswordInput;

    if (password !== confirmPassword) {
      // Show an error message
      showErrorModal('Passwords do not match.');
      return;
    }




    try {
      const response = await fetch(`/api/users/reset-password/${user}`, {
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
      showErrorModal('Password reset successful. Logging you in...');
      document.location.replace('/login');
    } catch (error) {
      console.error(error);
    }
  });
}