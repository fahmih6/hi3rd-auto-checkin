const CheckInServices = require("./services/check-in");
const CheckIn = require("./cron/check-in-cron");
const checkInCron = require("./cron/check-in-cron");
const { CronJob } = require("cron");

(async () => {
  /**
   * Create the Cron Job.
   */
  const job = CronJob.from({
    cronTime: checkInCron.expression,
    onTick: async () => await checkInCron.code(),
    start: true,
    timeZone: "Asia/Jakarta",
  });

  /// Start the cron job.
  job.start();
})();
