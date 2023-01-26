//  logout function
const logout = async (req, res) => {
  const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
      document.location.replace('/');
  } else {
      alert("Failed to logout");
  }

  if (req.session.loggedIn) {
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
};
document.querySelector('#logout').addEventListener('click', logout);