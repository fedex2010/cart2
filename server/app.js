const express = require("express"),
  logger = require("./utils/logger"),
  morgan = require("morgan"),
  sessionService = require("./services/session_service"),
  errorService = require("./services/error_service"),
  cookieParser = require("cookie-parser"),
  path = require("path"),
  controllers = require("./controllers"),
  normaJobs = require("./normaJob"),
  cartRouter = require("./routes/cart");

var schedule = require("node-schedule");

schedule.scheduleJob("*/1 * * * *", function() {
  logger.error("running Job: norma sync");
  normaJobs.job("garbarino",false);
  normaJobs.job("compumundo",false);
  normaJobs.job("empresarias",false);
});

let app = express();

// view engine setupS
app.set("view engine", "jade");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/carrito", sessionMiddleware, getIndex);
app.get("/carrito/summary", sessionMiddleware, (req, res) =>
  controllers.cart.summary(req, res)
);
app.use("/carrito/api/cart", sessionMiddleware, cartRouter);
app.use("/clean", function(req, res) {
  sessionService.resetSessionCookies(res);
  res.send({ cleaned: "ok" });
});

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
  //logger.info('sessionMiddleware --> '+ JSON.stringify(req.headers));
  //logger.info('x-brand --> '+ req.get('x-brand'));
  //logger.info('X-Brand --> '+ req.get('X-Brand'));
  try {
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
  } catch (err) {
    next(err);
  }
  next();
}
function getIndex(req, res, next) {
  
  let whereToGo =
    res.locals.xBrand.toLowerCase() == "compumundo"
      ? "compumundo"
      : "garbarino";
  whereToGo = res.locals.isEmpresarias ? "empresarias" : whereToGo;
  console.log("\n\n\n\n request-> " +whereToGo);

  res.sendFile(whereToGo + ".html", { root: "./public/" + whereToGo }, function(err) {
    if (err) {
      logger.error("index not found for " + whereToGo);
      res.sendFile("index.html", { root: "./public/" + whereToGo }, function(err) {
        if (err) {
          logger.error("index not found for " + whereToGo + " fallback!");
          next(err);
        } else {
          console.log("fileSend: " + whereToGo);
        }
      });
    } else {
      console.log("fileSend: " + whereToGo);
    }
  });
}

module.exports = app;
