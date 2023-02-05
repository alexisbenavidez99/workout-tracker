//  logout function
const logoutEl = document.querySelector('#signout');
const logout = async (req, res) => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    showErrorModal('You are now logged out.');
    res.redirect('/');
  } else {

    showErrorModal('Failed to log out, you are not logged in.');
  }


  req.session.destroy(() => {
    res.status(204).end();

  });
};
//  add event listener to the logout button
if (logoutEl) {
  logoutEl.addEventListener('click', logout);
}