var util = require('./util.js');

/*
 * A layer of abstraction between the games running and the server
 * Handles everything related to game instances.
 */ 
function GameManager(server) {
    this.server = server;
    this.games = [];
    
    this.update = function(delta) {
        games.forEach(function(game, i){
            game.update(delta);
        });
        
        util.removeDead(games, 'isFinished');
    };
    
    this.newGame = function(info) {
      
    };
    
    /*
     * Handle user action. E.g. user moving a unit, using a card,
     * client request to update game info, etc.
     * Type of actione should be specified by action.type
     */
    this.handleUserAction = function (action) {
        
    };
}