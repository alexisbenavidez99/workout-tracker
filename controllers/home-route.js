const { UserProfile, Workout } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

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
router.get('/profile/:username', withAuth, (req, res) => {
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

      Workout.findAll({
        where: {
          user_id: req.session.user_id,
        },
      })
        .then(dbWorkoutData => {
          const workouts = dbWorkoutData.map(workout => workout.get({ plain: true }));
          res.render('profile',{
            userProfile,
            workouts,
            loggedIn: req.session.loggedIn,
          });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/workout-history', (req, res) => {
  // find all workouts posted by the user
  // render the workout history page
  Workout.findAll({
    where: {
      user_id: req.session.user_id,
    },
  })
    .then(dbWorkoutData => {
      const workouts = dbWorkoutData.map(workout => workout.get({ plain: true }));
      res.render('workout-history', {
        workouts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});





router.get('/builder', (req, res) => {
  // If the user is already logged in, redirect the request to another route

  res.render('builder', {
    loggedIn: req.session.loggedIn,
  });
});


module.exports = router;