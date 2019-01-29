const express = require("express"),
      createError = require("http-errors"),
      logger = require("./utils/logger"),
      async = require("async"),
      uuid = require("uuid"),
      morgan = require("morgan"),
      sessionService = require('./services/session_service'),
      cookieParser   = require('cookie-parser'),
      indexRouter = require("./routes/index"),
      cartRouter = require("./routes/cart");

let app = express();

// view engine setupS
// app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

//app.use(parallel([cookie]));

app.use("/", indexRouter);
//app.get("/api/",( req , res ) => controllers.cart.renderApp( req , res ))
app.get("/api/health", ( req , res) => { res.status(200).send("OK");});
app.use("/api/cart", sessionMiddleware , cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  // res.render("error");
});

function parallel(middlewares) {
  return function(req, res, next) {
    async.each(
      middlewares,
      function(mw, cb) {
        mw(req, res, cb);
      },
      next
    );
  };
}

function sessionMiddleware( req , res ,next) {
  let sessionCookie = req.cookies['epi.context']
  let cartCookie = req.cookies['cartId']

  if (!sessionCookie) {
      sessionService.generateSessionCookie(res)
  } else {
    sessionService.setSessionContextFromCookie(res, sessionCookie)
  }

  if (cartCookie) {
      sessionService.setCartContextFromCookie(res, cartCookie)
  }

  res.locals.sellerId = req.cookies["epi.salesman"] || "";
  
  if(req.headers['x-brand'])
      res.locals.xBrand = req.headers['x-brand'].toLowerCase();
    else {
      res.locals.xBrand = 'garbarino';
      logger.warn('x-brand header not present. Set garbarino by default');
  }

  next()
}

module.exports = app;
