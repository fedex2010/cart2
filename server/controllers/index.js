const   CartControllers     = require('./CartControllers');
const   NormandiaController = require('./NormandiaController');

module.exports = { cart: new CartControllers() ,normandia : new NormandiaController}