var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =  require('cors')
const http = require('http'); //1 avec npm i nodemon

require("dotenv").config(); //2

const { connectToMongoDB } = require('./db/db')

var indexRouter = require('./routes/index');
var osRouter = require('./routes/osRouter');
var authRouter = require('./routes/authRouter');


var app = express();

// view engine setup
app.use(cors()),
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/os',osRouter );
app.use('/auth',authRouter);



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

const server = http.createServer(app); //1
console.log(process.env.URL_MONGO)
server.listen(process.env.PORT,()=>{connectToMongoDB(),console.log("app is running on port 5001")});//1 avec process.env.PORT

module.exports = app;
