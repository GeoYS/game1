/**
 * An Entity represents something that exists in the game world. 
 * Each Entity has two core functions that should be implemented: 
 * - getState() should return an object containing relevant info about the Entity 
 * - update() should update the state of the Entity
 * 
 * An Entity can have different attributes added by simply leveraging Javascript objects.
 * This comes with a responsibility to be diligent in being as detailed with the 
 * attributes as possible. As well, be careful when modifying attributes after
 * they are set.
 * 
 * Once an Entity should be removed from the game, set isDead = 1 
 */
function Entity(/*attribute templates*/) {
    for(let i = 0; i < arguments.length; i++) {
        for(let k in attributes) {
            this[k] = attributes[k];
            // Attributes could be type, HP, position, etc.
            // In the case of function attributes, the functions must
            // accept 'this' as the first parameter 
        }
    }

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