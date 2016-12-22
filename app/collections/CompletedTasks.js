var Task = require("../models/Task");
var PageableCollection = require("backbone.paginator");

var CompletedTasks = Backbone.PageableCollection.extend({

  model: Task,

  url: "http://shintech.ninja:8000/api/tasks/completed",
  
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

module.exports = CompletedTasks;
