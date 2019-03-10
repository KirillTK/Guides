const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  isActivate: {type: Boolean, default: false},
  isAdmin: {type: Boolean, default: false},
  date: {type: String, default: moment().format('MMMM Do YYYY')}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
