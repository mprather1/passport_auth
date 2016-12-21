var express = require("express");
var router = express.Router();
var db = require("./queries");
var passport = require('passport')

router.route("/users")
  .get(db.getAllUsers)
  .post(db.createUser)

router.route("/users/:id")
  .get(db.getSingleUser)
  .put(db.updateUser)
  .delete(db.removeUser)
  
module.exports = router;