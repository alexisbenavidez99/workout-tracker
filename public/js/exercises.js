// Exercise API Call
let muscle = 'biceps';
$.ajax({
  method: 'GET',
  url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
  headers: { 'X-Api-Key': 'Y+nxTPsyrkSvnAOH9CKTkQ==dnVOTmqx3Q0WpvJT' },
  contentType: 'application/json',
  success: function (result) {
    console.log(result);
  },
  error: function ajaxError(jqXHR) {
    console.error('Error: ', jqXHR.responseText);
  },
});

// // Workout History page delete function
// $('#font-icon').click(function() {
//   $('.history-card').remove();
// });

// querySelectorAll is used to select all the elements with the #font-icon id.
// The event listener click is then added to each button, and when the button is clicked,
// it finds the nearest ancestor element with the .histroy-card class and removes it using the remove method.

const deleteButtons = document.querySelectorAll('#font-icon');

deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.history-card');
    card.remove();
  });
});
