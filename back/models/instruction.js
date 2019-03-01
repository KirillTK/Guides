const mongoose = require('mongoose');
const moment = require('moment');
const searchable = require('mongoose-regex-search');
// const mongoosastic = require('mongoosastic');
//
// const InstructionSchema = new mongoose.Schema({
//   name: {type: String, es_type: 'text'},
//   theme: {type: String, es_type: 'text'},
//   tags: [{
//     display: {type: String, es_type: 'text'},
//     value: {type: String, es_type: 'text'},
//   }],
//   steps: [{
//     stepTitle: {type: String, es_type: 'text'},
//     descriptionTitle: {type: String, es_type: 'text'},
//   }],
//   imgHref: {type: String, es_type: 'text'},
//   idUser: {type: String, es_type: 'text'},
//   score: {type: Number, default: 0},
//   author: {type: String, es_type: 'text'},
//   description: {type: String, es_type: 'text'},
// });

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

// InstructionSchema.index({name: 'text', author: 'text'});
// InstructionSchema.plugin(mongoosastic, {
//   hosts: [
//     'localhost:9200'
//   ]
// });
InstructionSchema.plugin(searchable);

const Instruction = mongoose.model('instructions', InstructionSchema);

module.exports = Instruction;
