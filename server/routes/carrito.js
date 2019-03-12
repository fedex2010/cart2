var express = require("express"),
    router = express.Router(),
    controllers = require("../controllers"),
    bodyParser = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/", urlencodedParser, ( req , res) => res.redirect(302, req.get('origin') + '/carrito'));
module.exports = router;
