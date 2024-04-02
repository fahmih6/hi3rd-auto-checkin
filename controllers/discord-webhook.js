const { default: axios } = require("axios");
const Settings = require("../settings/settings");

module.exports = class DiscordWH {
  /** Prepare Discord Message */
  static async prepareMessage(messageData, message) {
    const embed = {
      color: 0xbb0bb5,
      title: "Honkai Impact 3rd: Daily Login",
      author: {
        name: "Kanon48",
        icon_url:
          "https://fastcdn.hoyoverse.com/static-resource-v2/2024/02/29/3d96534fd7a35a725f7884e6137346d1_3942255444511793944.png",
      },
      thumbnail: {
        url: messageData?.award?.icon,
      },
      description: message,
      fields: [
        {
          name: "Today's Reward",
          value: `${messageData?.award?.name} x${messageData?.award?.count}`,
          inline: true,
        },
        {
          name: "Total Sign-in Days",
          value: messageData?.total_signin,
          inline: true,
        },
        {
          name: "Result",
          value: messageData?.result,
          inline: true,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: `HoyoLab Auto Check-in Executed`,
        icon_url:
          "https://webstatic.hoyoverse.com/upload/static-resource/2022/08/04/8a31e3d6bce7684556cd45b1e1c309bf_1216320235452608527.png",
      },
    };

    await this.send(embed);
  }

  /** Send Discord Message */
  static async send(embed) {
    try {
      const res = await axios.post(
        Settings.DISCORD_WH_URL,
        {
          embeds: [embed],
          username: "Honkai Impact 3rd",
          avatar_url:
            "https://fastcdn.hoyoverse.com/static-resource-v2/2024/02/29/3d96534fd7a35a725f7884e6137346d1_3942255444511793944.png",
        },
        {}
      );

      if (res.status !== 200) {
        return {
          message: "Discord Webhook returned an error.",
          args: {
            statusCode: res.status,
            statusMessage: res.statusText,
            body: res.data,
          },
        };
      }

      return true;
    } catch (error) {
      return { error: error };
    }
  }
};
