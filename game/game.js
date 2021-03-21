/**
 * This modules is managing games. 
 */

const fs = require('fs');


module.exports = {

    /**
     * Returns a list of saved games.
     * @returns Array - an array of strings
     */
    list: function(){
        const games = require("./games.json");

        return games;
    },

    add: function(gameName){
        let games = require("./games.json");

        games.push(gameName);

        fs.writeFileSync("./game/games.json", JSON.stringify(games));

        return true;
    },

    delete: function(gameName){
        let games = require("./games.json");

        let index = games.findIndex((value) => value.toUpperCase().trim() === gameName.toUpperCase().trim());

        if (index === -1) return false;

        games.splice(index, 1);
        fs.writeFileSync("./game/games.json", JSON.stringify(games));

        return true;
    },
}