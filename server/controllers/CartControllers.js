const   RestClient = require("../client"),
        logger = require("../utils/logger"),
        Q = require("q");

class CartControllers {
  constructor() {
  }

  getNewCart(req, res) {
    let session_id = res.locals.session;
    let sellerId = "";
    let brand = res.locals.xBrand.toLowerCase();

    RestClient.cartClient.newCart(session_id, sellerId, false, null, "WEB", brand)
      .then(cart => {
        return cart;
      })
      .catch(err => {
        res.status(500).send("Fail create cart");
      });
  }

  getCart(req, res) {
    let cartId = req.params.cartId;
    let session_id = res.locals.session;
    let sellerId = "";
    let brand = res.locals.xBrand.toLowerCase();

    if(cartId!="undefined"){
        RestClient.cartClient.getOneCart(cartId, {}, brand)
            .then(cart => {
                cart = _replaceImage(cart);
                cart.percentage = calculateWarrantiesPercentage(cart);
                res.send(cart);
            })
            .catch(err => {
                logger.error("[" + cartId + "] Fail get cart,err:" + err);
                res.status(500).send("Fail get cart");
            });
    }else{
        console.log("nuevo1");
        RestClient.cartClient.newCart(session_id, sellerId, false, null, "WEB", brand)
            .then(cart => {
                cart = _replaceImage(cart);
                cart.percentage = calculateWarrantiesPercentage(cart);
                res.cookie("epi.context",session_id);
                res.cookie('cartId',cart.cart_id);
                res.send(cart);
            })
            .catch(err => {
                res.status(500).send("Fail create cart");
            });
    }
  }

  isEmpresarias(req,res) {
    console.log("isEmpresarios", res)
    const cookies = new Cookies();
    
    if(typeof req.headers['x-subdomain']!="undefined"){
        if(req.headers['x-subdomain']=="empresas"){
            res.cookies.set("empresarias", true);
        }else{
          res.cookies.set("empresarias", false);
        }
    }else{
      res.cookies.set("empresarias", false);
    }
  }

  getCarousel(req, res) {
    let brand = res.locals.xBrand.toLowerCase();
    let products={};
    RestClient.productClient.getProductsCarousel(brand)
      .then(carousel => {
        return RestClient.productClient.getProducts(brand, carousel.products)
          .then(product => {
              products.id=carousel.id
              products.title=carousel.title
              product.map((prod)=>{
                  prod.main_image.url = getProductImageCloudfrontV2(prod.main_image.url)
              })
              products.products=product
            res.send(products);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("Fail get carousel product");
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Fail get carousel");
      });
  }

  _getOneCart(cartId, req, res) {
    //TODO Pasar lógica a core para evaluar si devuelve un carro nuevo o utiliza uno anterior en baase al sesisonId
    let brand = res.locals.xBrand.toLowerCase();

    if (cartId != null) {
      return RestClient.cartClient.getOneCart(cartId, {}, brand)
        .then(cart => {
            cart = _replaceImage(cart);
            cart.percentage = calculateWarrantiesPercentage(cart);
            return cart;
        })
        .catch(err => {
          logger.error("[" + cartId + "] Fail get cart _getOneCart ,err:" + err);
          res.status(500).send("Fail get one cart");
        });
    } else {
      return this.getNewCart(req, res)
        .then(cart => {
          return cart;
        })
        .catch(err => {
            logger.error("[" + cartId + "] Fail get cart getNewCart ,err:" + err);
          res.status(500).send("Fail get a new cart");
        });
    }
  }

  addProduct(req, res) {
    const body = req.body || {};
    const productId = body.xid;
    const promotionId = body.promotion_id;
    const warranty_id = body.warranty_id;
    const productPrice = body.price;
    const cartId = res.locals.cartId;
    const brand = res.locals.xBrand.toLowerCase();

    this._getOneCart(cartId, req, res)
      .then(cart => {
        RestClient.productClient.addProduct(cart.cart_id, productId, 1, warranty_id, productPrice, "", "", brand )
          .then((cart) => {
              this._getOneCart(cartId,req,res)
                  .then(cart => {
                      res.send(cart);
                  })
                  .catch(err => {
                      logger.error("[" + cartId + "] Fail get cart add Product to cart,err:" + err);
                      res.status(500).send("Fail get a add Product cart");
                  });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("Fail update product to cart");
          });
      })
      .catch(err => {
        res.status(500).send("Fail get to cart");
      });
  }

  editProduct(req, res) {

      let body = req.body || {};
      const cartId = req.params.cartId,
            brand = res.locals.xBrand.toLowerCase(),
            productId = body.xid,
            quantity = body.quantity;


    RestClient.productClient.updateProduct(cartId, productId, quantity, brand)
      .then(product => {
        this._getOneCart(cartId,req,res)
            .then(cart => {
                res.send(cart);
            })
            .catch(err => {
                res.status(500).send("Fail get a update cart");
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Fail add product to cart");
      });
  }

  deleteProduct(req, res) {
    let productId = req.params.productId,
      cartId = res.locals.cartId,
      brand = res.locals.xBrand.toLowerCase();

    RestClient.productClient.deleteProduct(cartId, productId, brand)
      .then(cart => {
          cart = _replaceImage(cart);
          cart.percentage = calculateWarrantiesPercentage(cart);
          res.send(cart);
      })
      .catch(err => {
        console.log(err);
        res.status(304).send({ erro: err });
      });
  }

  setCoupon(req, res) {
    let cartId = req.params.cartId,
      couponCode = req.body.coupon_code,
      brand = res.locals.xBrand.toLowerCase();

    RestClient.promotion.addCoupon(cartId, couponCode, brand)
      .then(coupon => {
          this._getOneCart(cartId,req,res)
              .then(cart => {
                  res.send(cart);
              })
              .catch(err => {
                  logger.error("[" + cartId + "] Fail get cart coupon ,err:" + err);
                  res.status(200).send({erro:err});
              });
      })
      .catch(err => {
        logger.error(
          "[" + cartId + "] Error add coupon: " + couponCode + ",err:" + err
        );
        res.status(200).send({erro:err});
      });
  }

  deleteCoupon(req, res) {
    let cartId = req.params.cartId,
      couponCode = req.params.couponCode,
      brand = res.locals.xBrand.toLowerCase();
    RestClient.promotion.deleteCoupon(cartId, couponCode, brand)
      .then(() => {
          this._getOneCart(cartId,req,res)
              .then(cart => {
                  res.send(cart);
              })
              .catch(err => {
                  logger.error("[" + cartId + "] Fail get cart coupon delete ,err:" + err);
                  res.status(500).send("Fail get a update cart coupon delete");
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
        res.status(500).send("Fail delete coupon to cart");
      });
  }

  setAAPlus(req, res) {
    let cartId = req.params.cartId,
      code = req.body.code,
      brand = res.locals.xBrand.toLowerCase();

    console.log("code:"+code)
    console.log("cartId:"+cartId)

    RestClient.promotion.setLoyaltyCode(cartId, "AEROLINEAS_PLUS", code, brand)
      .then( ()=> {
          this._getOneCart(cartId,req,res)
              .then(cart => {
                  res.send(cart);
              })
              .catch(err => {
                  logger.error("[" + cartId + "] Fail get cart coupon ,err:" + err);
                  res.status(200).send({erro:err});
              });
      })
      .catch(err =>     {
        logger.error(
          "[" + cartId + "] Error add AEROLINEAS_PLUS: " + code + ",err:" + err
        );
        res.status(304).send({ erro: err });
      });
  }

  deleteAAPlus(req, res) {
    let cartId = req.params.cartId,
      brand = res.locals.xBrand.toLowerCase();

    RestClient.promotion.deleteLoyaltyCode(cartId, "AEROLINEAS_PLUS", brand)
      .then(loyalty => {
          this._getOneCart(cartId,req,res)
              .then(cart => {
                  res.send(cart);
              })
              .catch(err => {
                  logger.error("[" + cartId + "] Fail get cart coupon ,err:" + err);
                  res.status(200).send({erro:err});
              });
      })
      .catch(err => {
        logger.error(
          "[" + cartId + "] Error add AEROLINEAS_PLUS: " + code + ",err:" + err
        );
        res.status(304).send({ erro: err });
      });
  }

  summary(req, res) {
    let cartId = res.locals.cartId,
      brand = res.locals.xBrand.toLowerCase();

    RestClient.cartClient.getOneCart(cartId, {}, brand)
      .then(cart => {
        res.json({ products_count: cart.products.length });
      })
      .catch(err => {
        res.status(500).send("Fail get cart");
      });
  }

  warrantyMobile(req, res) {
    res.send("ok");
  }

  setWarranty(req, res) {
    let cartId = req.body.cartId,
      productId = req.body.product_id,
      warrantyId = req.body.warranty_id,
      brand = res.locals.xBrand.toLowerCase();
    RestClient.productClient.setWarranty(cartId, productId, warrantyId, brand)
      .then(product => {
        this._getOneCart(cartId,req,res)
            .then(cart => {
                res.send(cart);
            })
            .catch(err => {
                logger.error("[" + cartId + "] Fail get cart   warranty to cart,err:" + err);
                res.status(500).send("Fail get a update cart warranty");
            });
      })
      .catch(err => {
        logger.error("[" + cartId + "] Fail set warranty to cart,err:" + err);
        res.status(304).send({ erro: err });
      });
  }
}

function _replaceImage(cart) {
    cart.products.map((product)=>{
        product.main_image.url = getProductImageCloudfrontV2(product.main_image.url)
    })
    return cart
}

function getProductImageCloudfrontV2(url){

    if(url.indexOf("noImage") == -1){

        var product_image_sha = url.split("/");
        product_image_sha = product_image_sha[product_image_sha.length-1];
        var cloudfront_v2 = "//d34zlyc2cp9zm7.cloudfront.net/";
        var cloudfront_products = "products/";
        var extension = ".webp";
        var tamano = "_200";
        url = cloudfront_v2 + cloudfront_products + product_image_sha + extension + tamano;
    }

    return url;
}

function calculateWarrantiesPercentage(cart) {
    let porcentajeInteres;
    cart.payment_options.map(function (payment_option) {
        if (payment_option.card.name == "Visa") {
            if (typeof payment_option.payment_methods != "undefined" && payment_option.payment_methods != null) {
                payment_option.payment_methods.map(function (payment_method) {
                    payment_method.payment_method_data.map(function (data) {
                        if (porcentajeInteres == undefined && data.installment_price.installments == 12) {
                            porcentajeInteres = (parseFloat(data.installment_price.surcharge) * 100) / parseFloat(data.installment_price.base_price);
                        }
                    });
                });
            }
        }
    });

    return porcentajeInteres
}

module.exports = CartControllers;
