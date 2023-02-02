const router = require('express').Router();

// GET homepage
router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.render('homepage'), {
      loggedIn: req.session.loggedIn,
    };
  } else {
    res.render('homepage');
  }
});

// GET login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// GET signup
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.get('/profile', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  res.render('profile');
});

router.get('/workout-history', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  res.render('workout-history');
});

router.get('/builder', (req, res) => {
  // If the user is already logged in, redirect the request to another route

  res.render('builder');
});

module.exports = router;