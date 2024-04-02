const CheckInServices = require("../services/check-in");

module.exports = class CheckInController {
  static async checkAndSign() {
    /** Check if the user is checked in */
    const userInfo = await CheckInServices.getUserInfo();
    const isCheckedIn = userInfo?.data?.is_sign ?? false;

    /** Get the rewards info */
    const rewards = await CheckInServices.getRewardInfo();
    const awards = rewards?.data?.awards ?? [];
    let redeemedAward = null;

    /// Terminate the program if user is checked in
    if (isCheckedIn) {
      const checkInCount = (userInfo?.data?.total_sign_day ?? 0) - 1;
      redeemedAward = awards[checkInCount];

      return {
        data: {
          is_signed_before: isCheckedIn,
          result: "You have already signed in, Captain~",
          total_signin: userInfo?.data?.total_sign_day ?? 0,
          award: {
            name: redeemedAward?.name,
            count: redeemedAward?.cnt,
            icon: redeemedAward?.icon,
          },
        },
      };
    } else {
      /** Perform Check In */
      const performCheckIn = await CheckInServices.performCheckIn();
      if (performCheckIn?.retcode == 0) {
        const checkInCount = userInfo?.data?.total_sign_day ?? 0;
        redeemedAward = awards[checkInCount];
      } else {
        const checkInCount = (userInfo?.data?.total_sign_day ?? 0) - 1;
        redeemedAward = awards[checkInCount];
      }

      return {
        data: {
          is_signed_before: isCheckedIn,
          result: performCheckIn?.retcode == 0 ? "OK" : performCheckIn?.message,
          total_signin: (userInfo?.data?.total_sign_day ?? 0) + 1,
          award: {
            name: redeemedAward?.name,
            count: redeemedAward?.cnt,
            icon: redeemedAward?.icon,
          },
        },
      };
    }
  }
};
