const winston           = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

var env = process.env.APP_ENV || 'dev';
var cloudwatchTransport = new WinstonCloudWatch({
    logGroupName: 'application-logs',
    logStreamName: 'cart-ui-' + process.env.APP_ENV,
    awsRegion: 'us-east-1'
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    cloudwatchTransport
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;