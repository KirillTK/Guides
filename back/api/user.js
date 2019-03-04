const express = require('express');
const User = require('../models/users');
const {sendEmail} = require('../scripts/sendEmail');
// const app = express.Router();


module.exports = function (app, passport) {

  app.post('/api/login', (req, res, next) => {

    return passport.authenticate('local-login', {session: false}, (err, passportUser, info) => {

      // console.log(passportUser);
      if (info) {
        res.json({success: false, message: info});
      }

      if (err) {
        return next(err);
      }
      if (passportUser) {

        req.logIn(passportUser, (err) => {
          if (err) next();
          res.json(passportUser)
        });
      }
    })(req, res, next);

  });

  app.post('/api/registration', (req, res, next) => {

    return passport.authenticate('local-signup', {session: false}, (err, passportUser, info) => {

      if (info) {
        res.json({success: false, message: info});
      }

      if (err) {
        return next(err);
      }
      if (passportUser) {
        sendEmail(passportUser._id, passportUser.email);
        res.json({success: false, message: 'Please verify you account'});
      }
    })(req, res, next);
  });


  app.get('/api/logout', function (req, res) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    req.logout();
    res.redirect('/');
  });


  app.get('/api/verify/:token', async (req, res) => {
    const user = await User.findOne({_id: req.params.token});
    user.isActivate = true;
    user.save();
    res.json({success: true, message: 'Your account been activated!'});
  });


  app.get('/api/isLoggedin/:token', (req, res) => {
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


  app.get('/api/getUserInfo/:uid', async (req, res) => {
    const uid = req.params.uid;
    const user = await User.findOne({_id: uid});
    if (user) {
      res.json({email: user.email, date: user.date});
    } else {
      res.json(false);
    }
  });

};


// app.post('/api/login', async (req, res) => {
//   const user = await User.findOne(req.body);
//   if (!user) {
//     res.json({success: false, message: 'Incorrect details'});
//     return;
//   }
//
//   if (!user.isActivate) {
//     res.json({success: false, message: 'Please verify you account'});
//     return;
//   }
//
//   req.session.user = user;
//   res.json({user: user, success: true, message: 'correct details', token: req.session.id});
// });
//
// app.post('/api/registration', async (req, res) => {
//   console.log(req.body);
//   const existingUser = await User.findOne({email: req.body.email});
//   if (existingUser) {
//     res.json({success: false, message: 'Email already in use'});
//     return;
//   }
//
//   const user = new User(req.body);
//   sendEmail(user._id, user.email);
//   const result = await user.save();
//   res.json({success: true, message: 'We send email to verify you account!'});
// });
// module.exports = app;
