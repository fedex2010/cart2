module.exports = (ROOT_PATH, timeoutRatio) => {
  var config = {
      cart_url:"/carrito",
      path_name: {
        seller : "vendedor",
        error : "error",
        reactcart : "carrito"
      },
      cloudfront: {
          url: "http://localhost:5000",
          urlImageProduct: "//d34zlyc2cp9zm7.cloudfront.net/products/"
      },
      google: {
          gtm_id:{
              garbarino:"GTM-MSSSZ7",
              compumundo:"GTM-3S2LZG",
              empresarias:"GTM-5VTV8SK"
          },
          experiment_key: "120032359-126",
          maps_key: "AIzaSyBTGseCoifrBnclGBt6j2XMg5-bxGu-vG4"
      },
      home_url:{
          garbarino   :   "https://ci.garbarino.com",
          compumundo  :   "https://ci.compumundo.com.ar",
          empresarias  :   "https://empresas-ci.garbarino.com"
      }
  };
  return config;
};
