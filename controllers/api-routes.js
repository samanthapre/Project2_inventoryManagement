let db = require('../models');

// == API Routes ==
// Method  URL               Input  Output
// ------  ----------------  -----  ------------------   
// GET     /api/users        None   List of all Users
// POST    /api/user         JSON   Newly added User
// GET     /api/products     None   List of all products
// POST    /api/product      JSON   Newly added product
// DELETE  /api/product/:id  id     None

module.exports = function (app) {

    // GET /api/users  - Returns list of all Users
    app.get("/api/users", function (req, res) {
        console.log("GET /api/users");
        db.User.findAll()
            .then(function (dbUser) {
                res.json(dbUser);
            });
    });

    // POST /api/user  - Adds a new User
    app.post("/api/user", function (req, res) {
        console.log("attempting to create user");
        

        db.User.findAll()
            .then(function (userArr) {
                
                console.log("new user?: ",req.body);
                //console.log("req.body.login: ",req.body.login);

                // flag to check if username (login) has already been taken
                var nameTaken = false;

                // for every entry in user table..
                for (var i in userArr) {

                   // console.log("Arr{i}",userArr[i]);
                    console.log("Current users: ",userArr[i].login);
                    
                    //check if username being entered is already in database..
                    if (req.body.login == userArr[i].login) {
                        nameTaken = true; // .. then the name is taken
                    }
                }

                // if username is open..
                if (!nameTaken) {

                    // ...add the user
                    db.User.create(req.body)
                        .then(function (dbUser) {
                            res.json("true"); // 'return' true to confirm addition of user
                        });

                }
                else{ //  else, 'return' error false
                    res.json("false");
                }
            });
    });

    // GET /api/products  - Returns list of all Products
    app.get("/api/products", function (req, res) {
        console.log("GET /api/products");
        db.Product.findAll()
            .then(function (dbProduct) {
                res.json(dbProduct);
            });
    });

    // POST /api/product  - Adds a new Product
    app.post("/api/product", function (req, res) {
        db.Product.create(req.body)
            .then(function (dbProduct) {
                res.json(dbProduct);
            });
    });

    // DELETE /api/product/:id  -- Deletes a Product
    app.delete("/api/product/:id", function (req, res) {
        console.log(req.params);
        console.log("Deleting Product id: " + req.params.id);
        db.Product.destroy({
            where: { id: req.params.id }
        }).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });

};