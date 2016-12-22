var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var UserSchema = new Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  email: String
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);