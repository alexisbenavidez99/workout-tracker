const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const workoutRoutes = require('./workout-routes.js');


router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);


module.exports = router;
