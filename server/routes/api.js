var express             = require('express'),
    router              = express.Router(),
    controllers         = require('../controllers'),
    bodyParser          = require("body-parser"),
    urlencodedParser    = bodyParser.urlencoded({ extended: false }),
    jsonParser		    = bodyParser.json();

router.get('/health', function(req, res){ res.status(200).send('OK') });
router.get('/cart/carousel', controllers.cart.getCarousel);
router.get('/cart/summary', controllers.cart.summary);
router.get('/cart/c_:cartId/warranty/:productId', controllers.cart.warrantyMobile);
router.get('/cart/:cartId', controllers.cart.getCart);

router.post('/cart', urlencodedParser, (req, res) => controllers.cart.addProduct(req, res));
router.post('/cart/:cartId/cupon', jsonParser, controllers.cart.setCoupon);
router.post('/cart/c_:cartId/aaPlus', jsonParser, controllers.cart.setAAPlus);
router.post('/cart/setWarranty', jsonParser, controllers.cart.setWarranty);

router.put('/cart/:cartId', urlencodedParser, (req, res) => controllers.cart.editProduct(req, res));

router.delete('/cart/:prodcutId', urlencodedParser, (req, res) => controllers.cart.deleteProduct(req, res));
router.delete('/cart/c_:cartId/cupon/:couponCode', controllers.cart.deleteCoupon);
router.delete('/cart/c_:cartId/aaPlus', controllers.cart.deleteAAPlus);


module.exports = router;
/*
TODO Estas son las rutas actuales del carrito a replicar

router.get('/', cartController.index);------------------OK
router.post('/deleteProductFromCart', jsonParser, cartController.deleteProduct);---------------OK
router.post('/updateItemQuantity', jsonParser, cartController.updateItemQuantity);---------------OK
router.get('/health', function(req, res){ res.status(200).send('OK') });------------------OK
router.post('/c_:cartId/cupon', jsonParser, cartController.setCoupon);------------------OK
router.delete('/c_:cartId/cupon/:couponCode', cartController.deleteCoupon);------------------OK
router.post('/c_:cartId/aaPlus', jsonParser, cartController.setAAPlus);------------------OK
router.delete('/c_:cartId/aaPlus', cartController.deleteAAPlus);------------------OK
router.get('/c_:cartId', cartController.routeCart);------------------OK
router.post('/', urlencodedParser, cartController.addProduct);------------------OK
router.get('/getCartStatus/:cartId', cartController.getCartStatus);------------------OK(es un get a un cart)
router.get('/cart/summary', cartController.summary)------------------OK


router.get('/c_:cartId/warranty/:productId', cartController.warrantyMobile);
router.post('/setWarranty', jsonParser, cartController.setWarranty);
router.get('/getCartStatusWithWarranties/:cartId', cartController.getCartStatusWithWarranties);


router.get('/error', cartController.error);--------------LIMBO
router.post('/sendCart', jsonParser, cartController.sendCart);--------------LIMBO
router.get('/vendedor', cartController.sellerLogin);--------------LIMBO
router.post('/vendedor', urlencodedParser, cartController.sellerLoginAction);--------------LIMBO



router.get('/fake_product_view/:productId', cartController.fake_product_view);-------------NO SE MIGRA
router.get('/c_:cartId/arplus-terminos-y-condiciones', cartController.arplusterminosycondiciones);-------------NO SE MIGRA
router.get('/c_:cartId/warranty/:productId/terminos-y-condiciones', cartController.terminosycondiciones);-------------NO SE MIGRA
router.get('/garex', garexController.index);-------------NO SE MIGRA
router.get('/garex/encode', garexController.encode);-------------NO SE MIGRA
*/
