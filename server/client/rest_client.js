const RestConnector = require('./rest_connector');
var config  = require('../config/config'),
    logger  = require('../utils/logger');


const CHECKOUT_CORE_URL = config.services.checkout_core.base_url;
const NEW_CART_TIMEOUT = config.services.new_cart_timeout || 2000;

class RestClient {
    constructor() {
        this._restConnector = new RestConnector();
    }
    getOneCart(cartId) {
        let url = `${CHECKOUT_CORE_URL}/carts/` + cartId ;
        return this._restConnector.get(url);
    }

    newCart(session_id, sellerId, ipClient=false, xBrand=null, channel='WEB') {

        logger.info("[" + session_id + "] Requesting cart");

        let url = `${CHECKOUT_CORE_URL}/carts/`
        let cartData = {session_id: session_id, sale_source: channel};
        if (sellerId){
            cartData.seller_id = sellerId
        }
        if(ipClient){
            cartData.ip = ipClient;
        }
        let options = {
            data: JSON.stringify(cartData),
            timeout: NEW_CART_TIMEOUT
        };
        if(xBrand === "compumundo")
            options.headers = {"Content-Type": "application/json", "X-Brand": "compumundo"};
        else
            options.headers = {"Content-Type": "application/json", "X-Brand": "garbarino"};

        logger.info(url)
        logger.info(options)

        return this._restConnector.postWithoutErrors(url, options);
    }

    addProduct(cartId, productId, quantity=1, warrantyId=undefined, productPrice=null, promotionId=undefined, session_id=null){
        let url = `${CHECKOUT_CORE_URL}/carts/${cartId}/products`,
            data = {
                product_id: productId,
                quantity: quantity,
                warranty_id: warrantyId,
                price: productPrice
            }

        if (promotionId) {
            data.promotion = {id: promotionId}
        }
        let options = {
            headers: {
                'Content-Type': 'application/json',
                'x-session-id': session_id
            },
            data: JSON.stringify(data)
        }
        return this._restConnector.post( url, options)
    }

    deleteProduct(cartId, productId){

        var url = CHECKOUT_CORE_URL + "/carts/" + cartId + "/products/" + productId;

        return this._restConnector.delete(url)
    }
}

module.exports = RestClient;