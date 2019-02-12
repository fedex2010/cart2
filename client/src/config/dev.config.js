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
          url: "http://localhost:3000"
      },
      google: {
          gtm_id:{
              garbarino:"GTM-MSSSZ7",
              compumundo:"GTM-3S2LZG"
          },
          experiment_key: "120032359-126",
          maps_key: "AIzaSyBTGseCoifrBnclGBt6j2XMg5-bxGu-vG4"
      },
      home_url:{
          garbarino   :   "https://ci.garbarino.com",
          compumundo  :   "https://ci.compumundo.com.ar"
      }
  };
  return config;
};
