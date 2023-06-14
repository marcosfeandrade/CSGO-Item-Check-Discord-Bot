const request = require("./request.js");
const { Client } = require("discord.js");
const client = new Client({
  intents: 3276799,
});
const config = require("./config.json");
client.on("ready", () => {
  console.log("Online");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;
  const args = message.content.split(" ").slice(1);

  const splitarg = args.join(" ").slice(0).split(" // ");
  const [name, time, currency] = splitarg;

  request
    .getData(name, time, currency)
    .then((resp) => {
      if (resp.data.success == "false" || !name || !time || !currency)
        return message.reply(
          "Error. The correct structure: $info item(english) // time(days) // currency \nE.g.\nInput: $info AK-47 | Aquamarine Revenge (Battle-Scarred) // 7 // USD\nOutput: \nAK-47 | Aquamarine Revenge (Battle-Scarred)\nInformation at last 7 day(s)\nAverage price = USD 15.58;\nAmount sold = 373;\nLowest price = USD 13.99;\nHighest price= USD 17.82;"
        );

      message.reply(
        `${name}\nInformations of Steam at last ${time} day(s)\nAverage price = ${currency} ${resp.data.average_price};\nAmount sold = ${resp.data.amount_sold};\nLowest price = ${currency} ${resp.data.lowest_price};\nHighest price= ${currency} ${resp.data.highest_price}.`
      );
    })
    .catch((err) => {
      console.error(err);
    });
});

client.login(config.TOKEN);
