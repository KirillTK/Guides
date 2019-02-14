const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const session = require('express-session');
const {insertUsers, deleteAllUsers} = require('../public/scripts/users');
const {sendEmail} = require('../public/scripts/sendEmail');
const uniqid = require('uniqid');

const connectionString = 'mongodb://admin:kirill201299@ds135255.mlab.com:35255/instructions';

router.post('/registration', (req, res) => {

  MongoClient.connect(connectionString, {useNewUrlParser: true}, async (err, client) => {
    const db = client.db('instructions');
    const user = req.body;
    user.isActivate = false;
    user.isAdmin = false;
    const existingUsers = await db.collection('users').find({email: user.email}).toArray();
    if (existingUsers.length === 0) {
      const insertedUser = await db.collection('users').insertOne(user);
      sendEmail(insertedUser.insertedId);
    } else {
      sendEmail(existingUsers[0]._id);
    }

    res.send({result: 'inserted!'});
    client.close();
  });

});


router.get('/verify/:token', (req, res) => {

  MongoClient.connect(connectionString, {useNewUrlParser: true}, async (err, client) => {
    const db = client.db('instructions');
    const col = db.collection('users');
    console.log('token', req.params.token);
    const existingUsers = await db.collection('users').find({_id: ObjectId(req.params.token)}).toArray();
    if (existingUsers.length !== 0) {
      const user = existingUsers[0];
      col.updateOne({_id: user._id}, {$set: {isActivate: true}});
      res.redirect('http://localhost:4200/');
    } else {
      res.send({result: 'incorrect token'});
    }
    client.close();
  });
});

router.get('/generateData', (req, res) => {
  insertUsers();
  // MongoClient.connect(connectionString, (err, client) => {
  //   const db = client.db('instructions');
  //   const col = db.collection('users');
  //   col.find().toArray((err, docs) => {
  //     console.log(docs);
  //   });
  //
  //   client.close();
  // });
  res.send('success');
});

router.get('/dropData', (req, res) => {
  deleteAllUsers();
  res.send('success');
});


router.get('/session', (req, res) => {
  console.log(req.session, req.sessionID);
  res.send({token: req.sessionID});
});

module.exports = router;
