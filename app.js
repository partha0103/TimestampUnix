var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var timeRouter = require('./routes/time');

var app = express();

// view engine setup;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/:date', (req, res) => {
  let timeStamp = req.params.date;
  let natural, unix, date;
    if(isNaN(timeStamp)){
        unix = (new Date(timeStamp).getTime()/1000).toString();
        natural = timeStamp;
    }
    else{
        unix = timeStamp;
        let date = new Date(timeStamp * 1000);
        console.log(date);
        let month = date.toLocaleString("en-us", { month: "long" });
        natural = `${month} ${date.getDate()}, ${date.getFullYear()}`
    }
    date = {
        unix,
        natural
    }
  res.send(date);
})


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
