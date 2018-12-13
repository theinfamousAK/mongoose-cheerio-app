var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

// Initialize Express
// ===========================================================
var app = express();

// Import the models to use database functions
// ===========================================================
var PORT = process.env.PORT || 8888;

// Set public folder as static directory
// ===========================================================
app.use(express.static("public"));

// Set Handlebars
// ===========================================================
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// BodyParser Settings
// ===========================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
// ===========================================================
app.use(require("./controllers/pbsController.js"));

//Local Database Configuration with Mongoose
// ===========================================================
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/pbsnewshourscraper", function (error) {
    if (error) throw error;
    console.log("Database connected");
});

// Port
// ===========================================================
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});