const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const game = require("./game/game.js");

const client = new Discord.Client();
const prefix = "g ";

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
        case 'help':
            let helpMessage = "Hello ! Je suis un bot tout nouveau ! Pour l'instant je peux juste vous aider à trouver un jeu auquel jouer si vous n'avez pas d'idée :)";
            helpMessage += "\nFaites **g play** pour que je choisisse un jeu pour vous !";
            message.reply(helpMessage);
            break;

        case 'games':
            let reply = "Available games : ";

            game.list().forEach(game => {
                reply += " "+game;
            });

            message.reply(reply);
            break;

        case 'play':
            let list = game.list();

            let gameIndex = Math.floor(Math.random() * list.length);

            message.reply("Ajourd'hui les gueux vous allez jouer à **" + list[gameIndex] + "** et vous allez arrêter de m'emmerder");
            break;

        case 'add':
            let newGame = args.join(' ');

            game.add(newGame);

            message.reply("Le jeu **" + newGame + "** a été ajouté");
            break;

        case 'delete':
            let gameToDelete = args.join(' ');

            let success = game.delete(gameToDelete);

            if (success)
                message.reply("Le jeu **"+gameToDelete+"** a bien été supprimé !")
            else
                message.reply("Le jeu **"+gameToDelete+"** n'a pas pu être supprimé, je crois qu'il n'existe pas (**"+prefix+" list** pour avoir la liste des jeux)");
            break;

    }
});


client.login(config.BOT_TOKEN);