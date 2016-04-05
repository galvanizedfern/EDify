var userController = require('../controllers/userController');
var videoController = require('../controllers/videoController');
var categoryController = require('../controllers/categoryController');
var voteController = require('../controllers/voteController');
var discussionController = require('../controllers/discussionController');
var passport = require('./authentication').passport;
var ensureAuthenticated = require('./authentication').ensureAuthenticated;

module.exports = function(app, express) {
  // Handles request to sign up new user
  app.post('/signup', userController.userSignUp);

  // Handles request to sign in existing user
  app.post('/signin', userController.userSignIn);

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

  // Load feedback for current Video
  app.post('/loadFeedback', discussionController.loadFeedback);

  // Add new feedback to db
  app.post('/addFeedback', ensureAuthenticated, discussionController.addFeedback);

  // Load questions for current Video
  app.post('/loadQuestions', discussionController.loadQuestions);

  // Add new question to db
  app.post('/addQuestion', discussionController.addQuestion);
  
  // Increases the upvote of certain video
  app.post('/upVote', voteController.upVotes);
  
  // Increases the upvote of certain video
  app.post('/downVote', voteController.downVotes);

  //Handles adding about me on the profile page
  app.post('/aboutMe', userController.editAboutMe);

  //Handles fetching all video categories
  app.get('/loadCategories', categoryController.loadCategories);

  // Add's answer to an existing question
  app.post('/addAnswer', discussionController.addAnswer);

  // Add's a video to a user's watchlist
  app.post('/addToWatch', videoController.addWatchListVideo);

  // Fetches the watchlist for a particular user
  app.post('/fetchWatchList', videoController.fetchWatchList);

  // Delete video from S3 bucket if duration was too long
  app.post('/deleteVideoFromBucket', videoController.deleteVideoFromBucket);

};