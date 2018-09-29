var util = require('./util.js');

/**
 * A layer of abstraction between the games running and the client API calls.
 * Handles multiple game instances. GameManager should:
 * - Know which game each player belongs to
 * - Process user actions and modify the appropriate game
 * - Update the state of each game
 */ 
function GameManager() {
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
     */
    this.handleUserAction = function (action) {
        // Propogate action to corresponding game
    };
}