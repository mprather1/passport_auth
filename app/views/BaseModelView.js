var BaseModelView = Backbone.Marionette.View.extend({
  initialize: function(){
    console.log(this.model)
  },
  tagName: 'li',
  template: require("../templates/base-view-template.html"),
});

module.exports = BaseModelView;