var express = require("express");
var router = express.Router();
var db = require("./queries");
var passport = require('passport')

router.route('/tasks/completed')
  .get(db.getCompletedTasks);

router.route('/tasks/active')
  .get(db.getActiveTasks)
  .post(db.createTask);

router.route('/tasks/active/:id')
  .get(db.getSingleTask)
  .put(db.updateTask);
  
router.route("/tasks/:id")
  .get(db.getSingleTask)
  .put(db.updateTask)
  .delete(db.removeTask);
  
router.route("/users")
  .post(db.createUser)
  .get(db.getAllUsers);
  
router.route('/users/:id')
  .get(db.getSingleUser)
  .put(db.updateUser)
  .delete(db.removeUser);
  
  
module.exports = router;