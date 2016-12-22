var LoginView = Backbone.Marionette.View.extend({
  tagName: 'div',
  className: 'modal fade',
  template: require("../templates/login-modal-view-template.html"),
  ui: {
    login: "#login-button"
  },
  events: {
    'click @ui.login': 'login'
  },
  onRender: function(){
    this.$el.modal('show');
    window.history.back();
  },
  login: function(){
    var username = $('#username_input').val();
    console.log("username: " + username);
    var user = this.collection.where({ username: username });
    console.log(user[0].attributes.password_hash);
  }
});

module.exports = LoginView;