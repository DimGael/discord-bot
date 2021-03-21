const axios = require("axios");

module.exports = {
    watch: function(command, args, message){
        const url = args[0];

        if (args.length === 0){
            message.reply("**g watch <lienYoutube>** pour regarder la vidéo à plusieurs !");
            return;
        }

        axios.post("https://w2g.tv/rooms/create.json", {
            "w2g_api_key": process.env.W2G_APIKEY,
            "share": url,
            "bg_color": "#000000",
            "bg_opacity": "50"
        })
        .then(function (response){
            message.reply("W2G: Et voilà votre salle messieurs :\nhttps://w2g.tv/rooms/" + response.data.streamkey)
        })
        .catch(function (error){
            console.log(error);
            message.reply("W2G : Le serveur a retourné une erreur :'(.")
        })
    }
}