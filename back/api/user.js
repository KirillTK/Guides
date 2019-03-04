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
          res.json({success: true});
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


  app.get('/api/logout', (req, res) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    req.logout();
  });


  app.get('/api/verify/:token', async (req, res) => {
    const user = await User.findOne({_id: req.params.token});
    user.isActivate = true;
    user.save();
    res.json({success: true, message: 'Your account been activated!'});
  });


  app.get('/api/isLoggedin', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({status: true})
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
