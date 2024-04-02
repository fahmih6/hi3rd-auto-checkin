const CheckInController = require("../controllers/check-in-controllers");
const DiscordWH = require("../controllers/discord-webhook");
const Settings = require("../settings/settings");

module.exports = {
  name: "check-in",
  expression: "0 0 0 * * *",
  description: "Run daily check-in every day at midnight",
  code: async function announceCheckIn() {
    const checkInResult = await CheckInController.checkAndSign();
    if (checkInResult.length === 0) {
      console.log("Length is 0");
      return;
    }

    const isSignedBefore = checkInResult?.data?.is_signed_before;
    if (isSignedBefore) {
      console.log("Have Checked In Before");
      return;
    }

    const message =
      checkInResult?.data?.result == "OK"
        ? `[Check-in successful: ${checkInResult?.data.award.name} x${checkInResult?.data.award.count}]`
        : `[Check-in failed: ${checkInResult?.data.result}]`;

    /// Message
    console.log(message);

    /// Send to Discord webhook.
    if (Settings.DISCORD_WH_URL != "") {
      await DiscordWH.prepareMessage(checkInResult?.data, message);
    }
  },
};
