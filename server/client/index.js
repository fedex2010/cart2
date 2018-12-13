"use strict";

const 	CartClient 					= require('./rest_client');
const 	ProductClient 					= require('./product_client');

module.exports = {
    cartClient: new CartClient(),
    productClient :new ProductClient()
}