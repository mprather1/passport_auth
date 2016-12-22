var Marionette = require('marionette');
var Users = require("./collections/Users");
var ActiveTasks = require("./collections/ActiveTasks");
var CompletedTasks = require("./collections/CompletedTasks");
var TasksView = require("./views/TasksView");
var TableView = require("./views/TableView");
var FormModalView = require("./views/FormModalView");
var LoginModalView = require("./views/LoginModalView");
var style = require("./public/css/style.scss");

var Controller = Marionette.Object.extend({
  
  initialize: function(options){
    
    this.app = options.app;
    
    var users = new Users();
    var activeTasks = new ActiveTasks();
    var completedTasks = new CompletedTasks();
    var tableView = new TableView();
    var formModalView = new FormModalView({ users: users });
    var loginModalView = new LoginModalView({ collection: users });

    activeTasks.fetch({
      success: function(request, response){
        console.log("Successfully fetched active tasks...");
      },
      error: function(err){
        console.log("Error: " + err);
      }
    });
    
    completedTasks.fetch({
      success: function(request, response){
        console.log("Successfully fetched completed tasks...");
      },
      error: function(err){
        console.log("Error: " + err);
      }
    });
    
    users.fetch({
      success: function(request, response){
        console.log("Successfully fetched users...");
      },
      error: function(err){
        console.log("Error: " + err);
      }
    });
    
    this.options.users = users;
    this.options.activeTasks = activeTasks;
    this.options.completedTasks = completedTasks;
    this.options.formModalView = formModalView;
    this.options.tableView = tableView;
    this.options.loginModalView = loginModalView;
    this.app.view.showChildView('main', this.options.tableView);
    this.options.formModalView.collection = this.options.activeTasks;
    
  },
  
  active: function(){
    this.options.tableView.showChildView('body', new TasksView({ 
      collection: this.options.activeTasks,
      completedTasks: this.options.completedTasks
    }));
    $('#active-radio').prop("checked", true);
  },
  
  completed: function(){
    this.options.tableView.showChildView('body', new TasksView({ 
      collection: this.options.completedTasks
    }));
    $('#completed-radio').prop('checked', true);
  },
  
  newTask: function(){
    this.options.formModalView.render();
  },
  
  loginForm: function(){
    this.options.loginModalView.render();
  }
  
});

module.exports = Controller;
