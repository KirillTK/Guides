const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: String,
  userName: String,
  userID: String,
  score: Number,
  instructionID: String,
  likes: {type: Number, default: 0}
});

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;
