global.jQuery = require('jquery');
require('bootstrap');

var App = require("./App");

_.extend(Backbone.Validation.callbacks, {
  valid: function (view, attr, selector) {
    var $el = view.$('[name=' + attr + ']'), 
        $group = $el.closest('.form-group');
    $group.removeClass('has-error');
    $group.find('.help-block').html('').addClass('hidden');
  },
  invalid: function (view, attr, error, selector) {
    var $el = view.$('[name=' + attr + ']'), 
      $group = $el.closest('.form-group');
    $group.addClass('has-error');
    var help_block = $group.find('.help-block');
    help_block.html(error).removeClass('hidden');
  }
});

var app = new App();

app.start();
