const SETTINGS = require("../settings/settings");
const ENDPOINTS = require("../settings/endpoints");
const { default: axios } = require("axios");
const Settings = require("../settings/settings");

module.exports = class CheckInServices {
  constructor() {}

  /**
   * GET USER INFO
   */
  static async getUserInfo() {
    try {
      /// Perform User Info Fetch
      const res = await axios.get(ENDPOINTS.USERINFO, {
        headers: {
          COOKIE: SETTINGS.COOKIE,
          "User-Agent": SETTINGS.USER_AGENT,
        },
      });

      /// Return the result
      return res.data;
    } catch (error) {
      return { error: error };
    }
  }

  /**
   * GET REWARDS INFO
   */
  static async getRewardInfo() {
    try {
      /// Perform Fetch
      const res = await axios.get(ENDPOINTS.REWARDS, {
        headers: {
          COOKIE: SETTINGS.COOKIE,
          "User-Agent": SETTINGS.USER_AGENT,
        },
      });

      /// Return the result
      return res.data;
    } catch (error) {
      return { error: error };
    }
  }

  /**
   * PERFORM CHECK IN
   */
  static async performCheckIn() {
    try {
      /// Perform Check In
      const res = await axios.post(
        ENDPOINTS.CHECKIN,
        {
          act_id: Settings.ACT_ID,
        },
        {
          headers: {
            Cookie: SETTINGS.COOKIE,
            "User-Agent": SETTINGS.USER_AGENT,
            Referer: ENDPOINTS.CHECKIN_REFERER_HEADER,
          },
        }
      );

      /// Return the result
      return res.data;
    } catch (error) {
      return { error: error };
    }
  }
};
