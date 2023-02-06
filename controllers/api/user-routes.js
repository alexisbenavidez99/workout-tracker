const router = require('express').Router();
const { User, UserProfile } = require('../../models');
const withAuth = require('../../utils/auth');
const sendPasswordResetEmail = require('../../utils/email');
const bcrypt = require('bcrypt');
const crypto = require('crypto');



//  create a new user
router.post('/', async (req, res) => {
  try {
    // check if email is already in use
    const emailTaken = await User.findOne({ where: { email: req.body.email } });
    if (emailTaken) {
      return res.status(400).json({ message: 'Email address is already in use' });
    }
    // check if username is already in use
    const usernameTaken = await User.findOne({ where: { username: req.body.username } });
    if (usernameTaken) {
      return res.status(400).json({ message: 'Username is already in use' });
    }
    // create new user
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//  login

router.post('/login', async (req, res) => {
  try {
    // Check if email and password fields are present
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: 'Both username and password fields are required' });
      return;
    }

    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//  logout

router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).json({ message: 'You are not currently logged in' });
  }
});

// user profile creation

router.post('/profile', withAuth, async (req, res) => {
  try {
    const userProfileData = await UserProfile.create(
      {
        username: req.session.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        curent_weight: req.body.current_weight,
        profile_image: req.body.profile_image,
        nickname: req.body.nickname,
        bio: req.body.bio,
        height: req.body.height,
        emergency_contact_number: req.body.emergency_contact_number,
        birthday: req.body.birthday,
        join_date: req.body.join_date,
        gender: req.body.gender,
        email: req.body.email,
      });
    res.status(200).json(userProfileData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update user profile
router.put('/profile/:username', withAuth, async (req, res) => {
  try {
    const userProfileData = await UserProfile.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        curent_weight: req.body.current_weight,
        profile_image: req.body.profile_image,
        nickname: req.body.nickname,
        bio: req.body.bio,
        height: req.body.height,
        emergency_contact_number: req.body.emergency_contact_number,
        birthday: req.body.birthday,
        gender: req.body.gender,
        weight_loss_goal: req.body.weight_goal,
      },
      {
        where: {
          username: req.params.username,
        },
      });
    res.status(200).json(userProfileData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// POST route for forgot password
router.post('/forgot-password', (req, res) => {
  const email = req.body.email;


  // Check if the email address exists in the database
  User.findOne({ where: { email }})
    .then(user => {
      if (!user) {
        // Return an error if the email address doesn't exist
        res.status(400).json({ message: 'No user found with this email address' });
        return;
      }

      // Generate a password reset token
      const token = crypto.randomBytes(16).toString('hex');

      // Save the password reset token in the database
      user.update({ passwordResetToken: token, passwordResetExpires: Date.now() + 3600000 });

      // Send a password reset email to the user
      sendPasswordResetEmail(email, token);

      res.status(200).json({ message: 'Password reset email sent' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST route for new password
// POST route for new password
router.put('/reset-password/:user', (req, res) => {
  user - req.params.user;


  // Hash the new password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const password = req.body.password;
  console.log('password: ', password);
  console.log('hashedPassword: ', hashedPassword);
  // Update the user's password in the database
  User.update({ password: hashedPassword }, { where: { username: user }})
    .then(() => {
      res.status(200).json({ message: 'Password updated' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;