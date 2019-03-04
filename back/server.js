const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const Instruction = require('./models/instruction');
const Comment = require('./models/comment');
const admin = require('./api/admin');
const instruction = require('./api/instruction');
// const user = require('./api/user');
const passport = require('passport');
const comments = require('./api/comment');
const cookieParser = require('cookie-parser');


app.use(session({
  secret: 'sakdhnasjkdhjk1i2j3huj2uyjasldjkasdjaslkdaasd1k',
  saveUninitialized: false,
  resave: false
}));

mongoose.Promise = Promise;
mongoose.connect('mongodb://admin:kirill201299@ds253104.mlab.com:53104/testdatabase', {useNewUrlParser: true}).then(() => console.log('Mongoose up!'));
require('./passport')(passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'anystringoftext',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', admin);
app.use('/', instruction);
app.use('/', comments);
require('./api/user')(app, passport);


server.listen(3000, () => console.log('listen 3000 port'));

const io = socketIo(server);


io.on('connection', (socket) => {
  socket.on('postReview', async (instructionID) => {
    const reviews = await Comment.find({instructionID: instructionID});
    io.emit('reviews', reviews);
  });

  socket.on('addInstruction', async (uid) => {
    const instructions = await Instruction.find({idUser: uid});
    io.emit('newInstruction', instructions);
  });

});
