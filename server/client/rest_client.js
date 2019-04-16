const RestConnector = require('./rest_connector');
var config  = require('../config/config'),
    logger  = require('../utils/logger');


const CHECKOUT_CORE_URL = config.services.checkout_core.base_url;
const NEW_CART_TIMEOUT = config.services.new_cart_timeout || 2000;

class RestClient {
    constructor() {
        this._restConnector = new RestConnector();
    }

    getOneCart( params ) {
        let {cartId,brand,options = undefined,include = true, refresh = false,xSessionContext} = params

        let url = `${CHECKOUT_CORE_URL}/carts/` + cartId ;

        url=url+"?refresh=true&include=cartdata";

        if(options === undefined){
            options = {}
        }

        let headers = {"Content-Type": "application/json", "X-Brand": brand}

        if(xSessionContext !== ""){
            headers = {...headers, "x-session-context" : xSessionContext  }
        }

        options.headers = headers;
        return this._restConnector.get(url,options);
    }

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


          /*
      this.data = {
          product_id: this.productId,
          :null,
          price:null,
          _promotionId:null
      }

      this.data._promotionId = _promotionId
    
      */
        /*.getProductUpdater(cartId, product, brand)
          .withWarranty(warranty_id)
          .withPromotion(promotionId)
          .withQuantity(productCount)
          .execute()*/


    updateProductObj( params ){
        let {cartId, productId,brand,warranty_id,quantity,promotionId,productPrice} = params

        let data = {
            warranty_id : warranty_id,
            quantity:quantity,
            _promotionId:promotionId,
            product_id:productId,
            price:productPrice
        }
        
        let url = CHECKOUT_CORE_URL + "/carts/" + cartId + "/products/" + productId,
            options = {
                headers : {'Content-Type':'application/json','X-Brand':brand},
                data : JSON.stringify(data)
            }
    
        return this._restConnector.putWithOptions(url, options);
    }
}

module.exports = RestClient;