const createProfileButton = document.querySelector('#create-profile');

const signupHandler = async (event) => {
  event.preventDefault();
  console.log('signupHandler');
  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert('You are now signed up! Logging you in...');
      document.location.replace('/login');
    } else {
      // alert response;
      alert('Email or Username already exists. Please try again.');
    }
  }

  const profile_image = 'https://www.looper.com/img/gallery/harry-potter-is-getting-something-huge-in-2022/intro-1625353292.jpg';
  const first_name = 'Harry';
  const last_name = 'Potter';
  const nickname = 'The Boy Who Lived ';
  const bio = 'Hero of the Wizarding World, Harry Potter is the only child and son of James and Lily Potter (née Evans), both members of the original Order of the Phoenix. Harry was also the first and only child to survive the killing curse, Avada Kedavra, which was meant for him. He is also the only known person to have ever defeated Lord Voldemort, who was the most powerful dark wizard of all time. Harry is also the only known person to have ever returned from the dead.';
  const gender= 'not specified';
  const current_weight = '0';
  const height = '0';
  const emergency_contact_number = 'Whats a phone number?';
  const birthday = 'July 31, 1980';
  const join_date= new Date().toLocaleDateString();
  // go ahead and create an default profile for the user

  const response = await fetch('/api/users/profile', {
    method: 'POST',
    body: JSON.stringify({ username, gender, profile_image, first_name, last_name, nickname, bio, current_weight, height, emergency_contact_number, birthday, join_date, email}),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace(`/profile/${username}`);
  } else {
    alert('Failed to update profile.');
  }

};





if(createProfileButton){
  createProfileButton.addEventListener('click', signupHandler);
}