/**
 * An Entity represents something that exists in the game world. 
 * Each Entity has two core functions that should be implemented: 
 * - getState() should return an object containing relevant info about the Entity 
 * - update() should update the state of the Entity
 * - getId() should return unique ID
 * - getOwner() should return user that owns this Entity
 * 
 * An Entity can have different attributes added by simply leveraging Javascript objects.
 * This comes with a responsibility to be diligent in being as detailed with the 
 * attributes as possible. As well, be careful when modifying attributes after
 * they are set.
 * 
 * Once an Entity should be removed from the game, set isDead = 1 
 */
function Entity(/*attribute templates*/) {
    Object.assign(this, ...arguments);

    this.update = function(delta, game) {
        console.log("TODO: implement update!!!");
        // This function has two purposes:
        // 1. Update the state of this Entity, including interations with 
        //    the Game
        // 2. Queue an action to the Game to be applied after all Entities 
        //    have had a chance to update by returning a callback function.
        //    Per design, this function should not modify the Game directly,
        //    instead through the use of the callback function (i.e. 'game'
        //    should be treated as readonly within this function).
    };
}

module.exports = {
    Entity:Entity
}