const fs = require('fs');

let getNotifiees = function(){
    return require('./notifiees.json');
}

const Discord = require('discord.js');

const notifyMessageEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle("Notification")
;


module.exports = {

    setClient: function(client){
        this.client = client;
    },
    client : undefined,

    /**
     * @param {string} message message to send to all notifiees
     */
    notify: function(message){
        let notifiees = getNotifiees();

        let now = new Date();
        notifyMessageEmbed.setFooter(now.toLocaleTimeString() +" - " + now.toLocaleDateString())
        notifyMessageEmbed.setTitle(message);

        notifiees.forEach((user) => {
            let now = new Date();

            this.client.users.fetch(user.id)
                .then((discordUser) => {
                    discordUser.createDM().then((dmChannel) => {
                        dmChannel.send(notifyMessageEmbed);
                    })
                })
                .catch((error) => console.log(error))
            
        });
    },

    /**
     * Adds a new user to be notified
     * @param {string} id user to add as a notifiee
     */
    addToNotify: function(id){
        let notifiees = getNotifiees();
        let newNotifiee = {
            "id": id
        };

        let userExists = false;

        notifiees.forEach((notifiee) => {if (notifiee.id === newNotifiee.id) userExists = true;})
        
        if (userExists) return;

        notifiees.push(newNotifiee);

        console.log(notifiees);
        fs.writeFileSync("./modules/notifier/notifiees.json", JSON.stringify(notifiees));
    }
}
