var express = require("express"),
    router = express.Router(),
    controllers = require("../controllers"),
    bodyParser = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    jsonParser = bodyParser.json()

router.get("/normandia", ( req , res) => controllers.normandia.getTemplate( req , res ))
router.get("/carousel",  ( req , res) => controllers.cart.getCarousel( req , res ));
router.get("/summary", ( req , res) => controllers.cart.summary( req , res ));
router.get("/c_:cartId/warranty/:productId", ( req , res) => controllers.cart.warrantyMobile( req , res ));
router.get("/:cartId", ( req , res) => controllers.cart.getCart( req , res ));

router.post("/fake_product_view/:productId", urlencodedParser, ( req , res) => controllers.cart.fake_product(req , res));
router.post("", urlencodedParser, ( req , res) => controllers.cart.addProduct(req , res));
router.post("/:cartId/cupon", jsonParser, ( req , res) => controllers.cart.setCoupon(req , res));
router.post("/c_:cartId/aaPlus", jsonParser, ( req , res) => controllers.cart.setAAPlus(req , res));
router.post("/setWarranty", jsonParser, ( req , res) => controllers.cart.setWarranty( req , res));
router.post("/vendedor", urlencodedParser, ( req , res) =>  controllers.cart.sellerLoginAction( req , res));

router.put("/:cartId", urlencodedParser, ( req , res) =>  controllers.cart.editProduct( req , res));

router.delete("/:productId", urlencodedParser, (req , res) => controllers.cart.deleteProduct( req , res));
router.delete( "/c_:cartId/cupon/:couponCode", ( req , res) => controllers.cart.deleteCoupon( req , res));
router.delete("/c_:cartId/aaPlus", ( req , res) => controllers.cart.deleteAAPlus( req , res));
  
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



router.get('/fake_product_view/:productId', cartController.fake_product_view);-------------NO SE MIGRA
router.get('/c_:cartId/arplus-terminos-y-condiciones', cartController.arplusterminosycondiciones);-------------NO SE MIGRA
router.get('/c_:cartId/warranty/:productId/terminos-y-condiciones', cartController.terminosycondiciones);-------------NO SE MIGRA
router.get('/garex', garexController.index);-------------NO SE MIGRA
router.get('/garex/encode', garexController.encode);-------------NO SE MIGRA
*/