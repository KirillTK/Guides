const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const {sendEmail} = require('./scripts/sendEmail');
const _ = require('lodash');

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
  res.json({user: user, success: true, message: 'correct details'});
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

app.get('/api/isLoggedin', (req, res) => {
  if (req.session.user) {
    res.json({status: !!req.session.user, user: req.session.user})
  } else {
    res.json({status: !!req.session.user})
  }
});


app.get('/api/data', async (req, res) => {
  const user = await User.findOne({email: req.session.user});
  res.send('user is =>' + req.session.user);
});

app.get('/api/logout', async (req, res) => {
  req.session.destroy();
});

app.post('/api/postInstruction', async (req, res) => {
  const instruction = new Instruction(req.body);
  const i = await instruction.save();
  res.json({status: true, message: 'posted'});
});

app.get('/api/getUserInstructions', async (req, res) => {
  const uid = req.session.user._id;
  const instructions = await Instruction.find({idUser: uid});
  res.json(instructions)
});

app.get('/api/getThemes', async (req, res) => {
  const themes = await Theme.find({});
  res.json(themes);
});

app.get('/api/getTags', async (req, res) => {
  const instructions = await Instruction.find({});
  const tags = _.flattenDeep(instructions.map((inst) => inst.tags));
  const _tags = _.map(tags, tag => _.pick(tag, ['display', 'value']));
  const object = {'a': 1, 'b': '2', 'c': 3};
  res.json(_.uniq(_tags));
});

app.delete('/api/deleteInstruction/:id', async (req, res) => {
  await Instruction.deleteOne({_id: req.params.id});
  const uid = req.session.user._id;
  const instructions = await Instruction.find({idUser: uid});
  res.json(instructions)
});

app.put('/api/updateInstruction/:id', async (req, res) => {
  console.log(req.params.id, req.body);
  const result = await Instruction.updateOne({_id: req.params.id}, req.body);
  console.log(result);
});

app.get('/api/getInstructionById/:id', async (req, res) => {
  const instruction = await Instruction.findById({_id: req.params.id});
  res.json(instruction);
});


app.listen(3000, () => console.log('listen 3000 port'));
