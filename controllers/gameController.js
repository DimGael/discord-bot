
const game = require("../game/game");
const config = require("../config.json");
const prefix = config.prefix;

module.exports = {
    /**
     * 
     * @param {*} command 
     * @param {*} args 
     * @param {Discord.Message} message 
     */
    games: function(command, args, message){
        let reply = "";

        game.getGameModule(message.guild.id).list().forEach(function(game, index) {
            reply += "["+(index+1)+"] "+game+"\n";
        });

        message.channel.send("```"+reply+"```");
    },
    
    play: function(command, args, message){
        let list = game.getGameModule(message.guild.id).list();

        let gameIndex = Math.floor(Math.random() * list.length);

        message.reply("Go jouer à **" + list[gameIndex] + "** !");
    },

    add: function(command, args, message){
        let newGame = args.join(' ');

        game.getGameModule(message.guild.id).add(newGame);

        message.reply("Le jeu **" + newGame + "** a été ajouté");
    },

    delete: function(command, args, message){
        let gameModule = game.getGameModule(message.guild.id);

        if (args.length === 1 && Number(args[0])>0) {
            let gameIdToDelete = args[0];
            
            if (gameIdToDelete < 1 || gameIdToDelete > game.length) return;

            gameIdToDelete--;

            message.reply("Le jeu **" + gameModule.list()[gameIdToDelete]+"** a été supprimé");
            return gameModule.deleteById(gameIdToDelete);
        }

        let gameToDelete = args.join(' ');

        let success = gameModule.delete(gameToDelete);

        if (success)
            message.reply("Le jeu **"+gameToDelete+"** a bien été supprimé !")
        else
            message.reply("Le jeu **"+gameToDelete+"** n'a pas pu être supprimé, je crois qu'il n'existe pas (**"+prefix+"games** pour avoir la liste des jeux)");
    }
}