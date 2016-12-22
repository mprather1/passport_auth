var TaskModalView = Backbone.Marionette.View.extend({
  
  tagName: 'div',
  
  id: 'task-modal',
  
  className: 'modal fade',
  
  template: require("../templates/task-modal-view-template.html"),
  
  events: {
    'click .complete-button': 'completeTask'
  },
  initialize: function(options){
    this.completedTasks = options.completedTasks;
    this.render();
  },
  
  onRender: function(){
    if ($('#task-modal').length){
      $('#task-modal').remove();
    }
    if ($('.modal-backdrop').length){
      $('.modal-backdrop').remove();
    }
    this.$el.modal('show');
  },
  
  completeTask: function(e){
    e.preventDefault();
    this.model.set("completed", true);
    this.model.save(null, {
      success: function(model, response){
        console.log(response.message);
      }
    });
    this.model.collection.remove(this.model);
    this.completedTasks.add(this.model);
    Backbone.history.navigate('tasks/completed', { trigger: true });
  },
  
  serializeData: function(){
    return {
      "completed": this.model.get('completed'),
      'item_number': this.model.get('_id'),
      "location_number": this.model.get('location_number'),
      "project": this.model.get('project'),
      "descrip": this.model.get('descrip'),
      "priority": this.model.get('priority'),
      "requestor": this.model.get('requestor'),
      "assigned_to": this.model.get('assigned_to'),
      "due_date": this.model.get('due_date'),
      'notes': this.model.get('notes')
    };
  }
  
});

module.exports = TaskModalView;