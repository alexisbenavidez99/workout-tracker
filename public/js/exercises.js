// Exercise API Call
// let muscle = 'biceps';
// $.ajax({
//   method: 'GET',
//   url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
//   headers: { 'X-Api-Key': 'Y+nxTPsyrkSvnAOH9CKTkQ==dnVOTmqx3Q0WpvJT' },
//   contentType: 'application/json',
//   success: function (result) {
//     console.log(result);
//   },
//   error: function ajaxError(jqXHR) {
//     console.error('Error: ', jqXHR.responseText);
//   },
// });

// querySelectorAll is used to select all the elements with the #font-icon id.
// The event listener click is then added to each button, and when the button is clicked,
// it finds the nearest ancestor element with the .histroy-card class and removes it using the remove method.

const deleteButtons = document.querySelectorAll('#delete-icon');
const id = document.querySelector('#id').textContent;
deleteButtons.forEach(button => {
  button.addEventListener('click', async () => {
    // delete fetch for workout history
    const response = await fetch('/api/workouts/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      console.log('Workout deleted');
    } else {
      console.log('Failed to delete workout');
    }
    const card = button.closest('.history-card');
    card.remove();
  });
});
