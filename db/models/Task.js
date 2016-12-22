var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  completed: { type: Boolean, default: false },
  location_number: String,
  priority: String,
  project: String,
  descrip: String,
  requestor: String,
  assigned_to: String,
  due_date: String,
  notes: String,
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('Task', TaskSchema);