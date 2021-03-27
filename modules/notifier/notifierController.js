require('dotenv').config();
const { Message } = require('discord.js');

const notify = require('./notify');


module.exports = {

    /**
     * Adds the user, to a list of person that would be notified
     * @param {*} args 
     * @param {Message} message 
     */
    notifyme: function(args, message){
        if(args.trim() === "") return;

        if(args.split(" ").length !== 1) return;
        
        // args should be the bot token
        if(args !== process.env.BOT_TOKEN) return;

        // Adding the sender to the persons to notify
        notify.addToNotify(message.author.id);

        message.reply("You have been correctly add to my notifiees :)");
    },
}