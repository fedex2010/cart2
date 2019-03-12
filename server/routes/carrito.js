var express = require("express"),
    router = express.Router(),
    controllers = require("../controllers"),
    bodyParser = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/", urlencodedParser, ( req , res) => controllers.cart.addProduct(req , res));
module.exports = router;
