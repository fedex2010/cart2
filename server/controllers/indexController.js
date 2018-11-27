const config   = require('../config/config');
const services = require('../services/api_client');
const logger = require('../utils/logger');
const Q        = require("q");
const self = {};

Q.longStackSupport = true;


self.main = (req, res, next) => {
    logger.info("Main Controller");
    let response = services.getMockServiceCart(req, res);
    return res.json(response);
}

module.exports = self;