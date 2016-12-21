var express = require("express");
var app = express();
var path = require("path");
var session = require("express-session");
var RedisStore = require("connect-redis")(session);
var bodyParser = require("body-parser");
var morgan = require("morgan");
var config = require("./_config");
var routes = require("./routes");
var port = process.env.PORT || '8000';
var mongoose = require('mongoose');
var passport = require("passport")

mongoose.Promise = require('bluebird');

var environment = process.env.NODE_ENV || 'development';
var connectionString = config.mongoURI[environment];

mongoose.connect(connectionString, function(err, res){
  if (err){
    console.log("Error: " + err);
  } else if (process.env.NODE_ENV === 'development'){
      console.log("Connected to database: " + connectionString);
  }
});

if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(session({
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}));

require('./authentication').init(app, passport)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'app/static')));

app.use('/api', routes);

app.get('/auth', function(req, res, next) {
  res.sendfile('login.html');
});

app.get('/loginSuccess', function(req, res, next) {
  res.sendfile('success.html');
});
app.get('/loginFailure', function(req, res, next) {
  res.sendfile('failure.html');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/loginFailure'
}));


var server = app.listen(port, function(){
  if (process.env.NODE_ENV === 'development'){
    console.log("Listening on port " + port + "...");
  }
});

module.exports = server;