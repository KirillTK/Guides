const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const {sendEmail} = require('./scripts/sendEmail');
const _ = require('lodash');
const http = require('http');
const server = http.createServer(app);
const WebsocketServer = require('ws').Server;


const originsWhitelist = [
  'http://localhost:4200'
];

const corsOptions = {
  origin: (origin, callback) => {
    const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
};

app.use(session({
  secret: 'sakdhnasjkdhjk1i2j3huj2uyjasldjkasdjaslkdaasd1k',
  saveUninitialized: false,
  resave: false
}));

mongoose.Promise = Promise;
mongoose.connect('mongodb://admin:kirill201299@ds253104.mlab.com:53104/testdatabase', {useNewUrlParser: true}).then(() => console.log('Mongoose up!'));
app.use(bodyParser.json());
// app.use(cors(corsOptions));
const User = require('./models/users');
const Instruction = require('./models/instruction');
const Theme = require('./models/theme');
const Comment = require('./models/comment');


app.post('/api/login', async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) {
    res.json({success: false, message: 'Incorrect details'});
    return;
  }

  if (!user.isActivate) {
    res.json({success: false, message: 'Please verify you account'});
    return;
  }
  // req.session.user = req.body.email;
  req.session.user = user;
  res.json({user: user, success: true, message: 'correct details', token: req.session.id});
});

app.post('/api/registration', async (req, res) => {
  const existingUser = await User.findOne({email: req.body.email});
  if (existingUser) {
    res.json({success: false, message: 'Email already in use'});
    return;
  }

  const user = new User(req.body);
  sendEmail(user._id);
  const result = await user.save();
  res.json({success: true, message: 'We send email to verify you account!'});
});

app.get('/api/verify/:token', async (req, res) => {
  const user = await User.findOne({_id: req.params.token});
  user.isActivate = true;
  user.save();
  // res.redirect('http://localhost:4200/login');
  res.json({success: true, message: 'Your account been activated!'});
});

app.get('/api/isLoggedin/:token', (req, res) => {
  // if (req.session.user._id === req.params.token) {

  if (req.session) {
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


app.get('/api/data', async (req, res) => {
  const user = await User.findOne({email: req.session.user});
  res.send('user is =>' + req.session.user);
});

app.get('/api/logout', async (req, res) => {
  req.session.destroy();
});

app.post('/api/postInstruction/:token', async (req, res) => {
  if (req.session.id === req.params.token) {
    const instruction = new Instruction(req.body);
    const i = await instruction.save();
    res.json({status: true, message: 'posted'});
  } else {
    res.json({status: false, message: 'invalid token'});
  }
});

app.get('/api/getUserInstructions/:uid', async (req, res) => {
  const uid = req.params.uid;
  const instructions = await Instruction.find({idUser: uid});
  res.json(instructions)
});

app.get('/api/getUserInfo/:uid', async (req, res) => {
  const uid = req.params.uid;
  const user = await User.findOne({_id: uid});
  res.json(user.email);
});

app.get('/api/getThemes', async (req, res) => {
  const themes = await Theme.find({});
  res.json(themes);
});

app.get('/api/getTags', async (req, res) => {
  const instructions = await Instruction.find({});
  const tags = _.flattenDeep(instructions.map((inst) => inst.tags));
  const _tags = _.map(tags, tag => _.pick(tag, ['display', 'value']));
  res.json(_.uniq(_tags));
});

app.delete('/api/deleteInstruction/:id/:token', async (req, res) => {
  if (req.session.id === req.params.token) {
    await Instruction.deleteOne({_id: req.params.id});
    const uid = req.session.user._id;
    const instructions = await Instruction.find({idUser: uid});
    res.json(instructions)
  } else {
    res.json({status: false});
  }
});

app.put('/api/updateInstruction/:id/:token', async (req, res) => {
  if (req.session.id === req.params.token) {
    const result = await Instruction.updateOne({_id: req.params.id}, req.body);
    res.json({status: true});
  } else {
    res.json({status: false});
  }
});

app.get('/api/getInstructionById/:id', async (req, res) => {
  const instruction = await Instruction.findById({_id: req.params.id});
  res.json(instruction);
});


app.post('/api/postComment/:token', async (req, res) => {
  if (req.session.id === req.params.token) {
    const comment = new Comment(req.body);
    await comment.save();
    const comments = await Comment.find({instructionID: req.body.instructionID});
    const score = _.sumBy(comments, 'score') / comments.length;
    await Instruction.updateOne({_id: req.body.instructionID}, {$set: {score: score}});
    res.json({status: true});
  } else {
    res.json({status: false});
  }
});

app.get('/api/getComments/:idInstruction', async (req, res) => {
  const comments = await Comment.find({instructionID: req.params.idInstruction});
  res.json(comments);
});


server.listen(3000, () => console.log('listen 3000 port'));

//
// var wss = new WebsocketServer({server: server, path: "/comments"});
// // var wss = new WebsocketServer({server: server});
//
// wss.on('connection', (ws) => {
//   ws.on('message', async (message) => {
//     const instructions = await Instruction.find({});
//     const tags = _.flattenDeep(instructions.map((inst) => inst.tags));
//     const _tags = _.map(tags, tag => _.pick(tag, ['display', 'value']));
//     ws.send(JSON.stringify(_.uniq(_tags)));
//   });
// });