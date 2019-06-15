var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');

var app = express();
// them tam
// var mydb=require('./dbs/db');
// var dm=mydb.load('select * from Tags')

// var dm2=mydb.delete('tags',8);
// var dm1=mydb.add('tags','(name)','($1)',['2D']);
// var dm1=mydb.add('tags',{name: '2D'});

// console.log("chay cchua");



// view engine setups
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: '_layouts/layout' });
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//index---------------------------------------------- 
app.use('/', indexRouter);

//user-----------------------------------------------
app.use('/users', usersRouter);

// them cho admin
app.use('/admin',require("./routes/admin/admin.route"));

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

console.log("chạy thôi: http://localhost:3000");

module.exports = app;
