const express = require('express');
const User = require('../models/users');
const router = express.Router();
const {guardAdminApi} = require('./guard');


router.get('/api/admin/getListUsers', guardAdminApi, async (req, res) => {
  console.log('here');
  const users = await User.find({});
  res.json(users);
});

router.delete('/api/admin/deleteUser/:uid', guardAdminApi, async (req, res) => {
  const uid = req.params.uid;
  await User.deleteOne({_id: uid});
  const users = await User.find({});
  res.json(users);

});

router.put('/api/admin/updateRole', guardAdminApi, async (req, res) => {
  const {_id} = req.body;
  await User.updateOne({_id: _id}, req.body);
  const users = await User.find({});
  res.json(users);
});


router.put('/api/admin/blockUser', guardAdminApi, async (req, res) => {
  const {_id} = req.body;
  await User.updateOne({_id: _id}, req.body);
  const users = await User.find({});
  res.json(users);
});

router.put('/api/admin/activateUser', guardAdminApi, async (req, res) => {
  const {_id} = req.body;
  await User.updateOne({_id: _id}, req.body);
  const users = await User.find({});
  res.json(users);
});

module.exports = router;
