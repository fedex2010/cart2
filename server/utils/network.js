"use strict";

const logger = require("./logger");

const ipRegExp = new RegExp("^([0-9]{1,3}.){3}[0-9]{1,3}$");
const privateIpRegExp = new RegExp(
  "^(127.)|(192.168.)|(10.)|(172.1[6-9].)|(172.2[0-9].)|(172.3[0-1].)"
);
var env = process.env.APP_ENV || "dev";

module.exports = {
  getIpClient: (req, res) => {
    if (typeof req.headers != "undefined") {
      let ips;
      if (req.headers["x-forwarded-for"]) {
        ips = req.headers["x-forwarded-for"].split(",").map(ip => ip.trim());
      } else {
        ips = req.connection.remoteAddress.split(":");
      }
      for (let ip of ips) {
        if (
          (ip.search(ipRegExp) == 0 && ip.search(privateIpRegExp) != 0) ||
          env == "dev"
        ) {
          return ip;
        }
      }
    } else {
      logger.error("Couldn't get the IP address. Undefined headers !");
      throw new Error("Couldn't get the IP address. Undefined headers !");
    }
    logger.warn(
      "[" +
        res.locals.session +
        "] Couldn't get the IP address. x-forwarded-for:" +
        req.headers["x-forwarded-for"] +
        ", req.connection.remoteAddress: " +
        req.connection.remoteAddress
    );
    throw new Error("Couldn't get the IP address. Undefined headers !");
  }
};
