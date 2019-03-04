const express = require('express');
const User = require('../models/users');
const {sendEmail} = require('../scripts/sendEmail');
const router = express.Router();


router.post('/api/login', async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) {
    res.json({success: false, message: 'Incorrect details'});
    return;
  }

  if (!user.isActivate) {
    res.json({success: false, message: 'Please verify you account'});
    return;
  }

  req.session.user = user;
  res.json({user: user, success: true, message: 'correct details', token: req.session.id});
});

router.post('/api/registration', async (req, res) => {
  console.log(req.body);
  const existingUser = await User.findOne({email: req.body.email});
  if (existingUser) {
    res.json({success: false, message: 'Email already in use'});
    return;
  }

  const user = new User(req.body);
  sendEmail(user._id, user.email);
  const result = await user.save();
  res.json({success: true, message: 'We send email to verify you account!'});
});


router.get('/api/verify/:token', async (req, res) => {
  const user = await User.findOne({_id: req.params.token});
  user.isActivate = true;
  user.save();
  res.json({success: true, message: 'Your account been activated!'});
});


router.get('/api/isLoggedin/:token', (req, res) => {
  // if (req.session.user._id === req.params.token) {
  if (req.session.user) {
    console.log(req.session.user._id, req.params.token);
    if (req.session.user._id === req.params.token) {
      res.json({status: !!req.session.user, user: req.session.user, token: req.session.id})
    } else {
      res.json({status: false})
    }
  } else {
    res.json({status: false})
  }
});

router.get('/api/logout', async (req, res) => {
  req.session.destroy();
});

router.get('/api/getUserInfo/:uid', async (req, res) => {
  const uid = req.params.uid;
  const user = await User.findOne({_id: uid});
  if (user) {
    res.json({email: user.email, date: user.date});
  } else {
    res.json(false);
  }
});


module.exports = router;
