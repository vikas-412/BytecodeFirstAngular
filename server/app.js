var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var cors = require('cors')
var multer = require('multer');
var bodyParser =require('body-parser');

const config = require('./config');

mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error',(error)=>console.error(error));
db.once('open',()=>console.log('Database connected'));

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('superSecret', config.secret);

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// var photoStorage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./Images");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//   }
// });

// let singleFileUpload = () => {
//   return multer({
//     storage: photoStorage
//   });
// }




// app.use('/users', usersRouter);

// app.post('/',(req,res)=>{
//   console.log(req.body);
//   res.send({
//     message : 'Tranfer success from server',
//     success : true
//   })
// })

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
