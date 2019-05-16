var express = require("express"),
  router = express.Router(),
  cart = require("../controllers/CartControllers");
  GarexControllers = require("../controllers/GarexControllers");

let CartControllers = new cart()

router.post("/", (req, res, next) => CartControllers.addProduct(req, res, next));
router.get("/", (req, res) => CartControllers.getIndex(req, res));
router.get("/summary", (req, res, next) => CartControllers.summary(req, res, next));

router.get('/garex',  GarexControllers.garex   );
//router.get('/garex/encode', garexController.encode);

//test
router.get("/clean", (req, res) => CartControllers.clean(req, res));

module.exports = router;
