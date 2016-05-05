var db = require('../db');
var AWS = require('aws-sdk');

module.exports = {
  // Handles importing a video to the S3 storage 
  addVideo: function (req, res) {
    var video = req.body;
    db.Video.create({
      title: video.title,
      description: video.description,
      cover: video.cover,
      url: video.url,
      userName: video.user.username,
      UserId: video.user.id,
      CategoryId: video.categoryId
    })
    .then(function(video) {
      res.send(201, video);
    })
    .catch(function(err) {
      throw err;
      res.sendStatus(500);
    });
  },
  // Handles fetching of specified video from S3 storage
  fetchVideo: function (req, res) {
    var query = req.body.query;
    var queryType= req.body.queryType;
    console.log("queryType is;", queryType);
    var search ={};
    search[queryType] =  {$like : '%' + query + '%'};
    db.Video.findAll({where: search})
    .then(function(videos) {
      res.send(200, videos);
    })
    .catch(function(err) {
      throw err;
      res.sendStatus(500);
    });
  },
  fetchUserVideo: function (req, res) {
    db.Video.findAll({where: {userid: req.body.id}})
    .then(function(videos) {
      res.send(200, videos);
    })
    .catch(function(err) {
      throw err;
      res.sendStatus(500);
    });
  },

  fetchAll: function (req, res) {
    db.Video.findAll({})
    .then(function(videos) {
      res.send(200, videos);
    })
    .catch(function(err) {
      throw err;
      res.sendStatus(500);
    });
  },

  fetchWatchList: function (req, res) {
    var userId = req.body.userid;
    db.db.query('select * from Videos inner join WatchListVideos on (Videos.id = WatchListVideos.videoid) inner join Users on \
                (WatchListVideos.userid = Users.id) where Users.id ='+userId, {type: db.db.QueryTypes.SELECT})
    .then(function(data) {
      res.send(200, data);
    })
    .catch(function(err) {
      throw err;
      res.send(500);
    });
  },

  addWatchListVideo: function (req, res) {
    var userID = req.body.user.id;
    var videoID = req.body.video.id;
    db.WatchListVideo.create({
      videoID: videoID,
      userID: userID
    })
    .then(function() {
      res.sendStatus(201);
    })
    .catch(function(err) {
      throw err;
      res.sendStatus(500);
    });
  },

  deleteVideoFromBucket: function(req, res) {
    var filename = req.body.filename;
    var bucketInstance = new AWS.S3();
    var params = {
      Bucket: 'video.bucket1',
      Key: filename
    };
    bucketInstance.deleteObject(params, function (err, data) {
      if (data) {
        console.log("File deleted successfully");
        res.send(200);
      }
      else {
        console.log("Check if you have sufficient permissions : "+err);
        res.send(500);
      }
    });
  }

};