"use strict";

module.exports = (ROOT_PATH, timeoutRatio) => {
  var config = {
    base_url : "/carrito",
    server: {
      port: 3000
    },
    services: {
      checkout_core: {
        base_url: "http://api-global-ci.garbarino.com",
        resource: "/carts",
        timeout: 2000*timeoutRatio,
        ttl: 1
      }
  	},
    searchList: {
        list_name:{
            garbarino:"home-ofertas-ultimo-momento",
            compumundo:"after-offers"
        },
        list_name_product:{
            garbarino:"productos-cuotas-sin-interes",
            compumundo:"productos-cuotas-sin-interes"
        }
    }
  };
  return config;
};
