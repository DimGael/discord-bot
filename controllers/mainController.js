const Discord = require("discord.js");
const config = require("../config.json")

const helpMessageEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle("Potclean Help")
    .setURL("https://github.com/DimGael/discord-bot/")
    .setDescription("Salut c'est moi, Potclean !\nJe ne suis pas que le nen de Knuckle, je suis aussi un bot Discord !\n"+
        "Voici ce que je sais faire :")
    .setThumbnail('https://www.nautiljon.com/images/perso/00/24/potclean_10642.jpg?0')
	.addFields(
		{ name: config.prefix+'play', value: 'je choisis à quoi vous allez jouer aujourd\'hui' },
		{ name: config.prefix+'watch', value: 'je vous met dans une salle à l\'aise pour regarder une vidéo youtube ensemble !' },
		{ name: config.prefix+'help', value: 'j\'affiche ce petit message tout pipou' },
	)
    .setFooter('Auteur du bot : Sakamoto du channel Hunters mon pote rien que ça')
;

module.exports = {
    help: function(command, args, message){
        message.channel.send(helpMessageEmbed);
    }
}