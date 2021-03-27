/**
 * This modules is managing games. 
 */

const fs = require('fs');

/** id of discord server */
let myCurrentId = undefined;
let games = require("./games.json");


const gameModule = {
    /**
     * Returns a list of saved games.
     * @returns Array - an array of strings
     */
    list: function(){
        games = require("./games.json");
        games = games[myCurrentId];

        return games;
    },

    /**
     * Adds a new game to the list
     * @param {string} gameName Name of the game to add
     * @returns The ID of the game just added (starting at 0)
     */
    add: function(gameName){
        games = require("./games.json");
        games = games[myCurrentId];

        games.push(gameName);

        fs.writeFileSync("./game/games.json", JSON.stringify(games));

        return games.length-1;
    },

    delete: function(gameName){
        games = require("./games.json");
        games = games[myCurrentId];

        let index = games.findIndex((value) => value.toUpperCase().trim() === gameName.toUpperCase().trim());

        if (index === -1) return false;

        games.splice(index, 1);

        // Saving new file
        let jsonData = require("./games.json");
        jsonData[myCurrentId] = games;
        fs.writeFileSync("./game/games.json", JSON.stringify(jsonData));

        return true;
    },

    /**
     * Delete a game by his id
     * @param {number} gameId The id of the game to be deleted
     */
    deleteById: function(gameId){
        games = require("./games.json");
        games = games[myCurrentId];

        if (gameId < 0 || gameId > games.length-1)
            return false;
        
        games.splice(gameId, 1);
        
        // Saving new file
        let jsonData = require("./games.json");
        jsonData[myCurrentId] = games;
        fs.writeFileSync("./game/games.json", JSON.stringify(jsonData));
        return true;
    },

    length: function(){
        games = require("./games.json");
        games = games[myCurrentId];
        return games.length;
    },

    getMyCurrentId: function(){
        return myCurrentId;
    }
}

module.exports = {

    getGameModule: function(gameId){
        if(!gameId) return undefined;
        myCurrentId = gameId;
        games = require('./games.json');

        // If the id is not in the json file, set default values
        if(games[myCurrentId] === undefined){
            games[myCurrentId] = games['default'];
            
            fs.writeFileSync('./game/games.json', JSON.stringify(games));
        }

        return gameModule;
    }
}