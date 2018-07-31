  // on page load...
  $(document).ready(() => {
    var curPass ="";
    var curHash = "";
    var curSalt ="";

    $("#encrypt").on("click", function () {

        // get the current password
        curPass = $("#enterpass").val();

        console.log("Current Password: ", curPass);

        $("#userpass").text(curPass);

        // TODO: GERNERATE SALT

        // encrypt our password 
         curHash = sha256(curPass);

        console.log("Hash: ",curHash);

        $("#encryptpass").text(curHash);
    });

    $("#confirm").on("click", function () {

        
        passCheck = $("#confirmPass").val();

        checkHash = sha256(passCheck);
        console.log("Hash: ",checkHash);
        $("#passCheckStatus").text( curHash ==checkHash?"Same Passwords. Good Job!":"Passwords not identical. Fix it! Fool." );
    });





});