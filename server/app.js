const createError = require("http-errors"),
      express = require("express"),
      logger = require("./utils/logger"),
      async = require("async"),
      indexRouter = require("./routes/index"),
      cartRouter = require("./routes/cart"),
      uuid = require("uuid"),
      morgan = require("morgan"),
      sessionService = require('./services/session_service'),
      cookieParser   = require('cookie-parser');

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
  console.log("MIDDLEWARE SESSION COOKIES")

  next()
}


/*NEGRO *************************************************/
function cookie(req, res, next) {
  let sessionCookie = req.cookies["epi.context"];
  let cartCookie = req.cookies["cartId"];

  if (!sessionCookie) {
    generateSessionCookie(res);
  } else {
    setSessionContextFromCookie(res, sessionCookie);
  }
  if (cartCookie) {
    setCartContextFromCookie(res, cartCookie);
  }

  res.locals.sellerId = req.cookies["epi.salesman"] || "";

  next();
}

function setCartContextFromCookie(res, cartCookie) {
  res.locals.cartId = cartCookie;
}

function generateSessionCookie(res) {
  setSessionCookie(res, "chkw-" + uuid.v4().substr(5));
}

function setSessionContextFromCookie(res, sessionCookie) {
  res.locals.session = JSON.parse(sessionCookie.replace(/\\/g, "")).userId;
}

function setSessionCookie(res, session_id) {
  logger.info("[", session_id, "] Setting new user session");
  res.locals.session = session_id;
  res.cookie("epi.context", '"{\\"userId\\":\\"' + session_id + '\\"}"', {
    encode: String
  });
}

module.exports = app;
