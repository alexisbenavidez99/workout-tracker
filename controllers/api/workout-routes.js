const router = require('express').Router();
const { Workout } = require('../../models');
const withAuth = require('../../utils/auth');

// creat a new workout for history
router.post('/', async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      name: req.body.workoutName,
      type_exercise: req.body.exercise,
      date: req.body.workoutDate,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWorkout);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;