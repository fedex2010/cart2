const RestConnector = require('./rest_connector');
var config  = require('../config/config'),
    logger  = require('../utils/logger');


const CHECKOUT_CORE_URL = config.services.checkout_core.base_url;
const NEW_CART_TIMEOUT = config.services.new_cart_timeout || 2000;

class RestClient {
    constructor() {
        this._restConnector = new RestConnector();
    }

    //getOneCart(cartId,brand,include=true,refresh=false) {
    getOneCart( params ) {
        let {cartId,brand,options = undefined,include = true, refresh = false} = params

        let url = `${CHECKOUT_CORE_URL}/carts/` + cartId ;

        url=url+"?refresh=true&include=cartdata";

        if(options === undefined){
            options = {}
        }

        options.headers = {"Content-Type": "application/json", "X-Brand": brand};
        return this._restConnector.get(url,options);
    }

//    newCart(session_id, sellerId, ipClient=false, xBrand=null, channel='WEB',brand) {
    newCart(params) {
        let {session_id,sellerId,brand,xSessionContext,channel,ipClient} = params

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

        if(xSessionContext !== ""){
            options.headers = {"Content-Type": "application/json", 
                               "X-Brand": brand, 
                               "x-session-context" : xSessionContext };
        }

        return this._restConnector.postWithoutErrors(url, options);
    }

    updateProductObj(cartId, productId, obj,xBrand){
        let url = CHECKOUT_CORE_URL + "/carts/" + cartId + "/products/" + productId,
            options = {
                headers : {'Content-Type':'application/json','X-Brand':xBrand},
                data : JSON.stringify(obj)
            }
    
        return this._restConnector.putWithOptions(url, options);
    }
}

module.exports = RestClient;