const schedule = require("node-schedule"),
  normaJobs = require("../normaJob");
var env = process.env.APP_ENV || "dev";

exports.sync = function() {
  if (env != "dev") {
    schedule.scheduleJob("*/15 * * * *", function() {
        normaJobs.job("garbarino", true);
        normaJobs.job("compumundo", true);
        normaJobs.job("empresarias", true);
    });
  }
};
