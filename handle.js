// Calls every controller required here to see if they can handle the given command

const controllers = [
    require("./controllers/gameController"),
    require("./controllers/mainController"),
    require("./controllers/w2gController"),
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
     * @param {Discord.Message} message The asker's discord message object
     */
    handle : function(messageObject){
        const messageSent = messageObject.content.slice("!".length);

        controllers.forEach(function(controller){
            _caller(controller, messageSent, messageObject);
        });

        // Do something when command is not handled ...
    }
}