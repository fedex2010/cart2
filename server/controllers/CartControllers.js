const   RestClient = require("../client"),
        logger     = require("../utils/logger");

class CartControllers {
    constructor() {

    }

    getNewCart(req, res){

        let session_id = res.locals.session;
        let sellerId = "";

        RestClient.cartClient.newCart(session_id, sellerId, false, null, 'WEB')
            .then((cart)=>{
                return cart;
            })
            .catch((err) => {
                log.error("Error getting home. " + err);
                next(err);
            })
    }

    getCart(req, res){
        let cartId=req.params.cartId;
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
            RestClient.cartClient.getOneCart(cartId)
            .then((cart) => {
                return (cart);
            })
            .catch((err) => {
                log.error("Error getting home. " + err);
                next(err);
            })
        }else{
            console.log("hago un create")
            this.getNewCart(req, res)
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
        const productIds = [].concat.apply([], [body.xid.split(",")])
        const promotionId = body.promotion_id || undefined
        const warranty_id = body.warranty_id || undefined
        const productPrice = body.price || undefined

        let productService = null
        let cartId = req.cookies['cartId'] || null
        let session_id = req.cookies['gb_session_id'];

        console.log("addProduct")
        console.log("productIds:"+productIds)

        this.getOneCart(cartId,req, res)
            .then((cart)=>{

                //res.send(cart);
            }).catch((err) => {
                log.error("Error getting home. " + err);
                next(err);
            })

        res.send(body);
    }
}

module.exports = CartControllers;