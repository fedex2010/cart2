const RestConnector = require('./rest_connector');
var config  = require('../config/config');


const CART_CORE_URL = config.services.checkout_core.base_url;

class RestClient {
    constructor() {
        this._restConnector = new RestConnector();
    }
    get(cartId) {
        var url = "http://api-ci.garbarino.com/carts/"+cartId;
        return this._restConnector.get(url);
    }
}

module.exports = RestClient;