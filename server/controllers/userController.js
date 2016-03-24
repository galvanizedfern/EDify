var db = require('../db');
var bcrypt = require('bcrypt');

module.exports = {
  // Handles signing up a new user and adding them to the database
  userSignUp: function (req, res) {
    db.User.findOne({where: {username: req.body.username}})
    .then(function(user) {
      console.log("useris:", user);
      if (user) {
        console.log('Username already exists!');
        res.sendStatus(200);
      }
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) {
          res.send(err);
        }
        db.User.create({
          username: req.body.username,
          password: hash,


        })
        .then(function(user) {
          console.log('User created successfully');
          res.send(201, user);
        })
        .catch(function(err) {
          console.log(err);
        });
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  // Handles signing in an existing user and checking they entered the correct username/password
  userSignIn: function (req, res) {

    // !!!!!!!!!!!!!! Passport replaces the need for any of the commented code below; keep for now to be safe !!!!!!!!!!!!!!!!!

    // db.User.findOne({where: {username: req.body.username}})
    // .then(function(user) {
    //   if (!user) {
    //     console.log("Username doesn't exist!");
    //     res.sendStatus(401);
    //   }
    //   // TODO: Add password salting/hashing (Passport ?)
    //   if (user.password === req.body.password) {
    //     //Create new user session, redirect user to some other page (Welcome page ?)
    //     res.sendStatus(200);
    //   }
    // })
    // .catch(function(err) {
    //   console.log(err);
    // })
    res.send(req.user);
  },

  // Handles user signing out and removes their existing session
  userSignOut: function (req, res) {
    // Built in function provided by Passport
    req.logout();
    console.log('User logged out!');
    res.send('Logged out');
    // Redirect or do something else to let user know they successfully loged out
  },


  editAboutMe: function (req,res) {
    db.User.findOne({where: {username: req.body.username}})
    .then(function(user) {
      console.log('User is:', user);
      user.aboutMe = req.body.info;
      user.save()
      .then(function(user) {
        console.log('User updated successfully');
        res.send(201, user);
      })
      .catch(function(err) {
        console.log(err);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  }
};