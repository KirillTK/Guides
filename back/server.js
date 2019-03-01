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
// const mexp = require('mongoose-elasticsearch-xp');

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
  sendEmail(user._id, user.email);
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


app.get('/api/admin/getListUsers', async (req, res) => {
  if (req.session.user.isAdmin) {
    const users = await User.find({});
    res.json(users);
  } else {
    res.json({status: false});
  }
});

app.delete('/api/admin/deleteUser/:uid', async (req, res) => {
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

app.put('/api/admin/updateRole', async (req, res) => {
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


app.put('/api/admin/blockUser', async (req, res) => {
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
//
// Instruction.createMapping({
//   "settings": {
//     "number_of_shards": 1,
//     "number_of_replicas": 0,
//     "analysis": {
//       "filter": {
//         "nGram_filter": {
//           "type": "nGram",
//           "min_gram": 2,
//           "max_gram": 20,
//           "token_chars": [
//             "letter",
//             "digit",
//             "punctuation",
//             "symbol"
//           ]
//         }
//       },
//       "analyzer": {
//         "nGram_analyzer": {
//           "type": "custom",
//           "tokenizer": "whitespace",
//           "filter": [
//             "lowercase",
//             "asciifolding",
//             "nGram_filter"
//           ]
//         },
//         "whitespace_analyzer": {
//           "type": "custom",
//           "tokenizer": "whitespace",
//           "filter": [
//             "lowercase",
//             "asciifolding"
//           ]
//         }
//       }
//     }
//   },
//   "mappings": {
//     "movie": {
//       "_all": {
//         "analyzer": "nGram_analyzer",
//         "search_analyzer": "whitespace_analyzer"
//       },
//       "properties": {
//         "_id": {
//           "type" :"text",
//           "index": true
//         }
//       }
//     }
//   }
// }, function (err, mapping) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(mapping);
//   }
// });

// const stream = Instruction.synchronize();
// let count = 0;
// stream.on('data', () => {
//   count++;
// });
//
// stream.on('close', () => {
//   console.log('Indexed' + count + 'documents');
// });
//
// stream.on('error', (error) => {
//   console.log(error)
// });
//

app.get('/api/search/:text', async (req, res) => {
  const searchText = req.params.text;
  // Instruction.search({
  //   "multi_match" : {
  //     "query":    searchText,
  //     "type":     "phrase",
  //     "fields":   [ "title", "excerpt", "body", "risk_challenges", "curated_url" ],
  //     "slop":     10
  //   }
  // }, function (err, results) {
  //   res.json(results);
  // });
  // Instruction.search( searchText, (error, results) => {
  //   res.json(results);
  // });
  const results = await Instruction.find({"name": {$regex: searchText, $options: 'i'}});
  res.json(results);
});

app.get('/api/getTopRatedInstructions', async (req, res) => {
  const instructions = await Instruction.find({}).sort('-score').limit(5);
  res.json(instructions);
});

app.get('/api/getLatestInstructions', async (req, res) => {
  const instructions = await Instruction.find({}).sort({lastEdited: 'desc'}).limit(5);
  res.json(instructions);
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
