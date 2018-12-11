const RestConnector = require('./rest_connector');
var config  = require('../config/config'),
    logger  = require('../utils/logger');


const CHECKOUT_CORE_URL = config.services.checkout_core.base_url;
const NEW_CART_TIMEOUT = config.services.new_cart_timeout || 2000;

class RestClient {
    constructor() {
        this._restConnector = new RestConnector();
    }

    getOneCart(cartId,options={},brand) {
        let url = `${CHECKOUT_CORE_URL}/carts/` + cartId ;
        options.headers = {"Content-Type": "application/json", "X-Brand": brand};
        return this._restConnector.get(url,options);
    }

    newCart(session_id, sellerId, ipClient=false, xBrand=null, channel='WEB',brand) {

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

        options.headers = {"Content-Type": "application/json", "X-Brand": brand};

        logger.info(url)
        logger.info(options)

        return this._restConnector.postWithoutErrors(url, options);
    }
}

module.exports = RestClient;