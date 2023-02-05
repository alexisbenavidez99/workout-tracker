const router = require('express').Router();
const { Workout } = require('../../models');
const withAuth = require('../../utils/auth');

// creat a new workout for history
router.post('/', withAuth, async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      name: req.body.workoutName,
      type_exercise: req.body.exerciseType,
      date: req.body.date,
      muscle_group: req.body.muscleGroup,
      sets: req.body.sets,
      reps: req.body.reps,
      rating: req.body.rating,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWorkout);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// delete a workout
router.delete('/delete', withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.destroy({
      where: {
        id: req.body.id,
        user_id: req.session.user_id,
      },
    });

    if (!workoutData) {
      res.status(404).json({ message: 'No workout found with this id!' });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;