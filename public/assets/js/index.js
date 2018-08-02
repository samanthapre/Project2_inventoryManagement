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

  // create new user button pressed
  $(`#signupSubmit`).on("click", function (event) {
    event.preventDefault();
    //console.log("signupSubmit pressed");

    // check for space character
    if ($(`#usernameSignup`).val().includes(" ")) {
      $(`#usernameMessage`).css("color", "red");
      $(`#usernameMessage`).html("Username cannot include spaces");
    }
    else { // if username has no whitespace

      var newUser = $(`#usernameSignup`).val();
      var newUsername = $(`#usernameSignup`).val();


      // GERNERATE SALT ========================
      function dec2hex(dec) {
        return ('0' + dec.toString(16)).substr(-2)
      }

      // generateId :: Integer -> String
      function generateId(len) {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, dec2hex).join('')
      }

      // create a new random 10 digit salt for the new user
      var curSalt = generateId(10);
      // ===========================================

      var curPass = $(`#userPassSignup`).val() /// get the user password
      var curHash = sha256(curPass + curSalt); // encrypt the password and salt

      var newUser = {
        name: $(`#nameSignup`).val(),
        login: $(`#usernameSignup`).val(),
        hash: curHash,
        salt: curSalt
      }

      // attempt to add new user to the database 
      // if username is unique, server will add to database
      // otherwise, show error to user
      $.post("/api/user", newUser)
        .then(function (res) {
          console.log(res);

          if (res == "true") {
            alert("User created!");
            window.location.replace("/products");
          }
          else {
            $(`#usernameMessage`).css("color", "red");
            $(`#usernameMessage`).html("Username already taken!");
          }


        });


      // ======OLD BUT SHOULD WORK===========
      // GET an array of all users
      //   $.get("/api/users", function (res) {
      //     console.log(res); // log users

      //     var nameTaken = false; // flag for unique username

      //     // Check if new username/login-name is unique to the database
      //     for (var i in res) {

      //       // check if username being entered is already in database..
      //       if (res.login == $(`#usernameSignup`).val()) { 
      //         nameTaken = true; // .. then the name is taken
      //         $(`#usernameMessage`).html("Username already taken!");
      //       }

      //     }

      //     if (!nameTaken) { // if name was not taken, create new user
      //       //console.log("name not taken")

      //       //  GERNERATE SALT ========================
      //       function dec2hex(dec) {
      //         return ('0' + dec.toString(16)).substr(-2)
      //       }

      //       // generateId :: Integer -> String
      //       function generateId(len) {
      //         var arr = new Uint8Array((len || 40) / 2)
      //         window.crypto.getRandomValues(arr)
      //         return Array.from(arr, dec2hex).join('')
      //       }

      //       // create a new random 10 digit salt for the new user
      //       var curSalt = generateId(10);
      //       // ===========================================

      //       var curPass = $(`#userPassSignup`).val() /// get the user password
      //       var curHash = sha256(curPass + curSalt); // encrypt the password and salt

      //       //console.log(curHash);
      //       //console.log(curSalt);
      //       //console.log($(`#usernameSignup`).val());

      //       // create new object for the new user
      //       var newUser = {
      //         name: $(`#nameSignup`).val(),
      //         login: $(`#usernameSignup`).val(),
      //         hash: curHash,
      //         salt: curSalt
      //       }

      //       // add new user to the database 
      //       $.post("/api/user", newUser)
      //         .then(function (res) {
      //           console.log(res);
      //         });

      //     } // end if
      //   }); // get request
      //   // after creating new user, 
      //   // redirect to products page
      //   //window.location.replace("/products");
      //   alert("User Created");


    }
  }); // signupButton pressed
}); // on page load

