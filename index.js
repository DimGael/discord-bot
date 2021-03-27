require('dotenv').config();
const config = require("./config.json");
const notify = require('./modules/notifier/notify');


const Discord = require("discord.js");
const handler = require("./handle");

const client = new Discord.Client();
const prefix = config.prefix;

notify.setClient(client);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    notify.notify('I\'m connected !');
});

client.on("message", function(message){
    if (message.author.bot) return;
    handler.handle(client, message);
});


client.login(process.env.BOT_TOKEN);
