var express = require('express');
var router = express.Router();
var  controllers=require('../controllers');

router.get('/cart/:cartId', controllers.cart.getCart);

module.exports = router;
