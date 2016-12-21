var User = require("./db/models/User");

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
  user.save(function(err){
    res.status(200)
      .json({ success: user, message: "Created one user...", })
  })
}

function updateUser(req, res){
  User.findById(req.params.id, function(err, user){
    if (err){ res.send(err) }
    user.password = req.body.password;
    user.save(function(err){
      if (err){ res.send(err); }
      res.json({ updated: user, message: "User updated..."});
    });
  });
  
}

function removeUser(req, res){
  User.remove({
    _id: req.params.id
  }, function(err, user){
    if (err){
      res.send(err)
    }
    res.json({ removed: user, message: 'User deleted...'})
  })
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};