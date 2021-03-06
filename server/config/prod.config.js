"use strict";

module.exports = (ROOT_PATH, timeoutRatio) => {
  var config = {
    base_url : "/carrito",
    server: {
      port: 3000
    },
    services: {
      checkout_core: {
        base_url: "http://api-global-prod.garbarino.com",
        resource: "/carts",
        timeout: 2000*timeoutRatio,
        ttl: 1
      }
  	},
    searchList: {
        url:"http://api-global-prod.garbarino.com/lists",
        list_name:{
            garbarino:"home-ofertas-ultimo-momento",
            compumundo:"home-ofertas-ultimo-momento-c"
        },
        list_name_product:{
            garbarino:"productos-cuotas-sin-interes",
            compumundo:"productos-cuotas-sin-interes"
        }
    },
    normandia: {
        base_url:{
            garbarino   :   "https://www.garbarino.com/normandia",
            compumundo  :   "https://www.compumundo.com.ar/normandia",
            empresarias :   "https://empresas.garbarino.com/normandia"
        },
        timeout: 4000*timeoutRatio
    }
  };
  return config;
};
