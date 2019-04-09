const express = require("express"),
      logger = require("./utils/logger"),
      morgan = require("morgan"),
      sessionService = require('./services/session_service'),
      errorService = require('./services/error_service'),
      cookieParser   = require('cookie-parser'),
      cartRouter = require("./routes/cart"),
      carrito = require("./routes/carrito");

let app = express();

// view engine setupS
app.set("view engine", "jade");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/carrito",sessionMiddleware, carrito);
app.use("/carrito/api/cart", sessionMiddleware , cartRouter);
app.use("/clean", function(req,res){
  sessionService.resetSessionCookies(res)
  res.send({"cleaned":"ok"})
});


//AWS
app.get("/api/health", ( req , res) => { res.status(200).send("OK");});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = errorService.getErrorObject( "path not found",404 )
  logger.error("path not found --> " +`${req.method} ${req.originalUrl}`);
  res.status(404).send(err)
});

// error handler
app.use(function(err, req, res, next) {
  logger.error(JSON.stringify(err));

  let enviroment = req.app.get("env").toLowerCase()
  let errorMessage = ( enviroment !== "production" && enviroment !== "prod" )? err.message : "something was wrong!!!";
  
  res.status(500).send( errorService.getErrorObject( errorMessage,500 ) )
});


function sessionMiddleware( req , res ,next) {
  logger.info('sessionMiddleware --> '+ JSON.stringify(req.headers));
  logger.info('x-brand --> '+ req.get('x-brand'));
  logger.info('X-Brand --> '+ req.get('X-Brand'));
  try{
    
    if( req.path.includes("newCart") ){
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

    if( typeof req.get('x-brand') !== "undefined" )
        res.locals.xBrand = req.get('x-brand').toLowerCase();
      else {
        res.locals.xBrand = 'garbarino';
        logger.warn('x-brand header not present. Set garbarino by default');
    }
    res.locals.xBrand = 'compumundo';
  }catch(err){
    next(err)
  }
  next()
}

module.exports = app;
