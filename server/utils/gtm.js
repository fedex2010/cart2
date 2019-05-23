module.exports = {
  generateCartObject : (cart, arplus) => {

    var itemsMetadata = [];
  
    //Adding products.
    cart.products.forEach(function (product) {
  
        // If needed map warranty to null.
        var warranty = (product.warranty_id !== "DEFAULT_FACTORY") ? product.warranty_id : null;
  
        itemsMetadata.push({
            xid : product.product_id,
            count : product.quantity,
            xidWarranty : warranty
        });
  
    });
  
    let cartData = {
        itemsMetadata : itemsMetadata,
        aerolineasPlusCode : null
    };
  
    if (cart.coupons[0]) {
        cartData.couponId = cart.coupons[0].coupon_id
    }
  
    if (typeof arplus !== "undefined" && arplus !== "") {
        cartData.aerolineasPlusCode = arplus;
    }
  
    return JSON.stringify(cartData);
  
  }
};
