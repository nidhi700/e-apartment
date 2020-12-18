var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signinRouter = require('./routes/signin_route');
var addServiceCatRoute = require('./routes/service_cat_route');
var addServiceDetailRoute = require('./routes/service_detail_route');
var addFlatRouter = require('./routes/flat_route');
var addFlatmemberRouter = require('./routes/flatmember_route');
var addApartmentRouter = require('./routes/apartment_route');
var addFestival = require('./routes/festival_route');
var remindernot = require('./routes/reminder_route');


//------------------------------------------------User Area----------------------------------------
var addComplaintsUser = require('./routes/complaints_route_User');
var profile = require('./routes/profile_route_user');
//------------------------------------------------/User Area---------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

global.id="";
app.use(indexRouter);
app.use(usersRouter);
app.use(signinRouter);
app.use(addFlatRouter);
app.use(addServiceCatRoute);
app.use(addServiceDetailRoute);
app.use(addFlatmemberRouter);
app.use(addApartmentRouter);
app.use(addFestival);
app.use(remindernot);

//------------------------------------------------User Area----------------------------------------
app.use(addComplaintsUser);
app.use(profile);
//------------------------------------------------/User Area----------------------------------------


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
