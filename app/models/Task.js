var validation = require("backbone.validation");

var Task = Backbone.Model.extend({
  
  urlRoot: "http://shintech.ninja:8000/api/tasks/active",
  
  validation: {
    location_number: [{
      required: true,
      msg: 'You must enter a location!'
    }],
    descrip: [{
      required: true,
      msg: 'You must enter a description!'
    }],
    project: [{
      required: true
    }],
    priority: [{
      required: true
    }],
    requestor: [{
      required: true,
      msg: 'You must enter a user!'
    }],
    assigned_to: [{
      required: true,
      msg: 'You must choose an assigned user!'
    }],
    due_date: [{
      required: true, 
      msg: 'You must enter a due date!'
    }],
    notes: [{
      required: true,
      msg: 'You must enter a note!'
    }]
  }

});

module.exports = Task;
