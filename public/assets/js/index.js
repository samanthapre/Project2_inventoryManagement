var check = function () {
  if ($('#userPassSignup').val() == $('#userPassConfirm').val()) {
    $('#message').css("color", 'green');
    $('#message').text('Passwords match');
    $(`#signupSubmit`).attr(`disabled`, false);
  } else {
    $('#message').css("color", 'red');
    $('#message').text('Passwords do not match');
    $(`#signupSubmit`).attr(`disabled`, true);
  }
}

$(document).ready(function () {
  $(`#signupSubmit`).on("click", function (event) {
    event.preventDefault();
    console.log("signupSubmit pressed");

    if ($(`#usernameSignup`).val().includes(" ")) {
      $(`#usernameMessage`).css("color", "red");
      $(`#usernameMessage`).html("Username cannot include spaces");
    }
    
    else {
      // GET an array of all users
      $.get("/api/users", function (res) {
        console.log(res);

        var nameTaken = false;

        //loop through the users array
        for (var i in res) {
          // check if username being entered
          if (res.login == $(`#usernameSignup`).val()) {
            nameTaken = true;
            $(`#usernameMessage`).html("Username already taken!");
          }

        }

        if (!nameTaken) {
          console.log("name not taken")

          //  GERNERATE SALT ========================
          function dec2hex(dec) {
            return ('0' + dec.toString(16)).substr(-2)
          }

          // generateId :: Integer -> String
          function generateId(len) {
            var arr = new Uint8Array((len || 40) / 2)
            window.crypto.getRandomValues(arr)
            return Array.from(arr, dec2hex).join('')
          }

          var curSalt = generateId(10);
          // ===========================================

          var curPass = $(`#userPassSignup`).val()
          var curHash = sha256(curPass + curSalt);

          console.log(curHash);
          console.log(curSalt);
          console.log($(`#usernameSignup`).val());

          var newUser = {
            name: $(`#nameSignup`).val(),
            login: $(`#usernameSignup`).val(),
            hash: curHash,
            salt: curSalt
          }

          $.post("/api/user", newUser)
            .then(function (res) {
              console.log(res);
            });

        } // end if
      }); // get request
      // redirect to products page
      window.location.replace("/products")
    }
  }); // signupButton pressed
}); // on page load

