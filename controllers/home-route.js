const { UserProfile } = require('../models');

const router = require('express').Router();

// const { User } = require('../models');


// GET homepage
router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
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
// GET profile
router.get('/profile/:username', (req, res) => {
  UserProfile.findOne({
    where: {
      username: req.params.username,
    }
  })
    .then(dbUserProfileData => {
      if (!dbUserProfileData) {
        res.status(404).json({ message: 'No user profile found with this username' });
        return;
      }

      const userProfile = dbUserProfileData.get({ plain: true });

      res.render('profile', {
        userProfile,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/workout-history', (req, res) => {
  // If the user is already logged in, redirect the request to another route

  res.render('workout-history');
});

module.exports = router;