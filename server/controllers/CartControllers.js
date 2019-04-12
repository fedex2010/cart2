const RestClient = require("../client"),
  logger = require("../utils/logger"),
  sessionService = require("../services/session_service"),
  newrelic = require("newrelic"),
  errorService = require("../services/error_service"),
  config = require('../config/config'),
  Q = require("q");

class CartControllers {
  constructor() { }

  sellerLoginAction(req, res) {
    sessionService.clearSessionCookies(res)

    res.cookie('epi.salesman', req.body.vendedor)
      .status(200)
      .send({ ok: true });
  }

  getNewCart(req, res) {
    let session_id = res.locals.session;
    let sellerId = res.locals.sellerId;
    let brand = res.locals.xBrand.toLowerCase();

    return RestClient.cartClient.newCart(session_id, sellerId, false, null, "WEB", brand)
  }

  getCart(req, res) {
    let cartId = req.params.cartId;
    let session_id = res.locals.session;
    let sellerId = res.locals.sellerId;
    let brand = res.locals.xBrand.toLowerCase();

    let cookieCart = req.cookies['cartId']
    logger.info("[" + cookieCart + "] getCart cookies1:" + cookieCart);
    logger.info("[" + cookieCart + "] getCart cookies2:" + JSON.stringify(req.cookies));
    console.log("tiro newrelic.addCustomAttribute('cookieCartId', cartId);" + cartId);

    newrelic.addCustomAttribute('cookieCartId', cartId);

    this._isEmpresarias(req, res);

    if (cartId != "undefined" || cookieCart != "undefined") {
      cartId = (cartId === "undefined")?cookieCart:cartId;
      logger.info("[" + cartId + "] getCart:" + cartId);
      RestClient.cartClient.getOneCart(cartId, {}, brand, true, true)
        .then(cart => {
          logger.info("[" + cartId + "] getCart return promisse:" + JSON.stringify(cart));
          cart = _replaceImage(cart);
          cart.percentage = calculateWarrantiesPercentage(cart);
          cart = this._getEmpresarias(req, res, cart);

          res.status(200).send(cart);
        })
        .catch(err => {
          logger.error("[" + cartId + "] Fail get cart,err:" + err);
          //relic.noticeError(err)
          res.status(500).send(errorService.checkErrorObject(errror));
        });
    } else {
        logger.info("[" + cartId + "] getCart New:" + cartId);
      RestClient.cartClient.newCart(session_id, sellerId, false, null, "WEB", brand)
        .then(cart => {
          cartId = cart.cart_id;
          logger.info("[" + cartId + "] getCart return newCart promisse:" + JSON.stringify(cart));
          cart = _replaceImage(cart);
          cart.percentage = calculateWarrantiesPercentage(cart);
          cart = this._getEmpresarias(req, res, cart);

          sessionService.setSessionCookie(res, session_id) //Setea la cookie con el nuevo carrito
          sessionService.setCartIdCookie(res, cart.cart_id) //Setea la cookie con el nuevo carrito

          res.status(200).send(cart);
        })
        .catch(err => {
          newrelic.noticeError(err)
          logger.error("[" + cartId + "]Fail create cart: " + JSON.stringify(err) );
          res.status(500).send(errorService.checkErrorObject(errror));
        });
    }
  }

  _isEmpresarias(req, res) {
    if (typeof req.headers["x-subdomain"] != "undefined") {
      if (req.headers["x-subdomain"] == "empresas") {
        res.cookie("empresarias", true);
      } else {
        res.cookie("empresarias", false);
      }
    } else {
      res.cookie("empresarias", false);
    }
  }
  _getEmpresarias(req, res, cart) {
    if (typeof req.headers["x-subdomain"] != "undefined") {
      if (req.headers["x-subdomain"] == "empresas") {
        cart.subtotal_without_vat = 0
        cart.products.forEach((i) => {
          cart.subtotal_without_vat += (i.price * i.quantity) - (i.price_without_vat * i.quantity)
          let priceAux = i.subtotal_price;
          i.subtotal_price = i.subtotal_base_price;
          i.subtotal_base_price = priceAux;
          i.price = i.price_without_vat
        })
        let subTotal = cart.subtotal_price
        let total = cart.total_base_price;

        cart.subtotal_price = cart.subtotal_base_price;
        cart.subtotal_base_price = subTotal;
      }
    }
    return cart;
  }


  getCarousel(req, res) {
    let brand = res.locals.xBrand.toLowerCase();
    let products = {};
    if (req.headers["x-subdomain"] == "empresas") {
      return {};
    }


    RestClient.productClient.getProductsCarousel(brand)
      .then(carousel => {
        return RestClient.productClient
          .getProducts(brand, carousel.products)
          .then(product => {
            products.id = carousel.id;
            products.title = carousel.title;

            product = product.filter(prod => prod.enabled_for_sale)

            product.map(prod => {
              prod.main_image.url = getProductImageCloudfrontV2(prod.main_image.url,0);
              prod.price = Math.ceil(prod.price)
            });
            products.products = product;
            res.status(200).send(products);
          })
          .catch(err => {
            logger.error("Fail get carousel product: " + err);
            res.status(500).send(errorService.checkErrorObject(err));
          });
      })
      .catch(err => {
        logger.error("Fail get carousel: " + err);
        res.status(500).send(errorService.checkErrorObject(err));
      });
  }

  _getOneCart(cartId, req, res) {
    //TODO Pasar lógica a core para evaluar si devuelve un carro nuevo o utiliza uno anterior en baase al sesisonId
    let brand = res.locals.xBrand.toLowerCase();

    if (cartId != null) {
      console.log("ACTUALIZANDO CART");
        logger.info("[" + cartId + "] _getOneCart:");
      return RestClient.cartClient.getOneCart(cartId, {}, brand, true, false)
        .then(cart => {
          logger.info("[" + cartId + "] _getOneCart return :"+JSON.stringify(cart));
          cart = _replaceImage(cart);
          cart.percentage = calculateWarrantiesPercentage(cart);
          cart = this._getEmpresarias(req, res, cart);

          return cart;
        })
        .catch(err => err);
    } else {
      console.log("CREANDO CART");

      return this.getNewCart(req, res)
        .then(cart => {
           logger.info("[" + cartId + "] _getOneCart getNewCart return :"+JSON.stringify(cart));
          cart = _replaceImage(cart);
          cart.percentage = calculateWarrantiesPercentage(cart);
          cart = this._getEmpresarias(req, res, cart);
          return cart
        })
        .catch(err => err);
    }
  }

  waitProcessingCart(cart, req, res) {

    return this._getOneCart(cart.cart_id, req, res)
      .then(cart => {
        return cart.status != 'PROCESSING' ? cart : Q.delay(50).then(_ => waitProcessingCart(cart, req, res))
      })
      .catch(err => err);
  }


  addProduct(req, res) {
    let epi_context;
    let gb_anonymous_session_id;
    let gb_session_id;

    if (typeof req.cookies['epi.context'] != "undefined") {
      epi_context = req.cookies['epi.context'];
    }

    if (typeof req.cookies['gb_anonymous_session_id'] != "undefined") {
      gb_anonymous_session_id = req.cookies['gb_anonymous_session_id'];
    }

    if (typeof req.cookies['gb_session_id'] != "undefined") {
      gb_session_id = req.cookies['gb_session_id'];
    }

    newrelic.addCustomAttribute("epi_context", epi_context);
    newrelic.addCustomAttribute("gb_anonymous_session_id", gb_anonymous_session_id);
    newrelic.addCustomAttribute("gb_session_id", gb_session_id);

    const body = req.body || {};

    const productIds = body.xid.split(",")
    const promotionId = body.promotion_id || null;
    const warranty_id = body.warranty_id || null;
    const productPrice = body.price || null;
    const brand = res.locals.xBrand.toLowerCase();
    
    let cartId = res.locals.cartId;

    var self = this;

    this._getOneCart(cartId, req, res)
      .then(cart => {
        cartId = cart.cart_id

        if( promotionId != null ){
          // Agrega todos los productos de la promo que faltan 
          return RestClient.promotion.getPromotion(promotionId,brand)
              .then( promotion => {
                
                if (promotion){                    
                  let missing = promotion.xids.filter( promoProductId => !cart.products.find(p => p.product_id == promoProductId))
                  logger.info("["+ cartId+ "] promo xids="+ promotion.xids+ "  missing="+ missing)
            
                  return missing.reduce((ac, promoProductId) =>
                            //AGREGO BRAND YA Q NO SE ESTABA INCLUYENDO EN LA VERSION ORIGINAL 
                            ac.then( _ => self.addProductToCart(cart, promoProductId, null,null,null,promotionId ,cart.session,brand) )
                              .then( _ => self.waitProcessingCart(cart,req,res) ), Q(cart).then(_ => self.waitProcessingCart(cart,req,res)) )

                              .catch(err=> {
                                logger.error ("Error adding Promotion products"+ err)

                                throw(err) 
                              })
                }else{
                  return cart
                }
              })

        }else{
          return cart
        }        
      })

      .then(cart => {
        return productIds.slice(1).reduce((ac, aProductId) =>
          ac.then(_ => self.addProductToCart(cart, aProductId, null, null, null, cart.session, brand))
            .then(_ => self.waitProcessingCart(cart, req, res)), Q(cart)
        )
          .catch(err => {
            logger.error("Error adding associated products\n", JSON.stringify(err))

            throw (err)
          })
      })

      .then( cart => {
        return this.addProductToCart(cart, productIds[0], warranty_id, productPrice, promotionId, cart.session, brand)
          .catch( err => {
            logger.error("Error adding products", JSON.stringify(err))

            throw ( err )
          })
      })
      .then(product => {      
        logger.info("[", cartId, "] Product added", product)
        return this._getOneCart(cartId, req, res)
      })

      .then(cart => self.waitProcessingCart(cart, req, res))

      .then(cart => {
        //seteo cookie porque puede ser que se este agregando un producto desde ficha y el carrito no haya 
        //sido creado aún
        sessionService.setCartIdCookie(res, cart.cart_id)

        if (req.headers['referer'] && !req.headers['referer'].endsWith("/carrito") && !req.headers['referer'].endsWith("/carrito/")) {
          res.redirect(302, req.get('origin') + '/carrito')
        } else {
          res.status(200).send(cart)
        }
      })
      .catch(err => {
        newrelic.noticeError(err)
        logger.error("[" + cartId + "] Fail get to cart: " + err);

        let { errorUrl } = req.body

        if (errorUrl) {
          res.redirect(errorUrl)
        } else {
          res.status(500).send(errorService.checkErrorObject(err));
        }

      })
  }

  addProductToCart(cart, productId, warranty_id, productPrice, promotionId, session_id, brand) {

    const cartId = cart.cart_id
    logger.info("[cartId=" + cartId + "] Adding product" + productId)

    let productCount, product;

    cart.products.forEach(aProduct => {
      if (productId == aProduct.product_id) {
        productCount = aProduct.quantity
        product = aProduct
      }
    })

    if (product) {
      productCount++
      logger.info("Actualizando cantidad producto " + productId + "en [cartId=" + cartId + "]")
      return RestClient.productClient.getProductUpdater(cartId, product, brand)
        .withWarranty(warranty_id)
        .withPromotion(promotionId)
        .withQuantity(productCount)
        .execute()
    } else {
      logger.info("Agregando producto " + productId + "en [cartId=" + cartId + "]")

      return RestClient.productClient.addProduct(cartId, productId, 1, warranty_id, productPrice, promotionId, session_id, brand)
    }
  }


  newCart(req, res) {

    const productId = req.params.productId
    const cupon = req.params.cupon
    const brand = res.locals.xBrand.toLowerCase();
    const session_id = res.locals.session;
    let cartId;

    this._getOneCart(null, req, res)
      .then(cart => {

        if (productId != "UNDEFINED") {

          return RestClient.productClient.addProduct(cart.cart_id, productId, 1, null, null, null, res.locals.session, brand)
                    .then(product => {
                      return this.waitProcessingCart(cart, req, res)
                    })
                    .catch(err => {
                      logger.error("error adding product " + productId)
                      throw err
                    })
        } else {
          return cart
        }
      })
      .then(cart => {

        if (cupon != "UNDEFINED") {

          return RestClient.promotion.addCoupon(cart.cart_id, cupon, brand)
            .then(cupon => {
              return this.waitProcessingCart(cart, req, res)
            })
            .catch(err => {
              logger.error(JSON.stringify(err))

              logger.error("error adding cupon " + cupon)

              throw err
            })

        } else {
          return cart
        }

      })
      .then(cart => {
        sessionService.setSessionCookie(res, session_id)
        sessionService.setCartIdCookie(res, cart.cart_id)

        res.send( cart )
      })
      .catch(err => {
        logger.error("Fail get to cart with id: " + cart.cart_id);
        res.status(500).send(errorService.checkErrorObject(err));
      })
  }


  editProduct(req, res) {
    let body = req.body || {};
    const cartId = req.params.cartId,
      brand = res.locals.xBrand.toLowerCase(),
      productId = body.xid,
      quantity = body.quantity;

    RestClient.productClient
      .updateProduct(cartId, productId, quantity, brand)
      .then(product => {
        this._getOneCart(cartId, req, res)
          .then(cart => {
            res.status(200).send(cart);
          })
          .catch(err => {
            newrelic.noticeError(err)
            logger.error("[" + cartId + "] Fail get a update cart: " + err);
            res.status(500).send(errorService.checkErrorObject(err));
          });
      })
      .catch(err => {
        newrelic.noticeError(err)
        logger.error("[" + cartId + "] Fail add product to cart: " + err);
        res.status(500).send(errorService.checkErrorObject(err));
      });
  }

  deleteProduct(req, res) {
    let productId = req.params.productId,
      cartId = res.locals.cartId,
      brand = res.locals.xBrand.toLowerCase();

    RestClient.productClient
      .deleteProduct(cartId, productId, brand)
      .then(() => {
        this._getOneCart(cartId, req, res)
          .then(cart => {
            
            res.status(200).send(cart);
          })
          .catch(err => {
            newrelic.noticeError(err)
            logger.error("[" + cartId + "] Fail get cart coupon ,err:" + err);
            res.status(500).send(errorService.checkErrorObject(err));
          });
      })
      .catch(err => {
        newrelic.noticeError(err)
        logger.error("[" + cartId + "] Fail to delete product ,err:" + err);
        res.status(500).send(errorService.checkErrorObject(err));
      });
  }

  setCoupon(req, res) {
    let cartId = req.params.cartId,
      couponCode = req.body.coupon_code,
      brand = res.locals.xBrand.toLowerCase();

    RestClient.promotion
      .addCoupon(cartId, couponCode, brand)
      .then(coupon => {
        this._getOneCart(cartId, req, res)
          .then(cart => {
            res.status(200).send(cart);
          })
          .catch(err => {
            logger.error("[" + cartId + "] Fail get cart coupon ,err:" + err);
            res.status(500).send(errorService.checkErrorObject(err));
          });
      })
      .catch(err => {
        newrelic.noticeError(err)
        logger.error( "[" + cartId + "] Error add coupon: " + couponCode + ",err:" + err);

        let { cause } = err
        if( typeof cause.code === "undefined" && cause.status == "INVALID"){
          err.code = "405"
        }

        res.status(500).send(errorService.checkErrorObject(err));
      });
  }

  deleteCoupon(req, res) {
    let cartId = req.params.cartId,
      couponCode = req.params.couponCode,
      brand = res.locals.xBrand.toLowerCase();
    RestClient.promotion
      .deleteCoupon(cartId, couponCode, brand)
      .then(() => {
        this._getOneCart(cartId, req, res)
          .then(cart => {
            

            res.status(200).send(cart);
          })
          .catch(err => {
            logger.error(
              "[" + cartId + "] Fail get cart coupon delete ,err:" + err
            );
            res.status(500).send(errorService.checkErrorObject(err));
          });
      })
      .catch(err => {
        logger.error(
          "[" +
          cartId +
          "] Error deleting coupon: " +
          couponCode +
          ",err:" +
          err
        );
        err.message = "Fail delete coupon to cart"
        res.status(500).send(errorService.checkErrorObject(err));
      });
  }

  setAAPlus(req, res) {
    let cartId = req.params.cartId,
      code = req.body.code,
      brand = res.locals.xBrand.toLowerCase();

    console.log("code:" + code);
    console.log("cartId:" + cartId);

    RestClient.promotion
      .setLoyaltyCode(cartId, "AEROLINEAS_PLUS", code, brand)
      .then(() => {
        this._getOneCart(cartId, req, res)
          .then(cart => {
            res.status(200).send(cart);
          })
          .catch(err => {
            logger.error("[" + cartId + "] Fail get cart coupon ,err:" + err);
            res.status(500).send(errorService.checkErrorObject(err));
          });
      })
      .catch(err => {
        logger.error(
          "[" + cartId + "] Error add AEROLINEAS_PLUS: " + code + ",err:" + err
        );
        res.status(500).send(errorService.checkErrorObject(err));
      });
  }

  deleteAAPlus(req, res) {
    let cartId = req.params.cartId,
      brand = res.locals.xBrand.toLowerCase();

    RestClient.promotion
      .deleteLoyaltyCode(cartId, "AEROLINEAS_PLUS", brand)
      .then(loyalty => {
        this._getOneCart(cartId, req, res)
          .then(cart => {

            res.status(200).send(cart);
          })
          .catch(err => {
            logger.error("[" + cartId + "] Fail get cart coupon ,err:" + err);
            res.status(500).send(errorService.checkErrorObject(err));
          });
      })
      .catch(err => {
        logger.error(
          "[" + cartId + "] Error add AEROLINEAS_PLUS: " + code + ",err:" + err
        );
        res.status(500).send(errorService.checkErrorObject(err));
      });
  }

  summary(req, res) {
    let cartId = res.locals.cartId,
      brand = res.locals.xBrand.toLowerCase();

    RestClient.cartClient
      .getOneCart(cartId, {}, brand)
      .then(cart => {
        res.json({ products_count: cart.products.length });
      })
      .catch(err => {
        logger.error(
          "[" + cartId + "] Fail get cart: ,err:" + err
        );
        res.status(500).send(errorService.checkErrorObject(err));
      });
  }

  warrantyMobile(req, res) {
    res.status(200).send("ok");
  }

  setWarranty(req, res) {
    let cartId = req.body.cartId,
      productId = req.body.product_id,
      warrantyId = req.body.warranty_id,
      brand = res.locals.xBrand.toLowerCase();
    RestClient.productClient
      .setWarranty(cartId, productId, warrantyId, brand)
      .then(product => {
        this._getOneCart(cartId, req, res)
          .then(cart => {
            res.status(200).send(cart);
          })
          .catch(err => {
            logger.error("[" + cartId + "] Fail get cart   warranty to cart,err:" + err);
            err.message = "Fail get a update cart warranty"
            res.status(500).send(errorService.checkErrorObject(err));
          });
      })
      .catch(err => {
        logger.error("[" + cartId + "] Fail set warranty to cart,err:" + err);

        err.message = "Fail set warranty to cart"
        res.status(500).send(errorService.checkErrorObject(err));
      });
  }

  fake_product(req, res) {
    let cartId = res.locals.cartId;
    if (cartId) {
      console.log("----if----" + cartId);
    } else {
      console.log("----else----" + cartId);
    }
  }
}

function _replaceImage(cart) {
  let cartId = cart.cart_id;
  cart.products.map(product => {
      logger.info("[" + cartId + "] img replace:" + product.main_image);
    if (typeof product.main_image !== "undefined") {
        logger.info("[" + cartId + "] Entre por el if la imagen no es undefined");
        product.main_image.url = getProductImageCloudfrontV2(product.main_image.url,cartId );
    } else {
      logger.info("[" + cartId + "] Entre por el else la imagen es undefined");
      product.main_image = {};
      product.main_image.url = "";
    }
  });
  return cart;
}

function getProductImageCloudfrontV2(url,cartId=0) {
    logger.info("[" + cartId + "] Img product" + url);
  if (url.indexOf("noImage") == -1) {
    var product_image_sha = url.split("/");
    product_image_sha = product_image_sha[product_image_sha.length - 1];
    var cloudfront_v2 = "//d34zlyc2cp9zm7.cloudfront.net/";
    var cloudfront_products = "products/";
    var extension = ".webp";
    var tamano = "_200";
    url =
      cloudfront_v2 +
      cloudfront_products +
      product_image_sha +
      extension +
      tamano;
  }

    logger.info("[" + cartId + "] Img product2" + url);
  return url;
}

function calculateWarrantiesPercentage(cart) {
  let porcentajeInteres;
  cart.payment_options.map(function (payment_option) {    
    if (payment_option.card.name == "Visa") {

      if ( 
        typeof payment_option.payment_methods != "undefined" && 
        payment_option.payment_methods != null
        ) {
        payment_option.payment_methods.map(function (payment_method) {
          payment_method.payment_method_data.map(function (data) {
            if (
              porcentajeInteres == undefined &&
              data.installment_price.installments == 12
            ) {
              porcentajeInteres =
                (parseFloat(data.installment_price.surcharge) * 100) /
                parseFloat(data.installment_price.base_price);
            }
          });
        });
      }

    }

  });

  return porcentajeInteres;
}


module.exports = CartControllers;
