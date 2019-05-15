var express = require("express"),
  router = express.Router(),
  cart = require("../controllers/CartControllers");

  let CartControllers = new cart()

//test
// router.get("/clean", (req, res) => CartControllers.clean(req, res));
// router.post("/", (req, res, next) => CartControllers.addProduct(req, res, next));
router.get("/summary", (req, res, next) => CartControllers.summary(req, res, next));
router.get("*", (req, res) => CartControllers.getIndex(req, res));

module.exports = router;
