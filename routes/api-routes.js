// Requiring our models and passport as we've configured it
let db = require("../models");
let passport = require("../config/passport");
let scrapeItem = require("../controllers/scraper");
const item = require("../models/item");
const { response } = require("express");


module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // API Route for getting all the items of user and send back as JSON 
  app.get("/api/items", (req,res) => {
    db.Item.findAll({where: { UserId: req.user.id }}).then((results) => {
      res.json(results);
    }).catch(function(err) {
      res.status(401).json(err);
    });
  });

  // Route for finding one single item
  app.get("/api/items/:id", (req,res) => {
    db.Item.findOne({
      where: {
        UserId: req.user.id,
        id: req.params.id
      }
    }).then((results) => {
      res.json(results);
      const hbsItemObject = {
        items: results
      }
      res.render("viewitem", hbsItemObject)
      // console.log(results)
    })
  })

  // Route for deleting item from DB
  app.delete('/api/items/:id', (req, res) => {
    db.Item.destroy({
      where: {
        UserId: req.user.id,
        id: req.params.id
      },
    }).then((dbPost) => res.json(dbPost))
    .catch(function(err) {
      res.status(401).json(err);
    });
  });


  // Route for scraping item data from url
  app.post("/api/scrape", (req, res) => {
    if (req.user) {
      if (req.body.url) {
        // scraperController(req.body.url, (data) => {
        scrapeItem(req.body.url, (data) => {
          // save to db and return
          if (data) {
            data.UserId = req.user.id;
            db.Item.create(data, { logging: false }).then((result) => {
              console.log('created item: ', data.title);
              res.status(201).end();
            });
            res.json(data);
          } else {
            res.send('Unable to get item data').status(404).end();
          }
        });
      } else {
        res.status(404).end();
      }
    } else {
      res.status(401).end(); // Return not authorized if no user credentials
    }
  });

  // Route for re-scraping item data from url based on id saved in DB to see if price is updated.
  app.post("/api/scrape/:id", (req, res) => {
    if (req.user) {
      db.Item.findOne({
        where: {
          id: req.params.id
        }
      }).then(item => {
        // scrape again for item with id
        console.log('checkng update for item id: ', item.id);
        scrapeItem(item.url, (data) => {
          // check if price changed and save to db
          console.log('compare: ', Number(item.initialPrice), data.initialPrice);
          // Check if initial or new saved price is updated
          if (data.initialPrice !== Number(item.initialPrice) && data.initialPrice !== Number(item.newPrice)) {
            item.newPrice = data.initialPrice;
            item.isUpdated = true;
            console.log('there is an update!')
            db.Item.update({ newPrice: item.newPrice, isUpdated: true }, {
              where: {
                id: item.id,
              },
            }).then((result) => {
              console.log('updated item: ', result);
              res.send('updated item!').status(200).end()
            });
          } else {
            console.log('no update!');
            db.Item.update({ isUpdated: false }, {
              where: {
                id: item.id,
              }
            });
            res.send('no update').status(200);
          }
        });
      }). catch (err => {
        console.log('Error, item is not found');
      });
    } else {
      res.status(401).end(); // Return not authorized if no user credentials
    }
  });
};
