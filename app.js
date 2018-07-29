var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var helmet = require('helmet'),
    blacklist = require('express-blacklist'),
    expressDefend = require('express-defend');


var index = require('./server/routes/index');
var config = require("./server/meta/config/common");
var sequelize = require("./server/config/sequelize");
var models = require("./server/config/model");
var middles = require("./server/middles/index");
var app = express();

//보안
app.use(helmet());
app.use(blacklist.blockRequests('blacklist.txt'));
app.use(expressDefend.protect({
  maxAttempts: 5,
  dropSuspiciousRequest: true,
  consoleLogging: true,
  logFile: 'suspicious.log',
  onMaxAttemptsReached: function (ipAddress, url) {
    console.log('IP address ' + ipAddress + ' is considered to be malicious, URL: ' + url);
  }
}));
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'app/assets')));
app.use('/views', express.static(path.join(__dirname, 'app/views')));
// app.use('/thumbnails', express.static(__dirname+'/thumbnails'));
app.use(middles.connect());


app.use(function (req, res, next) {
  req.config = config;
  req.sequelize = sequelize;
  req.models = models;
  // req.utils = require('./server/utils');
  next();
});

index(app);

app.get('/', function(req, res) {
  console.log(req.session.username);
  res.render('index');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.setHeader('Content-Type', 'application/json');
  res.status(err.status || 500);
  res.render('error');
});



console.log('database info : ', config.db);
sequelize.sync({force: config.db.force}).then(function (err) {
}, function (err) {
  console.log('Unable to connect to the database:', err);
});

app.listen(config.app.port, () => {
  console.log('blog app listening on port '+config.app.port+'!!!!');
});


module.exports = app;
