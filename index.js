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

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    handler.handle(command, args, message);
});


client.login(process.env.BOT_TOKEN);