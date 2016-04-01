var db = require('../db');
var bcrypt = require('bcrypt');
var session = require('express-session');

module.exports = {
  // Handles signing up a new user and adding them to the database
  userSignUp: function (req, res) {
    db.User.findOne({where: {username: req.body.username}})
    .then(function(user) {
      if (user !== null) {
        res.send(401, 'username-SignUp'); 
        return;
      }
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) {
          throw err;
          res.sendStatus(500);
        }
        db.User.create({
          username: req.body.username,
          password: hash,
        })
        .then(function(user) {
          req.session.regenerate(function (err) {
            if (err) {
              throw err;
              res.sendStatus(500);
            }
            req.session.userId = user.id;
            var usr = user;
            usr.password = "";
            res.send(200, usr);
          });
        })
        .catch(function(err) {
          throw err;
          res.sendStatus(500);
        });
      });
    })
    .catch(function(err) {
      throw err;
      res.sendStatus(500);
    });
  },

  // Handles signing in an existing user and checking they entered the correct username/password
  userSignIn: function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.User.findOne({where: {username: req.body.username}})
    .then(function(user) {
      if (user === null) {
        res.send(401, 'username-SignIn'); 
        return;
      }
      bcrypt.compare(password, user.password, function(err, match) {
        if (err) {
          throw err;
          res.sendStatus(500);
        }
        if (!match) {
          res.send(401, 'password'); 
          return;
        } else {
          req.session.regenerate(function (err) {
            if (err) {
              throw err;
              res.sendStatus(500);
            }
            req.session.userId = user.id;
            var usr = user;
            usr.password = "";
            res.send(200, usr);
          });
        }
      });
    })
    .catch(function(err) {
      throw (err);
      res.sendStatus(500);
    });
  },

  // Handles user signing out and removes their existing session
  userSignOut: function (req, res) {
    req.session.destroy(function(err) {
      if (err) {
        throw err;
        res.sendStatus(500);
      }
      res.send(200);
    });
  },


  editAboutMe: function (req,res) {
    db.User.findOne({where: {username: req.body.username}})
    .then(function(user) {
      user.aboutMe = req.body.info;
      user.save()
      .then(function(user) {
        res.send(201, user);
      })
      .catch(function(err) {
        throw err;
        res.sendStatus(500);
      });
    })
    .catch(function(err) {
      throw err;
      res.sendStatus(500);
    });
  }
};