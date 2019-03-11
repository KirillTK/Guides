const mongoose = require('mongoose');
const User = require('./users');

const LikeSchema = new mongoose.Schema({
  commentID: {type: mongoose.Schema.Types.ObjectId, ref: 'comments'},
  userLike: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Like = mongoose.model('likes', LikeSchema);

module.exports = Like;
