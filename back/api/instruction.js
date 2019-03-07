const express = require('express');
const Instruction = require('../models/instruction');
const Theme = require('../models/theme');
const User = require('../models/users');
const router = express.Router();
const generatePDF = require('../scripts/generatePDF');
const _ = require('lodash');
const {guardInstructionApi} = require('./guard');


router.post('/api/postInstruction', guardInstructionApi, async (req, res) => {
  const {idUser} = req.body;
  const user = await User.findById(idUser);
  console.log('user', user);
  req.body.author = user.email;
  const instruction = new Instruction(req.body);
  const i = await instruction.save();
  res.json({status: true, message: 'posted'});
});

router.get('/api/getUserInstructions/:uid', async (req, res) => {
  const uid = req.params.uid;
  console.log(uid);
  const instructions = await Instruction.find({idUser: uid});
  res.json(instructions)
});

router.get('/api/getThemes', async (req, res) => {
  const themes = await Theme.find({});
  res.json(themes);
});

router.get('/api/getTags', async (req, res) => {
  const instructions = await Instruction.find({});
  const tags = _.flattenDeep(instructions.map((inst) => inst.tags));
  const _tags = _.map(tags, tag => _.pick(tag, ['display', 'value']));
  res.json(_.uniqBy(_tags, 'display'));
});

router.delete('/api/deleteInstruction/:id', guardInstructionApi, async (req, res) => {
  const {id} = req.params;
  const instruction = await Instruction.findById(id);
  await Instruction.deleteOne({_id: id});
  const instructions = await Instruction.find({idUser: instruction.idUser});
  res.json(instructions)
});

router.put('/api/updateInstruction/:id', guardInstructionApi, async (req, res) => {
  const result = await Instruction.updateOne({_id: req.params.id}, req.body);
  res.json({status: true});
});

router.get('/api/getInstructionById/:id', async (req, res) => {
  const instruction = await Instruction.findById({_id: req.params.id});
  res.json(instruction);
});


router.get('/api/search/:text', async (req, res) => {
  const searchText = req.params.text;
  const results = await Instruction.find({"name": {$regex: searchText, $options: 'i'}});
  res.json(results);
});

router.get('/api/getTopRatedInstructions', async (req, res) => {
  const instructions = await Instruction.find({}).sort('-score').limit(5);
  res.json(instructions);
});

router.get('/api/getLatestInstructions', async (req, res) => {
  const instructions = await Instruction.find({}).sort({lastEdited: 'desc'}).limit(5);
  res.json(instructions);
});

router.get('/api/getPDF/:id', async (req, res) => {
  const instruction = await Instruction.findOne({_id: req.params.id});
  const doc = generatePDF(instruction, res);
  doc.end();
});

router.get('/api/getInstructionsByTag/:tag/:page', async (req, res) => {
  const {tag, page} = req.params;
  const instructions = await Instruction.find({'tags.value': tag}).skip(+page).limit(8);
  res.json(instructions);
});

module.exports = router;
