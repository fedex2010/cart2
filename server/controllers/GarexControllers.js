const crypto = require("crypto"),
      logger = require('../utils/logger'),
      RestClient = require("../client"),
      sessionService = require("../services/session_service"),
      newrelic = require("newrelic"),
      errorService = require("../services/error_service"),
      Q = require("q");

let key = "ULRGF6dpniNEMlq5dRUN6b7cYPZC5a3U";

class GarexControllers{
  constructor() {}

  garex(req,res,next){
    if(!req.query.data){
      logger.error("GAREX Query data missing")
      return res.redirect('/compra/error');
    }
    
    let garexData = JSON.parse( this.decrypt64(req.query.data) );
    logger.info("garexData",garexData);

    garexData.cart = {
        session: res.locals.session,
        brand: res.locals.xBrand.toUpperCase(),
        sale_source: "WEB",
        ip : res.locals.ipClient,
        xSessionContext : res.locals.xSessionContext
    };

    RestClient.cartClient.newCartFromGarex( garexData )
        .then(cart =>  this.waitProcessingCart(cart.cart_id,res))
        .then( cart => {
             
            sessionService.setCartIdCookie(res,cart.cart_id)
            
            if ( typeof cart !== 'undefined' && cart ){
                return res.redirect('/compra/financiacion');
            } else {
                logger.error("Error creating Garex Cart", garexData);
            }

        })
        .catch(function (err) {
            logger.error("GAREX unhandled error: ", err);
            return res.redirect('/carrito/error');
        });

  }

  waitProcessingCart(cartId,res) {
    let params = {
      ipClient: res.locals.ipClient,
      sessionId: res.locals.session,
      sellerId: res.locals.sellerId,
      brand: res.locals.xBrand.toLowerCase(),
      xSessionContext: res.locals.xSessionContext,
      channel: "WEB",
      cartId : cartId
    };

    return RestClient.cartClient.getOneCart(params)
      .then(cart => {
        return cart.status != "PROCESSING"
          ? cart
          : Q.delay(50).then(_ => waitProcessingCart(cartId,res));
      })
      .catch(err => {
        throw err;
      });
  }

  encrypt(key, data) {
      var cipher = crypto.createCipher('aes-256-cbc', key);
      var crypted = cipher.update(data, 'utf-8', 'hex');
      crypted += cipher.final('hex');

      return crypted;
  }

  decrypt(key, data) {
      var decipher = crypto.createDecipher('aes-256-cbc', key);
      var decrypted = decipher.update(data, 'hex', 'utf-8');
      decrypted += decipher.final('utf-8');

      return decrypted;
  }

  decrypt64(data) {
      return Buffer.from(data, 'base64').toString('ascii')
  }

  encode(req, res, next){
    var encryptedText = this.encrypt(key, req.query.data);
    res.status(200).send(encryptedText)
  };

}

module.exports = GarexControllers;
 
/**
 * 
 * setWarranty se llama cuando agregas garantina a un producto
 * 
 * 
 * 
 */