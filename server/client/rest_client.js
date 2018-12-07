const RestConnector = require('./rest_connector');
var config  = require('../config/config');


const CHECKOUT_CORE_URL = config.services.checkout_core.base_url;
const NEW_CART_TIMEOUT = config.services.new_cart_timeout || 2000;

class RestClient {
    constructor() {
        this._restConnector = new RestConnector();
    }
    getOneCart(cartId) {
        var url = "http://api-ci.garbarino.com/carts/"+cartId;
        return this._restConnector.get(url);
    }

    newCart(session_id, sellerId, ipClient=false, xBrand=null, channel='WEB') {

        logger.info("[", session_id, "] Requesting cart");

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

        return httpClient.postWithoutErrors(url, options);
    };
}

module.exports = RestClient;