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
  {
    port: env.port,
    host: env.host,
    logging: console.log
  });

// User's schema
var User = db.define('User', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  aboutMe: Sequelize.STRING
});

// Video's schema
var Video = db.define('Video', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  url:Sequelize.STRING,
  cover:Sequelize.STRING
});

//Comment's schema
var Comment = db.define('Comment', {
  content: Sequelize.STRING,
  userID: Sequelize.STRING,
  videoID:Sequelize.STRING,
  postedAt:Sequelize.STRING
});

// Tag's schema
var Tag = db.define('Tag', {
  name: Sequelize.STRING
});

// Set's up many-to-many relationship between Video and Tag (creates join table Video_Tag)
Tag.belongsToMany(Video, {through: 'Video_Tag'});
Video.belongsToMany(Tag, {through: 'Video_Tag'});

// Set's up one-to-many relationship between User and Video
Video.belongsTo(User);
User.hasMany(Video);

// Syncs schemas with mysql, creating the actual tables in the DB
User.sync()
.then(function() {
  Video.sync()
  .then(function() {
    Tag.sync()
    .then(function() {
      Comment.sync()
      .then(function() {
        console.log('Tables successfully created');
      })
      .catch(function(err) {
        throw err;
      })
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

exports.Comment = Comment;
exports.User = User;
exports.Video = Video;
exports.Tag = Tag;
exports.db = db;
