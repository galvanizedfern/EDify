var express = require('express');
var db = require('./db');
var path = require('path');

var app = express();

require('./config/middleware')(app, express);
require('./config/routes')(app, express);

var port = Number(process.env.PORT || 8000);
app.listen(port, function() {
  console.log(`Listening on port ${port}...`);
});

exports = app;