const Discord = require('discord.js');
const request = require('./request.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const TOKEN = '#####################################';

client.on('ready', ()=>{
  console.log('Online');
});

const prefix = "$info";

client.on('messageCreate', async message => 
{
  if(message.author.bot || !message.content.startsWith(prefix)) return

  var args = message.content.split(' ').slice(1);
  const splitarg = args.join(" ").slice(0).split(" // ");
  const [name, time, currency] = splitarg;
  var response;
  var average_price;
  var amount_sold;
  var lowest_price;
  var highest_price;
  var success;

  request.getData(name, time, currency)
    .then(resp => {
    response = resp.data;
    average_price = response.average_price;
    amount_sold = response.amount_sold;
    lowest_price = response.lowest_price;
    highest_price = response.highest_price;
    success = response.success;
    if (!message.content.startsWith(prefix)) return;
    if(success == 'false' || !name || !time || !currency) return message.reply('Error. The correct structure: $info item(english) // time(days) // currency \nE.g.\nInput: $info AK-47 | Aquamarine Revenge (Battle-Scarred) // 7 // USD\nOutput: \nAK-47 | Aquamarine Revenge (Battle-Scarred)\nInformation at last 7 day(s)\nAverage price = USD 15.58;\nAmount sold = 373;\nLowest price = USD 13.99;\nHighest price= USD 17.82;');  
    else{
      console.log(message.channel + " - " + message.author.username);
      return message.reply(
      `${name}\nInformations of Steam at last ${time} day(s)\nAverage price = ${currency} ${average_price};\nAmount sold = ${amount_sold};\nLowest price = ${currency} ${lowest_price};\nHighest price= ${currency} ${highest_price}.`
    );
    }
  })
  .catch(err => {
    console.error(err);
  });

});

client.login(TOKEN);