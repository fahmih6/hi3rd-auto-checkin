const SETTINGS = require("./settings.js");

module.exports = class Endpoints {
  /**
   * URL for User Info.
   *
   * Contains Information whether the user has checked-in or not.
   * HI3rd [ACT_ID] is taken from [SETTINGS]
   */
  static USERINFO = `https://sg-public-api.hoyolab.com/event/mani/info?lang=en-us&act_id=${SETTINGS.ACT_ID}`;

  /**
   * URL for Reward List.
   *
   * Contains Information on current login rewards.
   * HI3rd [ACT_ID] is taken from [SETTINGS]
   */
  static REWARDS = `https://sg-public-api.hoyolab.com/event/mani/home?lang=en-us&act_id=${SETTINGS.ACT_ID}`;

  /**
   * URL for Check In.
   *
   * Use this URL to perform Check In
   */
  static CHECKIN = `https://sg-public-api.hoyolab.com/event/mani/sign`;

  /**
   * URL for Check In Referer Header
   *
   * Use this URL as Referer Header
   */
  static CHECKIN_REFERER_HEADER = `https://act.hoyolab.com/bbs/event/signin-bh3/index.html?act_id=${SETTINGS.ACT_ID}`;

  /**
   * Verify Token
   */
  static VERIFY_TOKEN = `https://sg-public-api.hoyolab.com/account/ma-passport/token/verifyLToken`;
};
