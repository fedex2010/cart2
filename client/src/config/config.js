var path 			= require('path');
var util 			= require('util');
var rootPath        = path.normalize(__dirname + '/..');
var env             = process.env.REACT_APP_APP_ENV || process.env.APP_ENV || 'dev';

if(!env) new Error("NODE_ENV variable should be set");

const timeoutRatio = 1;

let config    = require(__dirname + util.format('/%s.config.js', env) )(rootPath, timeoutRatio);


config.env = env;
config.getBasePathImages = function(){
    return (process.env.PUBLIC_URL === "") ? "http://localhost:5000" : process.env.PUBLIC_URL
}

module.exports = config;