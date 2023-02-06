const createProfileButton = document.querySelector('#create-profile');
const errorModal = document.querySelector('#errorModal');
const modalBody = document.querySelector('#modal-body');
const closeModal = document.querySelector('#closeModal');
const closeModal2 = document.querySelector('.close-modal');

const showErrorModal = (message) => {
  if (!modalBody) {
    return;
  }
  errorModal.style.display = 'block';
  modalBody.innerHTML = message;
};

const hideErrorModal = () => {
  errorModal.style.display = 'none';
  modalBody.innerHTML = '';
};

if (closeModal) {
  closeModal.addEventListener('click', () => {
    hideErrorModal();
  });
}

if (closeModal2) {
  closeModal2.addEventListener('click', () => {
    hideErrorModal();
  });
}
const createProfile = async (username, email) => {
  const profile_image = 'https://www.looper.com/img/gallery/harry-potter-is-getting-something-huge-in-2022/intro-1625353292.jpg';
  const first_name = 'Harry';
  const last_name = 'Potter';
  const nickname = 'The Buff Boy Who Lived';
  const bio = 'Hey there, it\'s your pal Harry Potter. You might have heard of me, the one and only child to survive the killing curse, Avada Kedavra. I\'m also the hero of the Wizarding World, having defeated the most powerful dark wizard of all time, Lord Voldemort. And let me tell you, it wasn\'t easy, but I did it. Oh, and did I mention I\'m the only known person to have ever returned from the dead? Yeah, pretty wild, right?';
  const gender = 'not specified';
  const current_weight = '0';
  const height = '0';
  const emergency_contact_number = 'Hedwig';
  const birthday = 'July 31, 1980';
  const join_date = new Date().toLocaleDateString();

  const response = await fetch('/api/users/profile', {
    method: 'POST',
    body: JSON.stringify({ username, gender, profile_image, first_name, last_name, nickname, bio, current_weight, height, emergency_contact_number, birthday, join_date, email }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    sessionStorage.setItem('username', username);
  } else {
    showErrorModal('Failed to create profile.');
    return;
  }
};

const signupHandler = async (event) => {
  try {
    event.preventDefault();
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (!username || !email || !password) {
      showErrorModal('Please fill out all fields.');
      return;
    }
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    } else {
      showErrorModal('You are now signed up! Logging you in...');
      await createProfile(username, email);
      document.location.replace(`/profile/${username}`);
    }
  } catch (error) {
    showErrorModal(error.message);
  }
};


// if (createProfileButton) is falsey redefined to explain the exact scenario
if (createProfileButton !== null) {
  createProfileButton.addEventListener('click', signupHandler);
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    signupHandler(event);
  }
});