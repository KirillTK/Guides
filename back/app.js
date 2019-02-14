const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uniqid = require('uniqid');

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
  secret: uniqid(),
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({url:'mongodb://admin:kirill201299@ds135255.mlab.com:35255/instructions'})
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