class ContextParams{
  getParamsToAddProduct(req, res) {
    return {
      productId: req.body.xid,
      promotionId: req.body.promotion_id || null,
      quantity: req.body.quantity || 1,
      warrantyId: req.body.warranty_id || null,
      productPrice: req.body.price || null,
      brand: res.locals.xBrand.toLowerCase(),
      xSessionContext: res.locals.xSessionContext,
      sessionId: res.locals.session,
      cartId: res.locals.cartId
    };
  }
  
  getParamsToCreateCart (res) {
    return {
      ipClient: res.locals.ipClient,
      sessionId: res.locals.session,
      sellerId: res.locals.sellerId,
      brand: res.locals.xBrand.toLowerCase(),
      xSessionContext: res.locals.xSessionContext,
      channel: "WEB"
    };
  }
  
  getParamsToGetCart(req, res) {
    let cartId =
      req.params.cartId || req.body.cartId || res.locals.cartId || null;
  
    return {
      ipClient: res.locals.ipClient,
      sessionId: res.locals.session,
      brand: res.locals.xBrand.toLowerCase(),
      isEmpresarias: res.locals.isEmpresarias,
      xSessionContext: res.locals.xSessionContext,
      cartId: cartId
    };
  }
}

module.exports = new ContextParams();