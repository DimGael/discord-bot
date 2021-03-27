const axios = require("axios");
const prefix = require('../../config.json').prefix;

module.exports = {
    watch: {
        /**
         * @param {string} args Arguments sent by the user
         * @param {DiscordMessage} message
         */
        _standard: function(args, message){
            let error = false;
    
            if (args.trim() === "")
                error = true;
    
            // Ensure the link is correct
            if(!args.startsWith('https://www.youtube.com/')){
                error = true;
            }
    
            // Ensure youtube vidéo exists ?
    
            if (error){
                message.reply("``"+prefix+"watch <lienYoutube>`` pour regarder la vidéo à plusieurs !");
                return;
            }
    
            axios.post("https://w2g.tv/rooms/create.json", {
                "w2g_api_key": process.env.W2G_APIKEY,
                "share": args,
                "bg_color": "#000000",
                "bg_opacity": "50"
            })
            .then(function (response){
                message.channel.send("https://w2g.tv/rooms/" + response.data.streamkey)
            })
            .catch(function (error){
                console.log(error);
                message.reply("W2G : Le serveur a retourné une erreur :'(.")
            })
        }, 

        help: (args, message) => {
            message.channel.send("``"+prefix+"watch <lienYoutube>`` pour regarder la vidéo à plusieurs !");
        }
    }
    
}