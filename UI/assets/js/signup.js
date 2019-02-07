/* eslint-disable */
baseUrl = "https://politicom.herokuapp.com/api/v1/auth";
localUrl = "http://localhost:8000/api/v1/";
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let firstName = document.getElementById('fName').value;
  let lastName = document.getElementById('lName').value;
  let otherName = document.getElementById('oName').value;
  let email = document.getElementById('email').value;
  let phonenumber = document.getElementById('pNumber').value;
  let password = document.getElementById('password').value;
  let cPassword = document.getElementById('cPassword').value;
  const userInput = {
    firstName, lastName, otherName, email, phonenumber, password, cPassword
  };

  fetch(`${localUrl}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInput),
  }).then((res) => res.json())
    .then((data) => {
      window.location = './userProfile.html';
  })
  .catch(err => console.log(err));
});
