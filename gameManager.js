var util = require('./util.js');
var g = require('./game.js');

/**
 * A layer of abstraction between the games running and the client API calls.
 * Handles multiple game instances. GameManager should:
 * - Know which game each player belongs to
 * - Process user actions and modify the appropriate game
 * - Update the state of each game
 */ 
function GameManager() {
    let games = [];
    let userGameTable = {};
    
    this.update = function(delta) {
        games.forEach(function(game, i) {
            game.update(delta);
        });
        
        util.removeDead(games, 'isFinished');
    };
    
    this.newGame = function(info) {
        let gameInfo = {width: info.width, heigh: info.height};
        let newGame = new g.Game(gameInfo);
        games.push(newGame);
        for(let user in info.users) {
            userGameTable[user] = newGame;
        }
    };

    /**
     * Calling this function requests information about the game world
     * that pertains to the particular user. Purpose of this function is to 
     * sync up the client side game world.
     * Return game information specific to the user
     * @param {*} user 
     */
    this.userSnapshot = function(username) {
        return userGameTable[username].getUserSnapshot(username);
    };
    
    /**
     * Handle user action. E.g. user moving a unit, using a card,
     * client request to update game info, etc.
     * Propogate action to corresponding game
     * @param {*} action - Contains info about the user action
     */
    this.handleUserAction = function (action) {
        
    };
}

module.exports = {
    GameManager: GameManager
}