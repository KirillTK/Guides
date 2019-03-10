const mongoose = require('mongoose');
const moment = require('moment');
const searchable = require('mongoose-regex-search');

const InstructionSchema = new mongoose.Schema({
  name: String,
  theme: String,
  tags: [{
    display: String,
    value: String,
  }],
  steps: [{
    stepTitle: String,
    descriptionTitle: String,
  }],
  imgHref: String,
  idUser: String,
  score: {type: Number, default: 0},
  author: String,
  description: String,
  lastEdited: {type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a')}
});

InstructionSchema.plugin(searchable);

const Instruction = mongoose.model('instructions', InstructionSchema);

module.exports = Instruction;
