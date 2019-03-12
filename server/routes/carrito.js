var express = require("express"),
    router = express.Router(),
    {cart} = require("../controllers"),
    bodyParser = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/", urlencodedParser, (req,res) => cart.addProduct(req,res) );
module.exports = router;
