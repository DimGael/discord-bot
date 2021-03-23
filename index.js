require('dotenv').config();
const config = require("./config.json");


const Discord = require("discord.js");
const handler = require("./handle");

const client = new Discord.Client();
const prefix = config.prefix;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", function(message){
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    handler.handle(message);
});


client.login(process.env.BOT_TOKEN);