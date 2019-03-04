const express = require('express');
const Instruction = require('../models/instruction');
const Comment = require('../models/comment');
const _ = require('lodash');
const router = express.Router();


router.post('/api/postComment/:token', async (req, res) => {
  if (req.session.id === req.params.token) {
    const comment = new Comment(req.body);
    await comment.save();
    const comments = await Comment.find({instructionID: req.body.instructionID});
    const score = _.sumBy(comments, 'score') / comments.length;
    await Instruction.updateOne({_id: req.body.instructionID}, {$set: {score: score}});
    res.json({status: true});
  } else {
    res.json({status: false});
  }
});

router.get('/api/getComments/:idInstruction', async (req, res) => {
  const comments = await Comment.find({instructionID: req.params.idInstruction});
  res.json(comments);
});


module.exports = router;
