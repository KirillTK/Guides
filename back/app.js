const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
cors = require('cors');
const session = require('express-session');

const originsWhitelist = [
  'http://localhost:4200'
];

const corsOptions = {
  origin: function (origin, callback) {
    const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
};

// MongoClient.connect('mongodb://admin:kirill201299@ds135255.mlab.com:35255/instructions', (err, client) => {
//
//   console.log("Connected successfully to server");
//
//   const db = client.db('list');
//
//   const col = db.collection('gameConfiguration');
//
//   col.find().toArray((err, docs) =>{
//     console.log(docs);
//   });
//
//   client.close();
// });

const indexRouter = require('./routes/index');
const api = require('./routes/api');

const app = express();
app.use(cors(corsOptions));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
  secret: "uidasjkdasd",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', api);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
