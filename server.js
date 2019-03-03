var express = require("express");
var path = require("path")

var app = express();


// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STATIC
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/app/public")));

// ROUTER
// Routes to our js files and pluggin express in to them with our app variable 
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// LISTENER
// The below code effectively "starts" our server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
