module.exports = function(app) {
   
    // GET /  Returns Landing page
    app.get("/", function(req, res) {
        console.log("Getting root");
        res.sendFile(path.join(__dirname, "/static/index.html"));
    });

};