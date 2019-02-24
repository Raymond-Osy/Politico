/* eslint-disable */
baseUrl = "https://politicom.herokuapp.com/api/v1/auth/";
localUrl = "http://localhost:8000/api/v1/auth/";
const signinForm = document.getElementById('signinForm');

signinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let authResponse = document.getElementById('response');
  
  const userInput = {
    email, password
  };

  //Consume  API endpoint to /login
  fetch(`${localUrl}login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInput),
  }).then((res) => res.json())
    .then((data) => {
        if(data.status === 409){
            authResponse.innerHTML = 'Incorrect email or password';
            authResponse.style.color = 'red';
        }
        if (data.status === 200){
            window.localStorage.setItem('token', data.token);
            authResponse.innerHTML = 'Welcome Back!';
            authResponse.style.color = 'green';
            if (data.data[0].user.isadmin === true) {
                setTimeout(() => {
                    window.location.assign('./party.html');
                }, 5000);
            } else {
                setTimeout(() => {
                    window.location.assign('./userProfile.html');
                }, 5000);
            }
        }
      console.log(data);
  })
  .catch(err => {
    if(err){
      authResponse.innerHTML = 'Something went wrong, please try again later';
      authResponse.style.color = 'red';
    }
    console.log(err)
  });
});
