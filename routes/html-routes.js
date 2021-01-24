// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/intro.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/dashboard", isAuthenticated, function(req,res) {
    res.render("index");
  })

  // if a user logs out they get directed to the landing/intro page again.
  app.get("/logout", function(req,res) {
    res.sendFile(path.join(__dirname, "../public/intro.html"))
  })


  // a test to see what happens if a signed in user tries to go to "localhost:8081/"
  app.get("/members", function(req,res) {
    res.sendFile(path.join(__dirname, "../public/members.html"))
  })
  

};
