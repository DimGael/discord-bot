
const game = require("../game/game");
const config = require("../config.json");
const prefix = config.prefix;

module.exports = {
    game:{
        _standard: (args, message) => {
            if (args.split(" ").length === 0){
                let list = game.getGameModule(message.guild.id).list();

                let gameIndex = Math.floor(Math.random() * list.length);
        
                message.reply("Go jouer à **" + list[gameIndex] + "** !");
            }
        },

        list: (args, message) => {
            let reply = "";
    
            game.getGameModule(message.guild.id).list().forEach(function(game, index) {
                reply += "["+(index+1)+"] "+game+"\n";
            });
    
            message.channel.send("```"+reply+"```");
        },

        add: (args, message) => {
            let newGameId = game.getGameModule(message.guild.id).add(args) + 1;
    
            message.reply("Le jeu **" + args + "** a été  (ID = "+newGameId+")");
        },

        delete: (args, message) => {
            let gameModule = game.getGameModule(message.guild.id);
    
            if (args.split(" ").length === 1 && Number(args)>0) {
                let gameIdToDelete = Number(args);
                gameIdToDelete--;

                if (gameIdToDelete < 0 || gameIdToDelete > game.length){
                    message.reply("Le jeu avec ID = " + gameIdToDelete + " n'existe pas");
                }
    
    
                message.reply("Le jeu **" + gameModule.list()[gameIdToDelete]+"** a été supprimé");
                return gameModule.deleteById(gameIdToDelete);
            }
    
            let success = gameModule.delete(args);
    
            if (success)
                message.reply("Le jeu **"+args+"** a bien été supprimé !")
            else
                message.reply("Le jeu **"+args+"** n'a pas pu être supprimé, je crois qu'il n'existe pas (``"+prefix+"game list`` pour avoir la liste des jeux)");
        },

        help: (args, message) => {
            if (args.split(' ').length === 0){
                // Displays help message for this game command
            }
        }
    },
}