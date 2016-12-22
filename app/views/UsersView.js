var UserView = require("./UserView");

var UsersView = Backbone.Marionette.CollectionView.extend({
  tagName: 'div',
  // className: 'radio',
  childView: UserView
});

module.exports = UsersView;