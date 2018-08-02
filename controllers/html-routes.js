module.exports = function(app) {
   
    // GET /  Returns Landing page
    app.get("/", function(req, res) {
        console.log("Getting root");
        res.sendFile(path.join(__dirname, "../views/index.html"));
    });

    // GET /  Returns Landing page
    app.get("/products", function(req, res) {
        console.log("Getting products");
        res.sendFile(path.join(__dirname, "../views/products.html"));
    });

    // FIXME -- TESTING
    app.get("/add-product", function(req, res) {
        console.log("FIXME - TESTING - Displaying add-product page");
        res.sendFile(path.join(__dirname, "../public/add-product.html"));
    });

};