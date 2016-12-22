var TableView = Backbone.Marionette.View.extend({
  
  tagName: 'div',
  
  
  template: require("../templates/table-view-template.html"),
  
  className: 'panel panel-default',
  
  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    }
  },
  
  ui: {
    header: ".table-header"
  },
  
  events: {
    'mouseover .table-header': 'mouseoverHeader',
    'mouseout .table-header': 'mouseoutHeader',
    'mouseover .table-row': 'mouseoverRow',
    'mouseout .table-row': 'mouseoutRow',
    'change input[type=radio]': 'changedRadio',
    'click @ui.header': 'sortCollection'
  },
  
  mouseoverHeader: function(event){
    $(event.currentTarget).css({"background-color":"lightgrey","cursor":"pointer"});
  },
  
  mouseoutHeader: function(event){
    $(event.currentTarget).css("background-color", "rgb(231, 231, 230)");
  },
  
  mouseoverRow: function(event){
    $(event.currentTarget).css({"background-color":"rgb(255, 255, 117)","cursor":"pointer"});
  },
  
  mouseoutRow: function(event){
    $(event.currentTarget).css("background-color", "");
  },
  changedRadio: function(e){
    Backbone.history.navigate('tasks/' + e.currentTarget.value, { trigger: true });
  },
  sortCollection: function(e){
    Backbone.trigger('tasks:sort', e);    
  }
  
});

module.exports = TableView;