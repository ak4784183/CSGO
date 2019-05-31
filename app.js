const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moment = require('moment');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const md5 = require('md5');

const listRouter = require('./routes/list');
const loginRouter = require('./routes/login');
const addRouter = require('./routes/add');
const registerRouter = require('./routes/register');

const app = express();
app.locals.moment = moment;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cookieParser("666666"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(session({
  secret: "666666",
  name: "sessionId",
  cookie: { maxAge: 60 * 1000 },
  rolling: true,
  store: new MongoStore({
    url: 'mongodb://localhost:27017/app'
  })
}))


app.use('/list', listRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/add', addRouter);

//花了我两个小时解决的无敌大坑，以下代码只能放置在这个位置，按顺序才能正常执行
app.get('/quit', function (req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
    console.log('quit success');
  })
  //重定向登录
  res.redirect("/login");
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect('mongodb://localhost/app', {
  useNewUrlParser: true,
  useFindAndModify: false
});
const con = mongoose.connection;
con.on('open', function () {
  console.log("数据库连接成功");
})

app.listen(4000, function () {
  console.log("主页地址：" + 'http://localhost:4000/add/list');
});
module.exports = app;
