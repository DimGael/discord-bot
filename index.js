const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const client = new Discord.Client();
const prefix = "h ";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on("message", function(message){
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    switch(command){
        case 'ping':
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`pong`);
            break;
            
        case 'sum':
            const numArgs = args.map(x => parseFloat(x));
            const sum = numArgs.reduce((counter, x) => counter += x);
            message.reply(`The sum of all the arguments you provided is ${sum}!`);
            break;
    }
});


client.login(config.BOT_TOKEN);