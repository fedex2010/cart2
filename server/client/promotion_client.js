const RestConnector = require('./rest_connector');
let config  = require('../config/config'),
    logger  = require('../utils/logger');

const CHECKOUT_CORE_URL = config.services.checkout_core.base_url;


class PromotionClient{

    constructor() {
        this._restConnector = new RestConnector();
    }
    
    //NUEVO
    getPromotion(promotionId, xBrand) {
        let url     = `${CHECKOUT_CORE_URL}/cross_selling/product/${promotionId}`,
            options = {};

        options.headers = {
                            "Content-Type": "application/json", 
                            "x-brand": xBrand
                        };
        options.timeout = 2000

        logger.info('Calling: ', url, ", options: ", JSON.stringify(options) )
    
        return this._restConnector.getWithOptions(url,options)
    }

    addCoupon(cartId, coupon, brand) {
        let url     = `${CHECKOUT_CORE_URL}/carts/${cartId}/coupons`,
            body    = {coupon_id: coupon}

        return this._restConnector.post( url, {
            headers: {'Content-Type': 'application/json','X-Brand':brand},
            data: JSON.stringify (body)
        })
    }

    deleteCoupon(cartId, coupon,brand) {
        let url     = `${CHECKOUT_CORE_URL}/carts/${cartId}/coupons/${coupon}`
        let options = {
            headers: {
                'X-Brand':brand
            }
        }
        return this._restConnector.delete( url,options )
    }

    setLoyaltyCode(cartId, loyaltyId, code, brand) {
        let data = JSON.stringify({'code': code});
        let options = {
            headers : {'Content-Type':'application/json','X-Brand':brand},
            data: data
        };

        return this._restConnector.putWithOptions( `${CHECKOUT_CORE_URL}/carts/${cartId}/loyalties/${loyaltyId}`, options)
    }

    deleteLoyaltyCode(cartId, loyaltyId, brand) {
        let options = {
            headers : {'Content-Type':'application/json','X-Brand':brand}
        };

        return this._restConnector.delete( `${CHECKOUT_CORE_URL}/carts/${cartId}/loyalties/${loyaltyId}`, options)
    }
}

module.exports =  PromotionClient;