var NavigationView = require("./NavigationView");

var RootView = Backbone.Marionette.View.extend({
 
  tagName: 'container-fluid',
 
  template: require("../templates/root-view-template.html"),
 
  regions: {
    header: {
      el: "#header-view"
    },
    main: {
      el: "#main-view"
    },
    footer: {
      el: '#footer-view'
    }
  },
 
  initialize: function(){
    this.render();
  },
 
  onRender: function(){
    this.showChildView('header', new NavigationView({ title: "Task Manager" }));
  }

});

module.exports = RootView;