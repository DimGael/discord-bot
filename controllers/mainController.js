module.exports = {
    help: function(command, args, message){
        
        let helpMessage = "Hello ! Je suis un bot tout nouveau ! Pour l'instant je peux juste vous aider à trouver un jeu auquel jouer si vous n'avez pas d'idée :)";
        helpMessage += "\nFaites **g play** pour que je choisisse un jeu pour vous !";
        message.channel.send(helpMessage);
        
    }
}