/* eslint-disable */
baseUrl = "https://politicom.herokuapp.com/api/v1/auth";
localUrl = "http://localhost:8000/api/v1/auth/";
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let firstname = document.getElementById('fName').value;
  let lastname = document.getElementById('lName').value;
  let othername = document.getElementById('oName').value;
  let email = document.getElementById('email').value;
  let phoneNumber = document.getElementById('pNumber').value;
  let passportUrl = document.getElementById('passport').value;
  let password = document.getElementById('password').value;
  let cPassword = document.getElementById('cPassword').value;
  let invalidFirst = document.getElementById('invalidF');
  let invalidLast = document.getElementById('invalidL');
  let invalidOther = document.getElementById('invalidO');
  let invalidPass = document.getElementById('invalidP');
  let invalidEmail = document.getElementById('invalidE');
  let authResponse = document.getElementById('success');
  let confirmPassValue = document.getElementById('confirmPass');
  
  const userInput = {
    firstname, lastname, othername, email, phoneNumber, passportUrl, password, cPassword
  };

  // Validation
  function containsNumber(value) {
    return /\d/.test(value);
  }

  function validPassword(value) {
    return value.length >= 5;
  }

  if(containsNumber(userInput.firstname)){
    invalidFirst.innerHTML = '* Firstname Must contain letters only';
    invalidFirst.style.color = 'red';
    return false;
  }

  if(containsNumber(userInput.lastname)){
    invalidLast.innerHTML = '* Lastname Must contain letters only';
    invalidLast.style.color = 'red';
    return false;
  }

  if(containsNumber(userInput.othername)){
    invalidOther.innerHTML = '* Othername Must contain letters only';
    invalidOther.style.color = 'red';
    return false;
  }

  if(!validPassword(userInput.password)){
    invalidPass.innerHTML = '* Password Must be at least 5 characters long';
    invalidPass.style.color = 'red';
    return false;
  }
  if (password !== cPassword) {
    confirmPassValue.innerHTML = '* Password does not match, Please retype';
    confirmPassValue.style.color = 'red';
    return false;
  }

  //Consume  API endpoint to /signup
  fetch(`${localUrl}signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInput),
  }).then((res) => res.json())
    .then((data) => {
        if(data.status === 409){
          invalidEmail.innerHTML = 'Email address already exist';
          invalidEmail.style.color = 'red';
        }
        if (data.status === 201){
          window.localStorage.setItem('token', data.token);
          authResponse.innerHTML = 'Account created successfully';
          authResponse.style.color = 'green';
          setTimeout(() => {
            window.location.assign('./userProfile.html');
          }, 5000);
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
