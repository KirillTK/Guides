const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  isActivate: {type: Boolean, default: false},
  isAdmin: {type: Boolean, default: false}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
