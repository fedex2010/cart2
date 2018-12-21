"use strict";

const 	CartClient 		= require('./rest_client'),
     	ProductClient 	= require('./product_client'),
        PromotionClient = require('./promotion_client'),
        NormandiaClient = require('./normandia_client');

module.exports = {
    cartClient      : new CartClient(),
    productClient   :new ProductClient(),
    promotion       :new PromotionClient(),
    normandia       :new NormandiaClient()
}