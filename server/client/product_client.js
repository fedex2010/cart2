const RestConnector = require('./rest_connector');
var config  = require('../config/config'),
    logger  = require('../utils/logger');


const CHECKOUT_CORE_URL = config.services.checkout_core.base_url;
const NEW_CART_TIMEOUT = config.services.new_cart_timeout || 2000;

class ProductClient{
    constructor() {
        this._restConnector = new RestConnector();
    }

    getProducts(xBrand, ...products) {
        let options = httpClient.getDefaultOptions(xBrand, config.services.product_core.timeout);
        var url = PRODUCT_CORE_URL + "/products?ids=" + products.sort().join(",") + "&include=warranties,specifications";
        return this._restConnector.get(url, config.services.product_core.ttl, options);
    }

    addProduct(cartId, productId, quantity=1, warrantyId=undefined, productPrice=null, promotionId=undefined, session_id=null,brand){
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
                'x-session-id': session_id,
                'X-Brand':brand
            },
            data: JSON.stringify(data)
        }

        return this._restConnector.post( url, options)
    }

    deleteProduct(cartId, productId,brand){

        console.log(brand);

        let url     = CHECKOUT_CORE_URL + "/carts/" + cartId + "/products/" + productId;

        let options = {
            headers: {
                'X-Brand':brand
            }
        }

        return this._restConnector.delete(url,options)
    }
}

module.exports = ProductClient;