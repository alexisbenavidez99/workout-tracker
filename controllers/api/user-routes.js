const router = require('express').Router();
const { User } = require('../../models');

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
        console.log(err);
        res.status(400).json(err);
    }
});

//  login

router.post('/login', async (req, res) => {
    try {
        // Check if email and password fields are present
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ message: 'Both email and password fields are required' });
            return;
        }

        const userData = await User.findOne({ where: { email: req.body.email } });
    
        if (!userData) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
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
        console.log(err)
        res.status(400).json(err);
    }
});

//  logout

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
    req.session.destroy(() => {
    res.status(204).end();
    });
    } else {
    res.status(404).json({ message: 'You are not currently logged in' });
    }
    });
    
    module.exports = router;

