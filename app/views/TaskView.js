var TaskView = Backbone.Marionette.View.extend({
  
  tagName: 'tr',
  
  className: 'table-row',

  template: require("../templates/task-view-template.html"),
  
  attributes: function(){
    if (this.model.get('_id')){
      return {
        "data-id": this.model.get('_id'),
      };
    }
  },
  
  id: function(){
    if (this.model.get('completed') === true){
      return 'completed';
    } else {
      return 'active';
    }
  },
  
  serializeData: function(){
    return {
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

module.exports = TaskView;