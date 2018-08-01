let db = require('../models');

// == API Routes ==
// Method  URL               Input  Output
// ------  ----------------  -----  ------------------   
// GET     /api/users        None   List of all Users
// POST    /api/user         JSON   Newly added User
// GET     /api/products     None   List of all products
// POST    /api/product      JSON   Newly added product
// DELETE  /api/product/:id  id     None

module.exports = function(app) {

    // GET /api/users  - Returns list of all Users
    app.get("/api/users", function(req, res) {
        console.log("GET /api/users");
        db.User.findAll()
            .then(function(dbUser) {
                res.json(dbUser);
            });
    });

    // POST /api/user  - Adds a new User
    app.post("/api/user", function(req, res) {
        console.log("user created");
        console.log(req.body);
        db.User.create(req.body)
            .then(function(dbUser) {
                res.json(dbUser);
            });
    });

    // GET /api/products  - Returns list of all Products
    app.get("/api/products", function(req, res) {
        console.log("GET /api/products");
        db.Product.findAll()
            .then(function(dbProduct) {
                res.json(dbProduct);
            });
    });

    // POST /api/product  - Adds a new Product
    app.post("/api/product", function(req, res) {
        db.Product.create(req.body)
            .then(function(dbProduct) {
                res.json(dbProduct);
            });
    });

    // DELETE /api/product/:id  -- Deletes a Product
    app.delete("/api/product/:id", function(req, res) {
        console.log(req.params);
        console.log("Deleting Product id: " + req.params.id);
        db.Product.destroy({
            where: {id: req.params.id}
        }).then(function(dbProduct) {
            res.json(dbProduct);
        });
    });

};