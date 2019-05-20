var express = require("express"),
router = express.Router(),
cart = require("../controllers/CartControllers"),
garex = require("../controllers/GarexControllers");

let CartControllers = new cart()
let GarexControllers = new garex()

//router.post('/sendCart', (req, res, next) => CartControllers.sendCart(req, res, next)  );
//router.get('/getCartStatus/:cartId', (req, res, next) => CartControllers.getCartStatus(req, res, next));

//test
// router.get("/clean", (req, res) => CartControllers.clean(req, res));
// router.post("/", (req, res, next) => CartControllers.addProduct(req, res, next));
router.get('/garex',   (req, res, next) => GarexControllers.garex(req, res, next)  );
router.get('/garex/encode', (req, res, next) => GarexControllers.encode(req, res, next) );

router.get("/summary", (req, res, next) => CartControllers.summary(req, res, next));
router.get("*", (req, res) => CartControllers.getIndex(req, res));

router.post("/", (req, res, next) => CartControllers.addProduct(req, res, next));

module.exports = router;
