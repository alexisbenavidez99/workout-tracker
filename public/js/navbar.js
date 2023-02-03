const ul = document.querySelector('#navbar-ul');
const btn = document.querySelector('#hamburger-btn');

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
document.getElementById('close-workout').addEventListener('click', function() {
  console.log('check');
  document.querySelector('#workout-history-modal').classList.toggle('hidden');
});

// Hide the modal when clicking outside of it
window.addEventListener('click', function(event) {
  if (event.target === document.getElementById('workout-history-modal')) {
    document.querySelector('#workout-history-modal').classList.toggle('hidden');
  }
});

document.getElementById('save-workout').addEventListener('click', async function() {


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

