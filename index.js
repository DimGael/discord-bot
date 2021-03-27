require('dotenv').config();
const config = require("./config.json");
const Notifier = require('./modules/notifier/notifier');


const Discord = require("discord.js");
const handler = require("./handle");

const client = new Discord.Client();
const prefix = config.prefix;

Notifier.setClient(client);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    Notifier.notify('I\'m connected !');
});

client.on("message", function(message){
    if (message.author.bot) return;
    handler.handle(client, message);
});


client.login(process.env.BOT_TOKEN);
