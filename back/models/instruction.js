const mongoose = require('mongoose');

const InstructionSchema = new mongoose.Schema({
  name: String,
  theme: String,
  tags: [{
    display: String,
    value: String
  }],
  steps: [{
    stepTitle: String,
    descriptionTitle: String
  }],
  imgHref: String,
  idUser: String,
  score: {type: Number, default: 0},
  comments: {
    type: [
      {comment: String, userID: String, userName: String, score: Number}
    ], default: null
  },
  author: String,
  description: String
});

const Instruction = mongoose.model('instructions', InstructionSchema);

module.exports = Instruction;
