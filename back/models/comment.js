const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  // {comment: String, userID: String, userName: String, score: Number}
  comment: String,
  userName: String,
  userID: String,
  score: Number,
  instructionID: String
});

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;
