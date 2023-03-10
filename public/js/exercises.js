
// querySelectorAll is used to select all the elements with the #font-icon id.
// The event listener click is then added to each button, and when the button is clicked,
// it finds the nearest ancestor element with the .histroy-card class and removes it using the remove method.

const deleteButtons = document.querySelectorAll('#delete-icon');
const idElement = document.querySelector('#id');
if (idElement) {
  const id = idElement.textContent;
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
} else {
  console.log('Element with ID "id" not found');
}