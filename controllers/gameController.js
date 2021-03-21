
const game = require("../game/game");

module.exports = {
    games: function(command, args, message){
        let reply = "Available games : ";

            game.list().forEach(game => {
                reply += " "+game;
            });

            message.reply(reply);
    },
    
    play: function(command, args, message){
        let list = game.list();

        let gameIndex = Math.floor(Math.random() * list.length);

        message.reply("Ajourd'hui les petits tdc vous allez jouer à **" + list[gameIndex] + "** et vous allez arrêter de m'emmerder");
    },

    add: function(command, args, message){
        let newGame = args.join(' ');

        game.add(newGame);

        message.reply("Le jeu **" + newGame + "** a été ajouté");
    },

    delete: function(command, args, message){
        let gameToDelete = args.join(' ');

        let success = game.delete(gameToDelete);

        if (success)
            message.reply("Le jeu **"+gameToDelete+"** a bien été supprimé !")
        else
            message.reply("Le jeu **"+gameToDelete+"** n'a pas pu être supprimé, je crois qu'il n'existe pas (**"+prefix+" list** pour avoir la liste des jeux)");
    }
}


module.exports = {
    /**
     * 
     * @param {string} command 
     * @param {Array<string>} args 
     * @param {Discord.Message} message 
     */
    handle(command, args, message){
        functions[command](command, args, message);
    },
}