var userController = require('../controllers/userController');
var videoController = require('../controllers/videoController');
var passport = require('./authentication').passport;
var ensureAuthenticated = require('./authentication').ensureAuthenticated;

console.log(videoController);
module.exports = function(app, express) {
  // Handles request to sign up new user
  app.post('/signup', userController.userSignUp);

  // Handles request to sign in existing user
  app.post('/signin', passport.authenticate('local'), userController.userSignIn);

  // Handles user sign out
  app.get('/signout', userController.userSignOut);

  // Handles fetching inital videos from db to populate video grid on home page
  app.get('/fetch', videoController.fetchAll);

  // Handles fetching videos that match the specified search query
  app.post('/search', videoController.fetchVideo);

  // Handles adding a new video to the db
  app.post('/addVideo', videoController.addVideo);
};