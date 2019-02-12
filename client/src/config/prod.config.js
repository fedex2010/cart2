"use strict";

module.exports = (ROOT_PATH, timeoutRatio) => {
  var config = {
      cart_url:"/reactcart",
      path_name: {
        seller : "vendedor",
        error : "error",
        reactcart : "reactcart"
      },
      cloudfront: {
          url: "//dj4i04i24axgu.cloudfront.net/checkout-ui"
      },
      google: {
          gtm_id:{
              garbarino:"GTM-MSSSZ7",
              compumundo:"GTM-3S2LZG"
          },
          experiment_key: "83704153-128",
          maps_key: "AIzaSyDPqf7pWglQM2NkVIZD63C5MgOagigCBMg"
      },
      home_url:{
          garbarino   :   "https://www.garbarino.com",
          compumundo  :   "https://www.compumundo.com.ar"
      }
  };
  return config;
};
