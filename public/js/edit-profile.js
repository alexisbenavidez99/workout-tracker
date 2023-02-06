
const closeButtons = document.querySelector('.close');
const saveProfile = document.querySelector('#save-profile');
const closeButton = document.querySelector('#close-button');
const editProfieButton = document.querySelector('#edit-profile');
const myProfileButton = document.querySelector('#profile');
const modal = document.querySelector('#myModal');


const username = sessionStorage.getItem('username');
const myProfileHandler = async (event) => {
  event.preventDefault();
  console.log('myProfileHandler');
  document.location.replace(`/profile/${username}`);
};

if (myProfileButton) {
  myProfileButton.addEventListener('click', myProfileHandler);
}

const editProfile = async (event) => {
  event.preventDefault();
  console.log('editProfile');
  document.querySelector('#myModal').style.display = 'block';
};

if (editProfieButton) {
  editProfieButton.addEventListener('click', editProfile);
}

const closeModals = async (event) => {
  event.preventDefault();
  console.log('close');
  if (modal) {
    modal.style.display = 'none';
  }
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
  const gender = document.querySelector('#gender').value.trim();




  // write a post route to udate the users profile

  const response = await fetch(`/api/users/profile/${username}`, {
    method: 'PUT',
    body: JSON.stringify({ profile_image, first_name, last_name, nickname, bio, current_weight, height, emergency_contact_number, birthday, gender }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace(`/profile/${username}`);
  } else {
    showErrorModal('Failed to update profile.');
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
