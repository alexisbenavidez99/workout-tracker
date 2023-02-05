const ul = document.querySelector('#navbar-ul');
const btn = document.querySelector('#hamburger-btn');
const closeWorkoutHistoryModal = document.getElementById('close-workout');
const saveWorkout = document.getElementById('save-workout');


btn.addEventListener('click', () => {
  const classNamesArray = Array.from(ul.classList);

  if (classNamesArray.includes('hidden')) {
    ul.classList.remove('hidden');
    ul.classList.remove('sm:hidden');
  } else {
    ul.classList.add('hidden');
    ul.classList.add('sm:hidden');
  }
});

const workoutHistoryModalButton = document.querySelector('#workoutHistoryModalButton');
if(workoutHistoryModalButton){
  workoutHistoryModalButton.addEventListener('click', () => {
    document.querySelector('#workout-history-modal').classList.toggle('hidden');
  });
}


// Hide the modal
if(closeWorkoutHistoryModal){
  closeWorkoutHistoryModal.addEventListener('click', function() {
    console.log('check');
    document.querySelector('#workout-history-modal').classList.toggle('hidden');
  });
}

// Hide the modal when clicking outside of it
window.addEventListener('click', function(event) {
  if (event.target === document.getElementById('workout-history-modal')) {
    document.querySelector('#workout-history-modal').classList.toggle('hidden');
  }
});
if (saveWorkout) {
  saveWorkout.addEventListener('click', async function() {


    const workoutName = document.getElementById('workoutName').value;
    const exercise = document.getElementById('exercise').value;
    const workoutDate = document.getElementById('workoutDate').value;

    //   creat a post route for a workout model
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify({ workoutName, exercise, workoutDate}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('saved workout');
    } else {
      alert('Failed to save workout');
    }



    var workoutHistoryCard = `
  <div class="history-card max-w-sm w-full lg:max-w-full lg:flex">
    <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal m-8 shadow-2xl w-1/4">
      <div class="mb-8">
        <div class="text-gray-900 font-bold text-xl mb-2">${workoutName}</div>
        <p class="text-gray-700 text-base">${exercise}</p>
        <p class="text-gray-700 text-base">Workout Date: ${workoutDate}</p>
        
        
      </div>
    </div>
  </div>
`;


    document.querySelector('#workout-history-modal').classList.toggle('hidden');
    document.getElementById('addWorkout').insertAdjacentHTML('beforeend', workoutHistoryCard);
  });
}


// i got bored so i made this
// var timer = setTimeout(function () {
// var dumbbell = document.createElement('div');
// dumbbell.innerHTML = 'Are you still there?';
// dumbbell.style.position = 'absolute';
// dumbbell.style.left = '0px';
// dumbbell.style.top = '0px';
// document.body.appendChild(dumbbell);
// var x = 0;
// var y = 0;
// var direction = 1;
// var timer = setInterval(function () {
//   x += direction;
//   dumbbell.style.left = x + 'px';
//   if (x > window.innerWidth - 100) {
//     direction = -1;
//   } else if (x < 0) {
//     direction = 1;
//   }
// }, 10);
// document.body.onmousemove = function () {
//   clearInterval(timer);
//   document.body.removeChild(dumbbell);
// };

// /* make the text large */
// dumbbell.style.fontSize = '100px';

// /* bounce it diagonal */
// var x = 0;
// var y = 0;
// var direction = 1;
// var timer = setInterval(function () {
//   x += direction;
//   y += direction;
//   dumbbell.style.left = x + 'px';
//   dumbbell.style.top = y + 'px';
//   if (x > window.innerWidth - 100) {
//     direction = -1;
//   } else if (x < 0) {
//     direction = 1;
//   }
// }, 10);
// }, 10000);