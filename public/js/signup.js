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
  const nickname = 'The Buff Boy Who Lived';
  const bio = 'Hey there, it\'s your pal Harry Potter. You might have heard of me, the one and only child to survive the killing curse, Avada Kedavra. I\'m also the hero of the Wizarding World, having defeated the most powerful dark wizard of all time, Lord Voldemort. And let me tell you, it wasn\'t easy, but I did it. Oh, and did I mention I\'m the only known person to have ever returned from the dead? Yeah, pretty wild, right?';
  const gender= 'not specified';
  const current_weight = '0';
  const height = '0';
  const emergency_contact_number = 'Hedwig';
  const birthday = 'July 31, 1980';
  const join_date= new Date().toLocaleDateString();

  // go ahead and create an default profile for the user

  const response = await fetch('/api/users/profile', {
    method: 'POST',
    body: JSON.stringify({ username, gender, profile_image, first_name, last_name, nickname, bio, current_weight, height, emergency_contact_number, birthday, join_date, email}),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    sessionStorage.setItem('username', username);
    document.location.replace(`/profile/${username}`);
  } else {
    return;
  }

};





if(createProfileButton){
  createProfileButton.addEventListener('click', signupHandler);
}