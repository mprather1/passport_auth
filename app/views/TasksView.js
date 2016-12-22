var TaskView = require("./TaskView");
var TaskModalView = require("./TaskModalView");

var TasksView = Backbone.Marionette.CollectionView.extend({
  
  tagName: 'tbody',
  
  initialize: function(options){
    this.sort = false;
    this.collection.setSorting("_id", 1);
    this.completedTasks = options.completedTasks;
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(Backbone, 'tasks:sort', this.sortCollection);
  },
  
  childView: TaskView,
  
  ui: {
    tableRowClicker: '.table-row',
  },
  
  events: {
    'click @ui.tableRowClicker': 'handleClick',
  },
  
  handleClick: function(e){
    var id = $(e.currentTarget).data("id");
    var task = this.collection.get(id);
    var taskModalView = new TaskModalView({ 
      model: task,
      completedTasks: this.completedTasks
    });
  },
  
  sortCollection: function(options){
    var name = options.target.id;
    if (this.sort === false){
      this.sort = true;
      this.collection.setSorting(name, -1);
      this.collection.fullCollection.sort();
      this.collection.getFirstPage();
    } else {
      this.sort = false;
      this.collection.setSorting(name, 1);
      this.collection.fullCollection.sort();
      this.collection.getFirstPage();
    }
  }  

});

module.exports = TasksView;