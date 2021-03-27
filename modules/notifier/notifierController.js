require('dotenv').config();
const { Message } = require('discord.js');

const notify = require('./notify');

/**
 * Controller for notifier module.
 * Uses notifier module to add new users in notifiees.
 */
module.exports = {

    _keyphrase : "password",

    notifier: {
        stop: function(args, message){
            if(args !== "")
                return;

            if(!notify.idExists(message.author.id)){
                message.reply("You are not in the list");
                return;
            }

            if(!notify.delete(message.author.id)){
                message.reply("Error when removing from the list");
                return;
            }

            message.reply("ID [" + message.author.id +"] (yours) correctly removed");
        },
        /**
         * Adds the user, to a list of person that would be notified.
         * First arg should be a hidden keyphrase to be correctly added to the notifiees
         * @param {string} args 
         * @param {Message} message 
         */
        start: function(args, message){
            if(args.trim() === "") return;

            if(args.split(" ").length !== 1) return;
            
            // args should be the bot token
            if(args !== this._keyphrase) return;

            if(notify.idExists(message.author.id)){
                message.reply("You are already in the notifiees !");
                return;
            }

            // Adding the sender to the persons to notify
            notify.add(message.author.id);

            message.reply("You have been correctly add to my notifiees :)");
        },

        _standard: function(args, message){
            if(notify.idExists(message.author.id))
                message.reply("You are in my list of user that are to notify")
            else
                message.reply("You are not in my list of user, you will not be notified")
        },
    }
}
