const RestClient = require("../client"),
  logger = require("../utils/logger");

class CartControllers {
  constructor() {
  }

  getNewCart(req, res) {
    let session_id = res.locals.session;
    let sellerId = "";
    let brand = res.locals.xBrand.toLowerCase();

    return RestClient.cartClient.newCart(session_id, sellerId, false, null, "WEB", brand)
      .then(cart => {
        return cart;
      })
      .catch(err => {
        res.status(500).send("Fail create cart");
      });
  }

  getCart(req, res) {
    let brand = res.locals.xBrand.toLowerCase();
    let cartId = req.params.cartId;
    console.log("cart");
    console.log(cartId);
    RestClient.cartClient.getOneCart(cartId, {}, brand)
      .then(cart => {
        //isEmpresarias(req,res)
        res.send(cart);
      })
      .catch(err => {
        logger.error("[" + cartId + "] Fail get cart,err:" + err);
        res.status(500).send("Fail get cart");
      });
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
          return cart;
        })
        .catch(err => {
          res.status(500).send("Fail get one cart");
        });
    } else {
      return this.getNewCart(req, res)
        .then(cart => {
          return cart;
        })
        .catch(err => {
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
          .then(() => {
            res.send(cart);
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
        res.send(cart);
      })
      .catch(e => {
        res.status(500).send("Something broke!");
      });
  }

  setCoupon(req, res) {
    let cartId = req.params.cartId,
      couponCode = req.body.coupon_code,
      brand = res.locals.xBrand.toLowerCase();

    console.log(cartId);
    console.log(couponCode);
    RestClient.promotion.addCoupon(cartId, couponCode, brand)
      .then(coupon => {
        res.send(coupon);
      })
      .catch(err => {
        logger.error(
          "[" + cartId + "] Error add coupon: " + couponCode + ",err:" + err
        );
        res.status(500).send("Fail add coupon to cart");
      });
  }

  deleteCoupon(req, res) {
    let cartId = req.params.cartId,
      couponCode = req.params.couponCode,
      brand = res.locals.xBrand.toLowerCase();

    RestClient.promotion.deleteCoupon(cartId, couponCode, brand)
      .then(coupon => {
        res.send(coupon);
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

    RestClient.promotion.setLoyaltyCode(cartId, "AEROLINEAS_PLUS", code, brand)
      .then(loyalty => {
        res.send(loyalty);
      })
      .catch(err => {
        logger.error(
          "[" + cartId + "] Error add AEROLINEAS_PLUS: " + code + ",err:" + err
        );
        res.status(500).send("Fail add coupon to cart");
      });
  }

  deleteAAPlus(req, res) {
    let cartId = req.params.cartId,
      code = null,
      brand = res.locals.xBrand.toLowerCase();

    RestClient.promotion.setLoyaltyCode(cartId, "AEROLINEAS_PLUS", code, brand)
      .then(loyalty => {
        res.send(loyalty);
      })
      .catch(err => {
        logger.error(
          "[" + cartId + "] Error add AEROLINEAS_PLUS: " + code + ",err:" + err
        );
        res.status(500).send("Fail add coupon to cart");
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
      brand = res.locals.xBrand.toLowerCase(),
      responseObj;
    RestClient.productClient.setWarranty(cartId, productId, warrantyId, brand)
      .then(product => {
        //req.params.cartId = cartId;
        return this.getCart(req, res)
          .then(cart => {
            console.log("cart");
            console.log(cart);
            responseObj = {
              cart: cart,
              product: product
            };
            res.status(200).send(responseObj);
          })
          .catch(() => {
            res.status(500).send("Fail get cart");
          });
      })
      .catch(err => {
        logger.error("[" + cartId + "] Fail set warranty to cart,err:" + err);
        res.status(500).send("Fail set warranty to cart");
      });
  }
}

module.exports = CartControllers;
