/* eslint-disable */
baseUrl = "https://politicom.herokuapp.com/api/v1/parties/";
localUrl = "http://localhost:8000/api/v1/parties/";
createParty = document.getElementById('createPartyForm');

createParty.addEventListener('submit', (e)=> {
    e.preventDefault();
    let partyName = document.getElementById('partyName').value;
    let hqName = document.getElementById('hqName').value;
    let logoImg = document.getElementById('logoImg').value;
    let invalidName = document.getElementById('invalidName');
    let invalidHq = document.getElementById('invalidName');


    const userInput = {partyName, hqName, logoImg};
    // const token = window.localStorage.token;

    // Validation
    function containsNumber(value) {
        return /\d/.test(value);
    }

    if(containsNumber(userInput.partyName)){
        invalidName.innerHTML = "Party name must contain letters only";
        invalidName.style.color = 'red';
        return false;
    }
    if(containsNumber(userInput.hqName)){
        invalidName.innerHTML = "Address name must contain letters only";
        invalidName.style.color = 'red';
        return false;
    }
    
    let token = window.localStorage.getItem('token');
    // consume create party endpoint to /parties
    fetch(`${localUrl}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(userInput),
      }).then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err)
        })
});

