var User = require("../models/User");

var Users = Backbone.Collection.extend({
  model: User,
  url: "http://shintech.ninja:8000/api/users"
});

module.exports = Users;