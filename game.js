var util = require('./util.js')

/**
 * A Game represents an instance of a game world. Several Games can be
 * happening at once. Contains the game update logic. Should expose
 * interface for applying user actions.
 */ 
function Game(info) {
    let entities = [];
    let pendingChanges = [];
    let actionChanges = [];
    
    this.width = info.width;
    this.height = info.height;
    this.isFinished = false;
    
    this.update = function(delta) {
        entities.forEach(function(entity, i){
            pendingChange = entity.update(delta, this);
            
            if(pendingChange) {
                pendingChanges.push(pendingChange);
            }
        });

        while(pendingChanges.length > 0) {
            (pendingChanges.shift())();
        }

        while(actionChanges.length > 0) {
            (actionChanges.shift())();
        }
        
        util.removeDead(entities, 'isDead');
    };
    
    this.addEntity = function(entity) {
        entities.push(entity);
    };

    this.getUserSnapshot = function(user) {
        return entities; // TODO: user specific snapshot
    };

    this.applyAction = function(action) {
        // User actions impact the game like an act of god haha...
        // Interpret action into a tangible change to the world and 
        // queue change (as callback) to be applied next update cycle.
    }
}

module.exports = {
    Game:Game
}