var router = require("express").Router();

router.use("/api/cart/", require("./api"));
router.use("/", require("./carrito"));

module.exports = router;
