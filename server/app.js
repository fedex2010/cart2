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
      cartRouter = require("./routes/cart"),
      carrito = require("./routes/carrito");

let app = express();

// view engine setupS
app.set("view engine", "jade");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(parallel([cookie]));

app.use("/", indexRouter);
app.get("/api/health", ( req , res) => { res.status(200).send("OK");});
app.use("/api/cart", sessionMiddleware , cartRouter);
app.use("/reactcart/api/cart", sessionMiddleware , cartRouter);
app.use("/carrito",sessionMiddleware, carrito);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = errorService.getErrorObject( "path not found",404 )
  logger.error("path not found --> " +`${req.method} ${req.originalUrl}`);
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
