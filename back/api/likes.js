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
  console.log('alreadyLiked', alreadyLiked);
  if (alreadyLiked) {
    console.log('here', alreadyLiked);
    await Like.deleteOne({userLike: req.user._id, commentID: commentID});
    await Comment.updateOne({instructionID: instructionID, userID: req.user._id}, {"$inc": {likes: -1}});
  } else {
    console.log('here2', alreadyLiked);
    const like = new Like(_like);
    await like.save();
    await Comment.updateOne({instructionID: instructionID, userID: req.user._id}, {"$inc": {likes: 1}});
  }
  // const like = new Like(_like);
  // like.save(async (err, like) => {
  //   if (err) {
  //     await Like.deleteOne({userLike: req.user._id, commentID: commentID});
  //     await Comment.updateOne({instructionID: instructionID, userID: req.user._id}, {"$inc": {likes: -1}});
  //     res.json({status: true})
  //   } else {
  //     console.log('here', instructionID, req.user._id);
  //     await Comment.updateOne({instructionID: instructionID, userID: req.user._id}, {"$inc": {likes: 1}});
  //     res.json({status: true})
  //   }
  // });
  res.json({status: true})
});


module.exports = router;
