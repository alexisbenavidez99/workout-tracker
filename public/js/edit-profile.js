
  const closeButtons = document.querySelector('.close');
  const saveProfile = document.querySelector('#save-profile');


const editProfile = async (event) => {
  event.preventDefault();
  document.querySelector('#myModal').classList.toggle('hidden');
};

document
  .querySelector('#edit-profile')
  .addEventListener('click', editProfile);
const closeModals = async (event) => {
  event.preventDefault();
  console.log('close');
  document.querySelector('#myModal').classList.toggle('hidden');
};

const savedButtonHandler = async (event) => {
  event.preventDefault();
  console.log('hi');
  //grab all data from the form
  const imageUrl = document.querySelector('#imageUrl').value.trim();
  const firstName = document.querySelector('#firstName').value.trim();
  const lastName = document.querySelector('#lastName').value.trim();
  const nickname = document.querySelector('#nickname').value.trim();
  const bio = document.querySelector('#bio').value.trim();
  const weight = document.querySelector('#weight').value.trim();
  const height = document.querySelector('#height').value.trim();
  const emergency = document.querySelector('#emergency').value.trim();
  const birthday = document.querySelector('#birthday').value.trim();


  // write a post route to udate the users profile
  if (imageUrl && firstName && lastName && nickname && bio && weight && emergency) {
    const response = await fetch('/api/users/profile', {
      method: 'POST',
      body: JSON.stringify({ imageUrl, firstName, lastName, nickname, bio, weight, height, emergency, birthday }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update profile.');
    }
  }
};

document.getElementById('close-button').addEventListener('click', closeModals);
closeButtons.addEventListener('click', closeModals);
saveProfile.addEventListener('click', savedButtonHandler);