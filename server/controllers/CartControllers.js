const   RestClient = require("../client"),
        logger     = require("../utils/logger");

class CartControllers {
    constructor() {
    }

    getNewCart(req, res){

        let session_id = res.locals.session;
        let sellerId = "";
        let brand = res.locals.xBrand.toLowerCase()

        return RestClient.cartClient.newCart(session_id, sellerId, false, null, 'WEB',brand)
             .then((cart)=>{
                 return cart;
             })
             .catch((err) => {
                 res.status(500).send('Fail create cart');
             })
    }

    getCart(req, res){
        console.log("getcart")
        let cartId = req.params.cartId;
        let brand = res.locals.xBrand.toLowerCase();

        RestClient.cartClient.getOneCart(cartId,{},brand)
            .then((cart) => {
                res.send(cart);
            })
            .catch((err) => {
                res.status(500).send('Fail get cart');
            })
    }

    getCarousel(req, res){
        console.log("carousel")
        let brand = res.locals.xBrand.toLowerCase();

        RestClient.productClient.getProductsCarousel(brand)
            .then((carousel) => {
                console.log(carousel);
                res.send(carousel);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('Fail get carousel');
            })
    }

    _getOneCart(cartId, req, res){
        //TODO Pasar lógica a core para evaluar si devuelve un carro nuevo o utiliza uno anterior en baase al sesisonId
        let brand = res.locals.xBrand.toLowerCase();

        if(cartId != null){
            return RestClient.cartClient.getOneCart(cartId,{},brand)
            .then((cart) => {
                return (cart);
            })
            .catch((err) => {
                res.status(500).send('Fail get one cart');
            })
        }else{
            return this.getNewCart(req, res)
                .then((cart)=>{
                    return cart;
                })
                .catch((err) => {
                    res.status(500).send('Fail get a new cart');
                })
        }
    }

    addProduct(req, res){
        const body = req.body || {};
        const productId = body.xid;
        const promotionId = body.promotion_id;
        const warranty_id = body.warranty_id;
        const productPrice = body.price;
        const cartId = req.cookies['cartId'];
        const brand = res.locals.xBrand.toLowerCase()

        this._getOneCart(cartId, req, res)
            .then((cart)=>{
                RestClient.productClient.addProduct(cart.cart_id,productId,1,warranty_id,productPrice,"","",brand)
                    .then(()=>{
                        res.send(cart);
                    }).catch((err) => {
                        console.log(err);
                        res.status(500).send('Fail update product to cart');
                    })
            }).catch((err) => {
                res.status(500).send('Fail get to cart');
            })
    }

    editProduct(req, res){
        let body = req.body || {};
        const   cartId = req.params.cartId,
                brand = res.locals.xBrand.toLowerCase(),
                productId = body.xid,
                quantity = body.quantity;

        RestClient.productClient.updateProduct(cartId,productId,quantity,brand)
            .then((cart)=>{
                res.send(cart);
            }).catch((err) => {
                console.log(err);
                res.status(500).send('Fail add product to cart');
            })

    }

    deleteProduct(req , res){
        let productId = req.params.prodcutId,
            cartId = res.locals.cartId,
            brand = res.locals.xBrand.toLowerCase();

            RestClient.productClient.deleteProduct(cartId,productId,brand)
            .then((cart)=>{
                res.status(200).send('ok');
            }).catch((e)=>{
                res.status(500).send('Something broke!');
            })

    }

    setCoupon(req, res){
        let cartId    = req.params.cartId,
            couponCode  = req.body.coupon_code,
            brand = res.locals.xBrand.toLowerCase();

        console.log(cartId);
        console.log(couponCode);
        RestClient.promotion.addCoupon(cartId,couponCode,brand)
            .then((coupon)=>{
                res.send(coupon);
            }).catch((err) => {
            logger.error("["+ cartId+ "] Error add coupon: "+ couponCode+ ",err:"+err)
            res.status(500).send('Fail add coupon to cart');
        })

    }

    deleteCoupon(req, res){
        let cartId    = req.params.cartId,
            couponCode  = req.params.couponCode,
            brand = res.locals.xBrand.toLowerCase();

        RestClient.promotion.deleteCoupon(cartId,couponCode,brand)
            .then((coupon)=>{
                res.send(coupon);
            }).catch((err) => {
            logger.error("[" + cartId + "] Error deleting coupon: "+ couponCode+ ",err:"+err)
            res.status(500).send('Fail delete coupon to cart');
        })
    }
}

module.exports = CartControllers;