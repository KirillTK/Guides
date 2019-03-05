const express = require('express');
const User = require('../models/users');
const router = express.Router();
const {guardAdminApi} = require('./guard');


router.get('/api/admin/getListUsers', guardAdminApi, async (req, res) => {
  const users = await User.find({});
  res.json(users);
  // res.json({status: false});
  // }
});

router.delete('/api/admin/deleteUser/:uid', async (req, res) => {
  if (req.session.user) {
    if (req.session.user.isAdmin) {
      const uid = req.params.uid;
      await User.deleteOne({_id: uid});
      const users = await User.find({});
      res.json(users);
    } else res.json({status: false});
  } else {
    res.json({status: false});
  }
});

router.put('/api/admin/updateRole', async (req, res) => {
  if (req.session.user) {
    if (req.session.user.isAdmin) {
      const {_id} = req.body;
      await User.updateOne({_id: _id}, req.body);
      const users = await User.find({});
      res.json(users);
    } else res.json({status: false});
  } else {
    res.json({status: false});
  }
});


router.put('/api/admin/blockUser', async (req, res) => {
  if (req.session.user) {
    if (req.session.user.isAdmin) {
      const {_id} = req.body;
      await User.updateOne({_id: _id}, req.body);
      const users = await User.find({});
      res.json(users);
    } else res.json({status: false});
  } else {
    res.json({status: false});
  }
});

module.exports = router;
