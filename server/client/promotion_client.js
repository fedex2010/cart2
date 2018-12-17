const RestConnector = require('./rest_connector');
let config  = require('../config/config'),
    logger  = require('../utils/logger');

const CHECKOUT_CORE_URL = config.services.checkout_core.base_url;


class PromotionClient{

    constructor() {
        this._restConnector = new RestConnector();
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
        let options = {
            headers: {
                'X-Brand':brand
            }
        }

        return this._restConnector.putWithOptions( `${CHECKOUT_CORE_URL}/carts/${cartId}/loyalties/${loyaltyId}`, {
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({'code': code})
        })
    }
}

module.exports =  PromotionClient;