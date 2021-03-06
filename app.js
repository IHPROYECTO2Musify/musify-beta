const dotenv = require('dotenv').config() 
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const debug = require('debug')(`m2-0118-passport-auth:${path.basename(__filename).split('.')[0]}`)
const passportConfig = require('./passport')
const dbURL= process.env.dbURL;

mongoose.promise = Promise;
mongoose.connect(dbURL)
        .then(() => debug(`Connected to ${dbURL}`))
        .catch(e => console.log(e));

//our main routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const users = require('./routes/users');
const ad = require('./routes/ad');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

passportConfig(app);
app.use((req,res,next) => {
  res.locals.user = req.user;
  res.locals.title = 'Passport Auth 0118';
  next();
}) 

app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);
app.use('/ad', ad);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;