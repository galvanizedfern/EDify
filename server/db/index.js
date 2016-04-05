
var Sequelize = require('sequelize');
const config = require('../config/database.json');
const env = config.production;

// Fill in with your own mysql info (you'll probably be using root-user too)
//                     db-name , user  ,  password
// var db = new Sequelize('thesis', 'test', 'password');

var db = new Sequelize(
  env.database,
  'rootPROD',
  'passwordPROD',
  { port: env.port, host: env.host, logging: console.log }
);

// User's schema
var User = db.define('User', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  aboutMe:  {type: Sequelize.STRING, allowNull: false, defaultValue: "Edit About Me"}
});
// Video's schema
var Video = db.define('Video', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  url:Sequelize.STRING,
  cover:Sequelize.STRING,
  userName: Sequelize.STRING,
  upVotes:Sequelize.INTEGER,
  downVotes:Sequelize.INTEGER
});

//Feedback schema
var Feedback = db.define('Feedback', {
  feedback: Sequelize.TEXT,
  username: Sequelize.STRING
});

//Votes's schema
var Votes = db.define('Votes', {
  videoID: Sequelize.STRING,
  userID: Sequelize.STRING,
  upVote:Sequelize.INTEGER,
  downVote:Sequelize.INTEGER
},{
  timestamps: false
});

var WatchListVideo = db.define('WatchListVideo', {
  videoID: Sequelize.STRING,
  userID: Sequelize.STRING
});

// Category's schema
var Category = db.define('Category', {
  name: Sequelize.STRING
});

// Question's schema
var Question = db.define('Question', {
  question: Sequelize.STRING(600),
  answer: Sequelize.TEXT,
  asker: Sequelize.STRING
});

// Sets up one-to-many relationship between User and Question, and Video and Question
Question.belongsTo(User);
User.hasMany(Question);
Question.belongsTo(Video);
Video.hasMany(Question);

// Sets up one-to-many relationship between User and Feedback, and Video and Feedback
Feedback.belongsTo(User);
User.hasMany(Feedback);
Feedback.belongsTo(Video);
Video.hasMany(Feedback);

// Set's up many-to-many relationship between Video and Tag (creates join table Video_Tag)
// Tag.belongsToMany(Video, {through: 'Video_Tag'});
// Video.belongsToMany(Tag, {through: 'Video_Tag'});

// Sets up one-to-many relationship between User and Video
Video.belongsTo(User);
User.hasMany(Video);
Video.belongsTo(Category);
Category.hasMany(Video);
// Syncs schemas with mysql, creating the actual tables in the DB
User.sync()
.then(function() {
  Video.sync()
  .then(function() {
    Category.sync()
    .then(function() {
      Feedback.sync()
      .then(function() {
        Votes.sync()
        .then(function() {
          Question.sync()
          .then(function() {
            WatchListVideo.sync()
            .then(function() {
              console.log('Tables successfully created');
            })
            .catch(function(err) {
              throw err;
            });
          })
          .catch(function(err) {
            throw err;
          });
        })        
        .catch(function(err) {
        });
      })
      .catch(function(err) {
        throw err;
      });
    })
    .catch(function(err) {
      throw err;
    });
  })
  .catch(function(err) {
    throw err;
  });
})
.catch(function(err) {
  throw err;
});

exports.Feedback = Feedback;
exports.User = User;
exports.Video = Video;
exports.Votes = Votes;
exports.Question = Question;
exports.Category = Category;
exports.WatchListVideo = WatchListVideo;
exports.db = db;