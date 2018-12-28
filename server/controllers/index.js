const   IndexNormandia = require('./IndexController');
const   CartControllers     = require('./CartControllers');
const   NormandiaController = require('./NormandiaController');

module.exports = {index : new IndexNormandia, cart : new CartControllers() ,normandia : new NormandiaController}