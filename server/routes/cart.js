var router = require("express").Router();

router.use("/", require("./carrito"));
router.use("/api/cart/", require("./api"));

module.exports = router;
