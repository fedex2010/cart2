const express = require("express"),
      createError = require("http-errors"),
      logger = require("./utils/logger"),
      async = require("async"),
      uuid = require("uuid"),
      morgan = require("morgan"),
      sessionService = require('./services/session_service'),
      errorService = require('./services/error_service'),
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
  let err = errorService.getErrorObject( "path not found",404 )
  logger.error("path not found");

  res.status(404).send(err)
});

// error handler
app.use(function(err, req, res, next) {
  let enviroment = req.app.get("env").toLowerCase()
  let errorMessage = ( enviroment !== "production" && enviroment !== "prod" )? err.message : "something was wrong!!!";
  logger.error(errorMessage);

  res.status(500).send( errorService.getErrorObject( errorMessage,500 ) )
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
  try{
    
    if( req.path.includes("newCartByProductId") ){
      sessionService.resetSessionCookies(res)

    }else{
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
    }

    res.locals.sellerId = req.cookies["epi.salesman"] || "";    

    if(req.headers['x-brand'])
        res.locals.xBrand = req.headers['x-brand'].toLowerCase();
      else {
        res.locals.xBrand = 'garbarino';
        logger.warn('x-brand header not present. Set garbarino by default');
    }

  }catch(err){
    next(err)
  }
  next()
}

module.exports = app;
