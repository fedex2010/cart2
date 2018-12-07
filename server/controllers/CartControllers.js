const   RestClient = require("../client"),
        logger     = require("../utils/logger");

class CartControllers {
    constructor() {

    }


    getOneCart(req, res){
        console.log(req.query)
        let cartId=req.params.cartId;
        RestClient.cartClient.getOneCart(cartId)
            .then((cart) => {
                res.send(cart);
            })
            .catch((err) => {
                    log.error("Error getting home. " + err);
                next(err);
            })
    }

    addProduct(req, res){
        const body = req.body || {};
        const productIds = [].concat.apply([], [body.xid.split(",")])
        const promotionId = body.promotion_id || undefined
        const warranty_id = body.warranty_id || undefined
        const productPrice = body.price || undefined

        let productService = null
        let cartId = null
        let session_id = req.cookies['gb_session_id'];

        res.send(body);
    }
}

module.exports = CartControllers;