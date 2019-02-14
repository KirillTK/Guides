const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const {insertUsers, deleteAllUsers} = require('../public/scripts/users');
const {sendEmail} = require('../public/scripts/sendEmail');
const uniqid = require('uniqid');

const connectionString = 'mongodb://admin:kirill201299@ds135255.mlab.com:35255/instructions';
const users = [];

router.post('/registration', async (req, res) => {

  sendEmail(req.sessionID);

  MongoClient.connect(connectionString, {useNewUrlParser: true}, (err, client) => {
    const db = client.db('instructions');
    const user = req.body;
    user.isActivate = false;
    user.isAdmin = false;
    db.collection('users').insertOne(user);
    user.token = req.sessionID;
    users.push(user);
    client.close();
  });
  res.send({sessionID: req.sessionID});
});


router.get('/verify/:token', (req, res) => {
  const user = users.find((user) => user.token === req.params.token);
  if (user) {

    MongoClient.connect(connectionString, {useNewUrlParser: true}, (err, client) => {
      const db = client.db('instructions');
      const col = db.collection('users');
      col.updateOne({_id: user._id}, {$set: {isActivate: true}});
      client.close();
    });
  }
  res.send({token: req.params.token});
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
