var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mainRouter = require('./src/routes/main');
var usersRouter = require('./src/routes/users');
var carrinhoRouter = require('./src/routes/carrinho');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, './src/views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'abcde', resave: true, saveUninitialized: true}));
app.use(methodOverride('_method'))

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/carrinho',carrinhoRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
