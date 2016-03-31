var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../db');
var bcrypt = require('bcrypt');

// Uses 'passport-local' pre-made strategy to handle standard username and password verification
passport.use(new Strategy(
  function(username, password, done) {
    db.User.findOne({where: {username: username}})
    .then(function(user) {
      if (!user) {
        return done(null, false, {message: 'Username incorrect'}); 
      }
      bcrypt.compare(password, user.password, function(err, match) {
        if (err) {
          return done(err);
        }
        if (!match) {
          return done(null, false, {message: 'Password incorrect'}); 
        } else {
          return done(null, user);
        }
      });
    })
    .catch(function(err) {
      return done(err);
    });
  }
));

// Handles session stuff (still not entirely sure how exactly)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// ^^ Same as above ^^
passport.deserializeUser(function(id, done) {
  db.User.findOne({where: {id: id}})
  .then(function(user) {
    done(null, user);
  })
  .catch(function(err) {
    return done(err);
  });
});

// Checks to make sure user is logged in before allowing route request to continue
var ensureAuthenticated = function(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.sendStatus(401);
  }
};

module.exports.passport = passport;
module.exports.ensureAuthenticated = ensureAuthenticated;
