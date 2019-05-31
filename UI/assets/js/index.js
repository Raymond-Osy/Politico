/* eslint-disable */
// Get the modal
let modal = document.getElementById('myModal');
let deleteBtn = document.getElementsByClassName('deleteBtn')
let confirmYes = document.getElementById('btn-yes');
let confirmNo = document.getElementById('btn-no');
let span = document.getElementsByClassName("close")[0];

for(i=0; i<deleteBtn.length; i++){
  let btn = deleteBtn[i];
  btn.onclick = function() {
    modal.style.display = "block";
  }
}

span.onclick = function() {
  modal.style.display = "none";
}
confirmYes.onclick = function() {
  modal.style.display = "none";
}
confirmNo.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}