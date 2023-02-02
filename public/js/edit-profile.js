
const closeButtons = document.querySelector('.close');
const saveProfile = document.querySelector('#save-profile');
const closeButton = document.querySelector('#close-button');

const username= sessionStorage.getItem('username');
const myProfileHandler = async (event) => {
  event.preventDefault();
  console.log('myProfileHandler');
  document.location.replace(`/profile/${username}`);
};

document.querySelector('#profile').addEventListener('click', myProfileHandler);


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
  const profile_image = document.querySelector('#imageUrl').value.trim();
  const first_name = document.querySelector('#firstName').value.trim();
  const last_name = document.querySelector('#lastName').value.trim();
  const nickname = document.querySelector('#nickname').value.trim();
  const bio = document.querySelector('#bio').value.trim();
  const current_weight = document.querySelector('#weight').value.trim();
  const height = document.querySelector('#height').value.trim();
  const emergency_contact_number = document.querySelector('#emergency').value.trim();
  const birthday = document.querySelector('#birthday').value.trim();


  // write a post route to udate the users profile
  if (profile_image && first_name && last_name && nickname && bio && current_weight && height && emergency_contact_number && birthday) {
    const response = await fetch(`/api/users/profile/${username}`, {
      method: 'PUT',
      body: JSON.stringify({ profile_image, first_name, last_name, nickname, bio, current_weight, height, emergency_contact_number, birthday }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace(`/profile/${username}`);
    } else {
      alert('Failed to update profile.');
    }
  }
};
if (closeButton) {
  closeButton.addEventListener('click', closeModals);
}

if (closeButtons) {
  closeButtons.addEventListener('click', closeModals);
}

if (saveProfile) {
  saveProfile.addEventListener('click', savedButtonHandler);
}
