const express = require('express');
const Comment = require('../models/comment');
const User = require('../models/users');
const Like = require('../models/likes');
const router = express.Router();
const _ = require('lodash');
const {guardInstructionApi} = require('./guard');


router.post('/api/likeComment', guardInstructionApi, async (req, res, next) => {
  const {commentID, instructionID} = req.body;
  console.log(commentID, req.user._id);
  const _like = {
    commentID,
    userLike: req.user._id
  };

  const alreadyLiked = await Like.findOne({commentID: commentID, userLike: req.user._id});
  if (alreadyLiked) {
    await Like.deleteOne({userLike: req.user._id, commentID: commentID});
    await Comment.updateOne({_id: commentID}, {"$inc": {likes: -1}});
  } else {
    const like = new Like(_like);
    await like.save();
    await Comment.updateOne({_id: commentID}, {"$inc": {likes: 1}});
  }
  res.json({status: true})
});


module.exports = router;
