var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var async  = require("async");
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var uuid      = require('uuid');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(parallel([
    cookie
]));

app.use('/', indexRouter);
app.use('/api', apiRouter);

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

function parallel(middlewares) {
    return function (req, res, next) {
        async.each(middlewares, function (mw, cb) {
            mw(req, res, cb);
        }, next);
    };
}

function cookie(req, res, next) {
    let sessionCookie = req.cookies['epi.context']
    let cartCookie = req.cookies['cartId']
    if (!sessionCookie) {
        generateSessionCookie(res)
    }else {
        setSessionContextFromCookie(res, sessionCookie)
    }
    if (cartCookie) {
        setCartContextFromCookie(res, cartCookie)
    }
    next()
}

function setCartContextFromCookie(res, cartCookie){
    res.locals.cartId = cartCookie
}

function generateSessionCookie(res){
    this.setSessionCookie(res, "chkw-" + uuid.v4().substr(5))
}

function setSessionContextFromCookie(res, sessionCookie){
    res.locals.session = JSON.parse(sessionCookie.replace(/\\/g, '')).userId
}

function setSessionCookie(res, session_id){
    logger.info("[", session_id, "] Setting new user session")
    res.locals.session = session_id
    res.cookie('epi.context', '"{\\"userId\\":\\"'+ session_id +'\\"}"', {encode: String })
}


module.exports = app;
