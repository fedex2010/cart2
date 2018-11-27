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
  	}
  };
  return config;
};
