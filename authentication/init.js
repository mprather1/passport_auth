var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require("../db/models/User");
var authenticationMiddleware = require('./middleware')
var bcrypt = require('bcryptjs');

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  User.findById(user._id, function(err, user){
    done(err, user)
  })
})

function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done){
      User.findOne({ username: username }, function(err, user){
        if(err){ return done(err) }
        if(!user){ return done(null, false) }
        if(password !== user.password){
          return done(null, false)
        }
        return done(null, user)
      })
    }))
   
  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
