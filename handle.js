// Calls every controller required here to see if they can handle the given command

const controllers = [
    require("./controllers/gameController"),
    require("./controllers/mainController"),
    require("./controllers/w2gController"),
];

module.exports = {
    /**
     * Handles the user's command
     * @param {Discord.Message} message The asker's discord message object
     */
    handle : function(message){
        const commandBody = message.content.slice("!".length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();

        let commandFound = false;
        controllers.forEach(function(controller){
            
            if (controller[command] !== undefined){
                commandFound = true;
                controller[command](command, args, message);
            }

        });

        // Do something when command is not handled ...
    }
}