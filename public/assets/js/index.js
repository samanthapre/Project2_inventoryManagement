var check = function() {
    if (document.getElementById('userPassSignup').value == document.getElementById('userPassConfirm').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'Passwords match';
      $(`#signupSubmit`).attr(`disabled`, false);
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'Passwords do not match';
      $(`#signupSubmit`).attr(`disabled`, true);
    }
  }
