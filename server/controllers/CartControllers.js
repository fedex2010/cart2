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
                 log.error("Error getting home. " + err);
                 next(err);
             })
    }

    getCart(req, res){
        let cartId = req.params.cartId;
        console.log("paso por el getCart")
        RestClient.cartClient.getOneCart(cartId)
            .then((cart) => {
                res.send(cart);
            })
            .catch((err) => {
                log.error("Error getting home. " + err);
                next(err);
            })
    }

    getOneCart(cartId, req, res){
        console.log("getOneCart")
        //TODO Pasar lógica a core para evaluar si devuelve un carro nuevo o utiliza uno anterior en baase al sesisonId
        if(cartId != null){
            console.log("paso por el cartOne")
            return RestClient.cartClient.getOneCart(cartId)
            .then((cart) => {
                return (cart);
            })
            .catch((err) => {
                log.error("Error getting home. " + err);
                next(err);
            })
        }else{
            console.log("hago un create")
            return this.getNewCart(req, res)
                .then((cart)=>{
                    return cart;
                })
                .catch((err) => {
                    log.error("Error getting home. " + err);
                    next(err);
                })
        }
    }

    addProduct(req, res){
        const body = req.body || {};
        const productId = body.xid || undefined
        const promotionId = body.promotion_id || undefined
        const warranty_id = body.warranty_id || undefined
        const productPrice = body.price || undefined

        let cartId = req.cookies['cartId'] || null
        let brand = res.locals.xBrand.toLowerCase()
        console.log("addProduct")
        console.log("productId:"+productId)

        console.log("this", this);

        this.getOneCart(cartId, req, res)
            .then((cart)=>{
                console.log(cart);
                return RestClient.productClient.addProduct(cart.cart_id,productId,1,warranty_id,productPrice,brand)
                    .then(()=>{
                        res.send(cart);
                    }).catch((err) => {
                        log.error("Add Product to cart. " + err);
                        next(err);
                    })
                //res.send(RestClient.productClient.addProduct(cart.cartId,productId,1,warranty_id,productPrice,brand))

            }).catch((err) => {
                log.error("Error getting cart. " + err);
                next(err);
            })

        //res.send(body);
    }
}

module.exports = CartControllers;