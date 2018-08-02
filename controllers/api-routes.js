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
    app.post("/api/product", function(req, res) {
        // Create the new Product row
        db.Product.create(req.body)
        .then(function(dbProduct) {
            // Now add the Product's key as a FK in Location
            db.Location.update(
                { ProductId: dbProduct.id},
                { where: { 
                    aisle   : req.body.location.aisle,
                    section : req.body.location.section,
                    shelf   : req.body.location.shelf,
                    position: req.body.location.position
                }}
            ).then(function() {
                res.json(dbProduct);
            });
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


    // GET /api/aisle
    // returns aisles with available locations
    app.get("/api/aisle", function(req, res) {
        let where = { ProductId: null };
        db.Location.findAll({
            where     : where,
            attributes: ['aisle'],
            group     : ['aisle'],
            order     : ['aisle']
        })
        .then(function(dbLocations) {
            res.json(dbLocations);
        });
    });

    // GET /api/section/:aisle
    // returns sections with available locations (and given params)
    app.get("/api/section/:aisle", function(req, res) {
        let aisle    = req.params.aisle;
        let where = { ProductId: null, aisle: aisle };
        db.Location.findAll({
            where     : where,
            attributes: ['section'],
            group     : ['section'],
            order     : ['section']
        })
        .then(function(dbLocations) {
            res.json(dbLocations);
        });
    });

    // GET /api/shelf/:aisle/:section
    // returns shelfs with available locations (and given params)
    app.get("/api/shelf/:aisle/:section", function(req, res) {
        let aisle    = req.params.aisle;
        let section  = req.params.section;
        let where = { ProductId: null, aisle: aisle, section: section };
        db.Location.findAll({
            where     : where,
            attributes: ['shelf'],
            group     : ['shelf'],
            order     : ['shelf']
        })
        .then(function(dbLocations) {
            res.json(dbLocations);
        });
    });

    // GET /api/position/:aisle/:section/:shelf
    // returns sections with available locations (and given params)
    app.get("/api/position/:aisle/:section/:shelf", function(req, res) {
        let aisle    = req.params.aisle;
        let section  = req.params.section;
        let shelf    = req.params.shelf;
        let where = { ProductId: null, aisle: aisle, section: section, shelf: shelf };
        db.Location.findAll({
            where     : where,
            attributes: ['position'],
            group     : ['position'],
            order     : ['position']
        })
        .then(function(dbLocations) {
            res.json(dbLocations);
        });
    });


};