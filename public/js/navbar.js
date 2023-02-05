const ul = document.querySelector('#navbar-ul');
const btn = document.querySelector('#hamburger-btn');
const closeWorkoutHistoryModal = document.getElementById('close-workout');
const saveWorkout = document.getElementById('save-workout');


btn.addEventListener('click', () => {
  const classNamesArray = Array.from(ul.classList);

  if (classNamesArray.includes('sm:hidden')) {
    ul.classList.remove('sm:hidden');
    ul.style.display = 'block';
  } else {
    ul.classList.add('sm:hidden');
    ul.style.display = 'none';
  }
});

const workoutHistoryModalButton = document.querySelector('#workoutHistoryModalButton');
if (workoutHistoryModalButton) {
  workoutHistoryModalButton.addEventListener('click', () => {
    document.querySelector('#workout-history-modal').classList.toggle('hidden');
  });
}


// Hide the modal
if (closeWorkoutHistoryModal) {
  closeWorkoutHistoryModal.addEventListener('click', function () {
    console.log('check');
    document.querySelector('#workout-history-modal').classList.toggle('hidden');
  });
}

// Hide the modal when clicking outside of it
window.addEventListener('click', function (event) {
  if (event.target === document.getElementById('workout-history-modal')) {
    document.querySelector('#workout-history-modal').classList.toggle('hidden');
  }
});
if (saveWorkout) {
  saveWorkout.addEventListener('click', async function () {
    console.log('save workout');
    const exerciseType = document.querySelector('#exerciseType').value;
    const muscleGroup = document.querySelector('#muscleGroup').value;
    const sets = document.querySelector('#sets').value;
    const reps = document.querySelector('#reps').value;
    const rating = document.querySelector('#rating').value;
    const date = document.querySelector('#date').value;
    const workoutName = document.querySelector('#workoutName').value;


    //   creat a post route for a workout model
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify({ exerciseType, muscleGroup, sets, reps, rating, date, workoutName }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
      console.log('saved workout');
    } else {
      showErrorModal('Failed to save workout');
    }






    document.querySelector('#workout-history-modal').classList.toggle('hidden');
  });
}