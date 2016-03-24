var userController = require('../controllers/userController');
var videoController = require('../controllers/videoController');
var commentController = require('../controllers/commentController');
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
  
  // Handles fetching uploaded videos from db to populate video grid on profile page
  app.post('/fetch', videoController.fetchUserVideo);
  
  // Handles fetching videos that match the specified search query
  app.post('/search', videoController.fetchVideo);

  // Handles adding a new video to the db
  app.post('/addVideo', videoController.addVideo);

  // Load comments for current Video
  app.post('/loadComments', commentController.loadComments);

  // Add new comment to db
  app.post('/addComment', commentController.addComment);

  //Handles adding about me on the profile page
  app.post('/aboutMe', userController.editAboutMe);
};