//  logout function
const logoutEl = document.querySelector('#signout');
const logout = async (req, res) => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    alert('You are now logged out!');
    document.location.reload();
  } else {

    alert('Failed to logout...You are not logged in.');
  }

  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
};
//  add event listener to the logout button
if (logoutEl) {
  logoutEl.addEventListener('click', logout);
}