const Discord = require("discord.js");
const config = require("../config.json")

const helpMessageEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle("Potclean Help")
    .setURL("https://github.com/DimGael/discord-bot/")
    .setDescription("```Salut c'est moi, Potclean !\nJe ne suis pas que le nen de Knuckle, je suis aussi un bot Discord !\n\n"+
        "Voici ce que je sais faire :```")
    .setThumbnail('https://www.nautiljon.com/images/perso/00/24/potclean_10642.jpg?0')
	.addFields(
		{ name: config.prefix+'play', value: 'je choisis à quoi vous allez jouer aujourd\'hui' },
		{ name: config.prefix+'watch', value: 'je vous met dans une salle à l\'aise pour regarder une vidéo youtube ensemble !' },
		{ name: config.prefix+'help', value: 'j\'affiche ce petit message tout pipou' },
	)
    .setFooter('Auteur du bot : Sakamoto du discord Hunters mon pote rien que ça')
;

module.exports = {
    help: function(command, args, message){
        message.channel.send(helpMessageEmbed);
    },

    coucheravec: function(command, args, message){
        if (args.length >= 1)
            message.reply("Mmmmmh alors alors alors mes petits zouzous, demain à 17h30 retrouvez vous chez : "+args[0]+"");
    },

    react: function(command, args, message){
        message.react('😀');
    },

    swag: function(command, args, message){
        let ran = Math.floor(Math.random() * 2);
        if (ran === 1)
            message.reply("Oui bg tu es swag sisi");
        else
            message.reply("Non bg tu pues, vas donc te chercher un style");
    },

    manger: function(command, args, message){
        const bouffe = ['Salade', 'Kebab', 'KFC', 'McDo', 'BK'];

        let ran = Math.floor(Math.random() * bouffe.length);

        message.reply("Fais toi ça : **"+bouffe[ran]+"**, tkt");
    },

    taille: function(command, args, message){
        const taille = Math.floor(Math.random() * 10)+10;
        if (taille < 12)
            message.reply(taille+"cm ???? HAHAHA C TOUT PETIT SALE TROUDUC")
        else
            message.reply(taille+"cm ???? Wow c'est super FAT sa mère")
    },

    civ: function(command, args, message){
        const victoire = ["Culturel", "Militaire", "Religieuse", "loose"]

        let ind = Math.floor(Math.random()*victoire.length);

        if(victoire[ind] === "loose"){
            message.reply("ça sert à rien c'est loose");
        }
        else{
            message.reply("Alors là tu vas viser la victoire " + victoire[ind].toLowerCase())
        }
    },

    lfl: function(command, args, message){
        message.reply("Tu veux savoir qui va gagner la LFL ce soir ? attend je vais te dire ...")
        setTimeout(() => {
            message.channel.send("```1```")
        }, 1000);
        setTimeout(() => {message.channel.send("```2```")}, 2000);
        setTimeout(() => {message.channel.send("```3```")}, 3000);
        setTimeout(() => {message.channel.send("```VIVE LA KCORP ALLER ADAM```")}, 4000);
    }
}