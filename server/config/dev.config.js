"use strict";

module.exports = (ROOT_PATH, timeoutRatio) => {
  var config = {
    base_url: "/carrito",
    homePage: {
      garbarino: "ci.garbarino.com",
      compumunod: "ci.compumundo.com.ar"
    },
    server: {
      port: 4000
    },
    services: {
      checkout_core: {
        base_url: "http://api-global-ci.garbarino.com",
        resource: "/carts",
        timeout: 2000 * timeoutRatio,
        ttl: 1
      }
    },
    searchList: {
      url: "http://api-global-ci.garbarino.com/lists",
      list_name: {
        garbarino: "home-ofertas-ultimo-momento",
        compumundo: "after-offers"
      },
      list_name_product: {
        garbarino: "productos-cuotas-sin-interes",
        compumundo: "productos-cuotas-sin-interes"
      }
    },
    normandia: {
      base_url: {
        garbarino: "https://ci.garbarino.com/normandia",
        compumundo: "https://ci.compumundo.com.ar/normandia",
        empresarias: "https://empresas-ci.garbarino.com/normandia"
      },
      timeout: 4000 * timeoutRatio
    }
  };
  return config;
};
