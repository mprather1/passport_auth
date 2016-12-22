var UserView = Backbone.Marionette.View.extend({
  tagName: 'label',
  className: 'radio-inline',
  template: require("../templates/user-view-template.html"),
});

module.exports = UserView;