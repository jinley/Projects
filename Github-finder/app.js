// Init Github
const github = new Github; // initiate github
// Init UI
const ui = new UI;


// Search input
const searchUser = document.getElementById('searchUser');

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value; //event.target : 실제 이벤트가 시작된 '타깃' 요소

  if(userText !== '') {
    // Make http call
    github.getUser(userText) // return promise
    .then(data => {
        if(data.profile.message === 'Not Found') {
        // Show alert
        ui.showAlert('User no found', 'alert alert-danger');
        } else {
        // Show profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
        }
    })
  } else {
    // Clear profile
    ui.clearProfile();
  }
});