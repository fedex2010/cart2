const RestConnector = require('./rest_connector');
const Rest_client = require('./rest_client');
let config  = require('../config/config'),
    logger  = require('../utils/logger'),
    Q = require("q");

const CHECKOUT_CORE_URL = config.services.checkout_core.base_url;
const NEW_CART_TIMEOUT = config.services.new_cart_timeout || 2000;
const SEARCHLIST = config.searchList.url;


class ProductClient{
    
    constructor() {
        this._restConnector = new RestConnector();
    }

    getProducts(xBrand, ...products) {
        let options={};
        options = {
            headers : {'X-Brand':xBrand}
        }
        var url = CHECKOUT_CORE_URL + "/products?ids=" + products.sort().join(",") + "&include=warranties,specifications";
        return this._restConnector.get(url, options);
    }

    
    //addProduct(cartId, productId, quantity=1, warrantyId=null, productPrice=null, promotionId=null, session_id=null,brand){
    addProduct( params ){
        
        let { cartId, productId, quantity=1, warrantyId=null, productPrice=null, promotionId=null, sessionId=null,brand,xSessionContext } = params
        
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

        let headers = {
            'Content-Type': 'application/json',
            'x-session-id': sessionId,
            'X-Brand':brand
        } 

        if( xSessionContext != "" ){
            headers = { ...headers, "x-session-context": xSessionContext }
        }

        let options = {
            headers: headers,
            data: JSON.stringify(data)
        }

        return this._restConnector.post( url, options)
    }

    deleteProduct(cartId, productId,brand,xSessionContext){

        console.log(brand);

        let url     = CHECKOUT_CORE_URL + "/carts/" + cartId + "/products/" + productId;

        let headers = {
            'X-Brand':brand
        }

        if( xSessionContext != "" ){
            headers = { ...headers, "x-session-context": xSessionContext }
        }

        let options = {
            headers: headers
        }

        return this._restConnector.delete(url,options)
    }

    updateProduct(cartId, productId, quantity,brand,xSessionContext) {
        let data = {
            product_id : productId,
            quantity : quantity
        }

        let headers = {'Content-Type':'application/json'}

        if(xSessionContext != ""){
            headers = { ...headers, "x-session-context": xSessionContext }
        }

        let url = CHECKOUT_CORE_URL + "/carts/" + cartId + "/products/" + productId,
            options = {
                headers : headers,
                'X-Brand':brand,
                data : JSON.stringify(data)
            }

        return this._restConnector.putWithOptions(url, options);
    };

    getProductsCarousel(brand) {

        let listName = config.searchList.list_name[brand];
        //let options = httpClient.getDefaultOptions(xBrand, config.services.searchList.timeout);
        let options={};
        options = {
            headers : {'X-Brand':brand}
        }
        let url = `${SEARCHLIST}/${listName}`;

        return this._restConnector.getWithOptions(url, options);
    }

    setWarranty(cartId, productId, warrantyId, brand) {
        var url = CHECKOUT_CORE_URL + "/carts/" + cartId + "/products/" + productId,
            data = {
                warranty_id: warrantyId
            },
            options = {
                headers : {'Content-Type':'application/json','X-Brand':brand},
                data : JSON.stringify(data)
            };
        return this._restConnector.putWithOptions(url, options);
    }
}

module.exports = ProductClient;