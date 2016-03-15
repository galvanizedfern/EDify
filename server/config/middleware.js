var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

var webpack = require('webpack');
var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../../webpack.config');
var compiler = webpack(webpackConfig);

module.exports = function(app, express) {
  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(require('webpack-dev-middleware')(compiler, {
    inline: true,
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));

  //app.use(express.static(path.resolve(__dirname, '../../client')));

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.static(__dirname + '/../../client'));
  app.use(session({ secret: 'galvanized fern' }));
  app.use(passport.initialize());
  app.use(passport.session());
};
