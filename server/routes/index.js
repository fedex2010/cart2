let express = require('express');
let router = express.Router();
let indexController = require('../controllers/indexController');
let uaparser = require('ua-parser-js');


router.all('*', function (req, res, next) {

    let app = req.app,
        ua  = new uaparser(req.get('User-Agent'));

    res.locals.device = ua.getDevice().type;

    if(req.headers['x-brand'])
        res.locals.xBrand = req.headers['x-brand'].toLowerCase();
    else {
        res.locals.xBrand = 'garbarino';
        //logger.warn('x-brand header not present. Set garbarino by default');
    }

    next();
});


module.exports = router;
