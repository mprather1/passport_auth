var User = require("./db/models/User");
var Task = require("./db/models/Task");

// Users
/////////////////////////////////////////////////////////////////

function getAllUsers(req, res){
  User.find(function(err, user){
    if (err){ res.send(err); }
    res.json(user);
  });
}

function getSingleUser(req, res){
  User.findById(req.params.id, function(err, user){
    if (err){ res.send(err); }
    res.status(200)
    .json(user);
  });
}

function createUser(req, res){
  var user = new User();
  user.username = req.body.username;
  user.password = user.generateHash(req.body.password);
  user.email = req.body.email;
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.save(function(err){
    if(err){ res.send(err) }    
    res.status(200)
      .json({ 
        status: 'success', 
        message: "Created one user..."
      })
  })
}

function updateUser(req, res){
  User.findById(req.params.id, function(err, user){
    if (err){ res.send(err) }
    user.password = req.body.password;
    user.save(function(err){
      if (err){ res.send(err); }
      res.status(200)
        .json({ 
          status: 'success', 
          message: "User updated..." 
        });
    });
  });
  
}

function removeUser(req, res){
  User.remove({
    _id: req.params.id
  }, function(err, user){
    if (err){ res.send(err) }
    res.status(200)
      .json({
        status: 'success', 
        message: 'User deleted...'
      })
  })
}

// Users
/////////////////////////////////////////////////////////////////

function getAllTasks(req, res){
  Task.find(function(err, task){
    if(err){ res.send(err) }
    res.status(200)
      .json(task)
  })
}

function getCompletedTasks(req, res){
  Task.find({ completed: true }, function(err, task){
    if(err){ res.send(err) }
    res.status(200)
      .json(task)
  })
}

function getActiveTasks(req, res){
  Task.find({ completed: false }, function(err, task){
    if(err){ res.send(err) }
    res.status(200)
      .json(task)
  })
}

function getSingleTask(req, res){
  User.findById(req.params.id, function(err, task) {
      if(err){ res.send(err) }
      res.status(200)
        .json(task)
  })
}

function createTask(req, res){
  var task = new Task();
  task.completed = false;
  task.location_number = req.body.location_number;
  task.project = req.body.project;
  task.descrip = req.body.descrip;
  task.priority = req.body.priority;
  task.requestor = req.body.requestor;
  task.assigned_to = req.body.assigned_to;
  task.due_date = req.body.due_date;
  task.notes = req.body.notes;
  task.save(function(err){
    if(err){ res.send(err) }
    res.status(200)
      .json({
        status: 'success', 
        message: "Updated user"
      })
  })
}

function updateTask(req, res){
  Task.findById(req.params.id, function(err, task){
    if (err){ res.send(err) }
    task.completed = req.body.completed;
    task.save(function(err){
      if (err){ res.send(err); }
      res.status(200)
        .json({ 
          status: 'success',
          message: "Task completed..."
        });
    });
  });
  
}

function removeTask(req, res){
  Task.remove({
    _id: req.params.id
  }, function(err, task){
    if (err){ res.send(err) }
    res.status(200)
      .json({ 
        status: 'success',
        message: 'Task deleted...'
      })
  })
}


function getNextSequence(name){
  var ret = Task.findAndModify({
    query: { _id: name },
    update: { $inc: { seq: 1 } },
    new: true
  })
  return ret.seq
}
module.exports = {
  
  // Users
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser,
  
  // Tasks
  getAllTasks: getAllTasks,
  getCompletedTasks: getCompletedTasks,
  getActiveTasks: getActiveTasks,
  getSingleTask: getSingleTask,
  createTask: createTask,
  updateTask: updateTask,
  removeTask: removeTask  
};