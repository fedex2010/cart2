const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

var env = process.env.APP_ENV || 'dev';

var cloudwatchTransport = new WinstonCloudWatch({
  logGroupName: 'application-logs',
  logStreamName: 'cart-ui-' + env,
  awsRegion: 'us-east-1'
});

if (env == "dev") {
  var transport = new winston.transports.Console({ format: winston.format.simple() });
} else {
  var transport = cloudwatchTransport;
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    transport
  ]
});

module.exports = logger;