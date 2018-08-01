var check = function() {
  if ($('#userPassSignup').val() == $('#userPassConfirm').val()) {
    $('#message').css("color" , 'green');
    $('#message').text ('Passwords match');
    $(`#signupSubmit`).attr(`disabled`, false);
  } else {
    $('#message').css("color" , 'red');
    $('#message').text('Passwords do not match') ;
    $(`#signupSubmit`).attr(`disabled`, true);
  }
}

$(document).ready(function() {
  $(`#signupSubmit`).on("click", function(event) {
    event.preventDefault();
    console.log("signupSubmit pressed");

    // GET an array of all users
    $.get("/api/users", function(res){
      console.log(res);

      var nameTaken = false;

      //loop through the users array
      for (var i in res) {
        // check if username being entered
        if (res.login == $(`#usernameSignup`).value) {
          nameTaken = true;
          $(`#usernameMessage`).html("Username already taken!");
        }
        
      }

      if(!nameTaken){ $(`#usernameMessage`).html("Username available!");  }


    })
  }); 
})
