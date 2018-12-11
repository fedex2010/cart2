var express     = require('express'),
    router      = express.Router(),
    controllers = require('../controllers'),
    bodyParser  = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/cart/:cartId', controllers.cart.getCart);
router.post('/cart/', urlencodedParser, (req, res) => controllers.cart.addProduct(req, res));
router.delete('/cart/:prodcutId', urlencodedParser, (req, res) => controllers.cart.deleteProduct(req, res));


module.exports = router;

/*
TODO Estas son las rutas actuales del carrito a replicar


router.get('/error', cartController.error);
router.get('/c_:cartId', cartController.routeCart);
router.get('/fake_product_view/:productId', cartController.fake_product_view);
router.get('/vendedor', cartController.sellerLogin);
router.post('/vendedor', urlencodedParser, cartController.sellerLoginAction);
router.get('/', cartController.index);------------------OK
router.post('/', urlencodedParser, cartController.addProduct);
router.get('/c_:cartId/warranty/:productId', cartController.warrantyMobile);
router.get('/c_:cartId/arplus-terminos-y-condiciones', cartController.arplusterminosycondiciones);
router.get('/c_:cartId/warranty/:productId/terminos-y-condiciones', cartController.terminosycondiciones);
router.get('/health', function(req, res){ res.status(200).send('OK') });
router.post('/deleteProductFromCart', jsonParser, cartController.deleteProduct);---------------OK
router.post('/updateItemQuantity', jsonParser, cartController.updateItemQuantity);
router.post('/setWarranty', jsonParser, cartController.setWarranty);
router.post('/sendCart', jsonParser, cartController.sendCart);
router.post('/c_:cartId/cupon', jsonParser, cartController.setCoupon);
router.delete('/c_:cartId/cupon/:couponCode', cartController.deleteCoupon);
router.post('/c_:cartId/aaPlus', jsonParser, cartController.setAAPlus);
router.delete('/c_:cartId/aaPlus', cartController.deleteAAPlus);
router.get('/garex', garexController.index);
router.get('/garex/encode', garexController.encode);


router.get('/getCartStatus/:cartId', cartController.getCartStatus);
router.get('/getCartStatusWithWarranties/:cartId', cartController.getCartStatusWithWarranties);
router.get('/summary', cartController.summary);

*/
