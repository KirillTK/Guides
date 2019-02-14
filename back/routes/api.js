const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const {insertUsers, deleteAllUsers} = require('../public/scripts/users');


// const app = express();
// app.set('trust proxy', 1); // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));

const connectionString = 'mongodb://admin:kirill201299@ds135255.mlab.com:35255/instructions';

router.post('/registration', (req, res) => {

  MongoClient.connect(connectionString, (err, client) => {
    const db = client.db('instructions');
    console.log(req.body);
    const user = req.body;
    user.isActivate = false;
    user.isAdmin = false;
    db.collection('users').insertOne(user);
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
  req.session.user = {name: 'kirill'};
  console.log(req.session);
  res.send('success');
});

module.exports = router;
