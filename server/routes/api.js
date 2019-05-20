var express = require("express"),
    router = express.Router(),
    controllers = require("../controllers"),
    bodyParser = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    jsonParser = bodyParser.json();
    
router.get("/carousel",  ( req , res) => controllers.cart.getCarousel( req , res ));
router.get("/summary", ( req , res) => controllers.cart.summary( req , res ));
router.get("/c_:cartId/warranty/:productId", ( req , res) => controllers.cart.warrantyMobile( req , res ));
router.get("/newCart/:productId/:cupon", ( req , res) => controllers.cart.newCart( req , res ));
router.get("/:cartId", ( req , res) => controllers.cart.getCart( req , res ));

router.post("/fake_product_view/:productId", urlencodedParser, ( req , res) => controllers.cart.fake_product(req , res));
router.post("/", urlencodedParser, ( req , res) => controllers.cart.addProduct(req , res));
router.post("/:cartId/cupon", jsonParser, ( req , res) => controllers.cart.setCoupon(req , res));
router.post("/c_:cartId/aaPlus", jsonParser, ( req , res) => controllers.cart.setAAPlus(req , res));
router.post("/setWarranty", jsonParser, ( req , res) => controllers.cart.setWarranty( req , res));
router.post("/vendedor", urlencodedParser, ( req , res) =>  controllers.cart.sellerLoginAction( req , res));

router.post("/setLoginMessageClosedCookie", ( req , res) =>  controllers.cart.setLoginMessageClosedCookie( req , res));

router.put("/:cartId", urlencodedParser, ( req , res) =>  controllers.cart.editProduct( req , res));

router.delete("/:productId", urlencodedParser, (req , res) => controllers.cart.deleteProduct( req , res));
router.delete( "/c_:cartId/cupon/:couponCode", ( req , res) => controllers.cart.deleteCoupon( req , res));
router.delete("/c_:cartId/aaPlus", ( req , res) => controllers.cart.deleteAAPlus( req , res));
  
module.exports = router;




/*
Ya estan
    setWarranty
    deleteProductFromCart
Donde se usan, son necesarias
    sendCart

*/
