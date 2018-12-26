const RestConnector = require('./rest_connector');
let config  = require('../config/config'),
    logger  = require('../utils/logger');


class NormandiaClient{
    constructor() {
        this._restConnector = new RestConnector();
    }

    getTemplate(device, xBrand,empresarias=false){
        var query = '?analytics=off&webp=true';
        if (device === 'mobile') query += "&mobile=true";
        let baseNormandiaUrl = config.normandia.base_url[xBrand]
        baseNormandiaUrl = empresarias == true ? NORMANDIA_URL.empresarias : baseNormandiaUrl;
        var url = baseNormandiaUrl + '/template/all' + query;

        return this._restConnector.get(url, {});
    };

}

module.exports = NormandiaClient