const express = require("express"),
  logger = require("./utils/logger"),
  morgan = require("morgan"),
  sessionService = require("./services/session_service"),
  errorService = require("./services/error_service"),
  cookieParser = require("cookie-parser"),
  network  = require("./utils/network")
  apiRouter = require("./routes/api"),
  cartRouter = require("./routes/cart"),
  normaJOb = require("./jobs/norma");

let app = express();

// run norma job
normaJOb.sync();

// view engine setupS
app.set("view engine", "jade");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/carrito", sessionMiddleware, cartRouter);

//AWS
app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = errorService.getErrorObject("path not found", 404);
  logger.error("path not found --> " + `${req.method} ${req.originalUrl}`);
  res.status(404).send(err);
});

// error handler
app.use(function(err, req, res, next) {
  logger.error(JSON.stringify(err));

  let enviroment = req.app.get("env").toLowerCase();
  let errorMessage =
    enviroment !== "production" && enviroment !== "prod"
      ? err.message
      : "something was wrong!!!";

  res.status(500).send(errorService.getErrorObject(errorMessage, 500));
});

function sessionMiddleware(req, res, next) {
  try {
    req.duration = new Date().getTime();
          
    let sessionCookie = req.cookies["epi.context"];
    let cartCookie = req.cookies["cartId"];

    if (!sessionCookie) {
      sessionService.generateSessionCookie(res);
    } else {
      sessionService.setSessionContextFromCookie(res, sessionCookie);
    }

    if (cartCookie) {
      sessionService.setCartContextFromCookie(res, cartCookie);
    }

    res.locals.sellerId = req.cookies["epi.salesman"] || "";

    res.locals.xSessionContext = req.cookies["gb_session_context"] || "";

    if (
      typeof req.headers["x-subdomain"] != "undefined" &&
      req.headers["x-subdomain"] == "empresas"
    ) {
      res.locals.isEmpresarias = true;
    } else {
      res.locals.isEmpresarias = false;
    }

    if (typeof req.get("x-brand") !== "undefined")
      res.locals.xBrand = req.get("x-brand").toLowerCase();
    else {
      res.locals.xBrand = "garbarino";
      logger.warn("x-brand header not present. Set garbarino by default");
    }
    res.locals.ipClient = network.getIpClient(req, res);
    
  } catch (err) {
    next(err);
  }
  next();
}

module.exports = app;
