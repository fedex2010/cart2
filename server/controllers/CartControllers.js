const RestClient = require("../client");

class CartControllers {
    constructor() {

    }

    getCart(req, res){
        console.log(req.query)
        let cartId=req.params.cartId;
        RestClient.cartClient.get(cartId)
            .then((cart) => {
                res.send(cart);
            })
            .catch((err) => {
                    log.error("Error getting home. " + err);
                next(err);
            })
    }


}

module.exports = CartControllers;