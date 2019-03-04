const express = require('express');
const Instruction = require('../models/instruction');
const Theme = require('../models/theme');
const router = express.Router();
const generatePDF = require('../scripts/generatePDF');
const _ = require('lodash');


router.post('/api/postInstruction/:token', async (req, res) => {
  if (req.session.id === req.params.token) {
    const instruction = new Instruction(req.body);
    const i = await instruction.save();
    res.json({status: true, message: 'posted'});
  } else {
    res.json({status: false, message: 'invalid token'});
  }
});

router.get('/api/getUserInstructions/:uid', async (req, res) => {
  const uid = req.params.uid;
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

router.delete('/api/deleteInstruction/:id/:token', async (req, res) => {
  if (req.session.id === req.params.token) {
    await Instruction.deleteOne({_id: req.params.id});
    const uid = req.session.user._id;
    const instructions = await Instruction.find({idUser: uid});
    res.json(instructions)
  } else {
    res.json({status: false});
  }
});

router.put('/api/updateInstruction/:id/:token', async (req, res) => {
  if (req.session.id === req.params.token) {
    const result = await Instruction.updateOne({_id: req.params.id}, req.body);
    res.json({status: true});
  } else {
    res.json({status: false});
  }
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
