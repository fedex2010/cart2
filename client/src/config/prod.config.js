module.exports = (ROOT_PATH, timeoutRatio) => {
  var config = {
      cart_url:"/reactcart",
      path_name: {
        seller : "vendedor",
        error : "error",
        reactcart : "reactcart"
      },
      cloudfront: {
          url: "//dj4i04i24axgu.cloudfront.net/checkout-ui",
          urlImageProduct: "//d34zlyc2cp9zm7.cloudfront.net/products/"
      },
      google: {
          gtm_id:{
              garbarino:"GTM-MSSSZ7",
              compumundo:"GTM-3S2LZG",
              empresarias:"GTM-5VTV8SK"
          },
          experiment_key: "83704153-128",
          maps_key: "AIzaSyDPqf7pWglQM2NkVIZD63C5MgOagigCBMg"
      },
      home_url:{
          garbarino    :   "https://www.garbarino.com",
          compumundo   :   "https://www.compumundo.com.ar",
          empresarias  :   "https://empresas.garbarino.com"
      }
  };
  return config;
};
