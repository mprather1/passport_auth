var Marionette = require('marionette');
var Controller = require("./controller");

var Router = Marionette.AppRouter.extend({
  
  initialize: function(options){
    this.controller = new Controller({ app: options.app });
  },
  
  appRoutes: {
    '/': 'active',
    'tasks/active': 'active',
    'tasks/completed': 'completed',
    'tasks/new': 'newTask',
    "login": 'loginForm'
  }
  
});

module.exports = Router;