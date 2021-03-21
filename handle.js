// Calls every controller required here to see if they can handle the given command

const controllers = [
    require("./controllers/gameController"),
    require("./controllers/mainController"),
    require("./controllers/w2gController"),
];

module.exports = {
    /**
     * Handles the user's command
     * @param {string} command The command asked by the user
     * @param {Array<string>} args The arguments provided by the user
     * @param {Discord.Message} message The asker's discord message object
     */
    handle : function(command, args, message){
        let commandFound = false;
        controllers.forEach(function(controller){
            
            if (controller[command] !== undefined){
                commandFound = true;
                controller[command](command, args, message);
            }

        });

        if (!commandFound)
            message.reply("Cette commande existe pas gros trou du cul");
    }
}