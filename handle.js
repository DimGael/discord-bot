// Calls every controller required here to see if they can handle the given command
const config = require('./config.json');

const controllers = [
    require("./modules/game/gameController"),
    require("./modules/controllers/mainController"),
    require("./modules/controllers/w2gController"),
    require("./modules/notifier/notifierController"),
];

const _caller = function(currentObject, commandBody, message){
    let args = commandBody.split(" ");
    let commandToCall = args.shift().toLowerCase();

    if (typeof(currentObject[commandToCall]) === "object")
        _caller(currentObject[commandToCall], args.join(" "), message)
    
    else if(typeof(currentObject[commandToCall]) === "function")
        currentObject[commandToCall](args.join(" "), message);
    
    else if (typeof(currentObject._standard) === "function"){
        args.push(commandToCall);
        currentObject._standard(args.join(" "), message);
    }
}

module.exports = {
    /**
     * Handles the user's command
     * @param {Discord.Client}
     * @param {Discord.Message} message The asker's discord message object
     */
    handle : function(client, messageObject){
        const messageSent = messageObject.content.slice(config.prefix.length);

        controllers.forEach(function(controller){
            if(controller[messageSent.split(" ")[0]] !== undefined) {
                controller._client = client
                _caller(controller, messageSent, messageObject);
            }
        });

        // Do something when command is not handled ...
    },
}