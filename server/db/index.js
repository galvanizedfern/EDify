var Sequelize = require('sequelize');

// Fill in with your own mysql info (you'll probably be using root-user too)
//                     db-name , user  ,  password
var db = new Sequelize('thesis', 'test', 'password');

// User's schema
var User = db.define('User', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING
});

// Video's schema
var Video = db.define('Video', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  url:Sequelize.STRING,
  cover:Sequelize.STRING
});

// Tag's schema
var Tag = db.define('Tag', {
  name: Sequelize.STRING
});

// Set's up many-to-many relationship between Video and Tag (creates join table Video_Tag)
Video.belongsToMany(Tag, {through: 'Video_Tag'});
Tag.belongsToMany(Video, {through: 'Video_Tag'});

// Set's up one-to-many relationship between User and Video
Video.belongsTo(User);
User.hasMany(Video);

// Syncs schemas with mysql, creating the actual tables in the DB
User.sync();
Video.sync();
Tag.sync();

exports.User = User;
exports.Video = Video;
exports.Tag = Tag;
exports.db = db;
