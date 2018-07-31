var express = require("express");
var bodyParser = require("body-parser");
path = require("path");


// create our port (two definitions depending on site being local or hosted)
var PORT = process.env.PORT || 8080;
var app = express();


// Serve content at routes from '/static'  for the app from the "public" directory in the application directory.
app.use('/static', express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/views/public')));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// the Controllers will handle the requests sent from the view
require("./controllers/html-routes")(app);


// TODO: CREATE CONTROLLERS AND IMPORT THEM HERE
//var routes = require("");
//app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
