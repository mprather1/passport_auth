var Task = require("../models/Task");
var PageableCollection = require("backbone.paginator");

var ActiveTasks = Backbone.PageableCollection.extend({
  
  model: Task,
  
  url: "http://shintech.ninja:8000/api/tasks/active",

  mode: 'client',

  state: {
    pageSize: 100,
    sortKey: 'id',
    order: 1
  },
  
  queryParams: {
    totalPages: null,
    totalRecords: null,
  },
  
});

module.exports = ActiveTasks;
