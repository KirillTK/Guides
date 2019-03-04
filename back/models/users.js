const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  isActivate: {type: Boolean, default: false},
  isAdmin: {type: Boolean, default: false},
  date: {type: String, default: moment().format('MMMM Do YYYY')}
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


const User = mongoose.model('User', UserSchema);

module.exports = User;
