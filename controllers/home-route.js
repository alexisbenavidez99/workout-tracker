const router = require('express').Router();

const { User } = require('../models');


// GET homepage
router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.render('homepage');
    return;
  }

  res.render('homepage');
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


module.exports = router;