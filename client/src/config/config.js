"use strict";

var path 			= require('path');
var util 			= require('util');
var rootPath        = path.normalize(__dirname + '/..');
var env             = process.env.APP_ENV || 'dev';

if(!env) new Error("NODE_ENV variable should be set");

const timeoutRatio = 1;

let config    = require(__dirname + util.format('/%s.config.js', env) )(rootPath, timeoutRatio);

console.log("---------process.env------------")
console.log(process.env)
console.log("------------------------")

config.env = env;
config.getBasePathImages = function(){
    return (env == "dev") ? "http://localhost:5000" : process.env.PUBLIC_URL
}

module.exports = config;