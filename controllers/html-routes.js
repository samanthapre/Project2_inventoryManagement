module.exports = function(app) {
   
   
    app.get("/", function(req, res) {
        console.log("Getting root");

        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/get_usernames", function(req, res) {
        console.log("Getting Usernames");

        try{
            // call model function to get all usernames

        }
        catch(err){
            console.log(err); // catch and log error
        }
        res.json("/get_usernames path defined. Content will come later");
    });

    app.put("/createnewuser", function(req, res) {
        console.log("Creating new user");

        try{
            // call model function to insert new user

        }
        catch(err){
            console.log(err); // catch and log error
        }
        res.json("/createnewuser path defined. Content will come later");
    });


};