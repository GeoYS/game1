var u = require("./util.js");

/**
 * An Entity represents something that exists in the game world. 
 * Each Entity has two core functions that should be implemented: 
 * - getState() should return an object containing relevant info about the Entity 
 * - update() should update the state of the Entity
 * - getId() should return unique ID
 * - getOwner() should return user that owns this Entity
 * 
 * An Entity can have inherit attributes from other Entities by passing the as args.
 * If Entity args have the same properties, the later one overwrites the earlier one.
 * This comes with a responsibility to be diligent in being as detailed with the 
 * attributes as possible. As well, be careful when modifying attributes after
 * they are set.
 * 
 * Once an Entity should be removed from the game, set isDead to true
 * Each Entity should have a property called type<EntityName> set to true.
 */
function Entity(/*attribute templates*/) {
    this.getState = function() {
        console.log("TODO: implement update!!!");
    };
    this.update = function(delta, game) {
        console.log("TODO: implement update!!!");
        // This function has two purposes:
        // 1. Update the state of this Entity
        // 2. Queue an action to the Game to be applied after all Entities 
        //    have had a chance to update by returning a callback function.
        //    Per design, this function should not modify the Game directly,
        //    instead through the use of the callback function (i.e. 'game'
        //    and 'entities' should be treated as readonly within this function).
    };
    this.getOwner = function() {
        console.log("TODO: implement update!!!");
    };

    let id = u.guid();
    this.getId = function() {
        return id;
    };

    this.isDead = false;

    // Put this at the end of this function so that update() gets assigned 
    // along with other properties
    Object.assign(this, ...arguments);
}

// Set owner of the entity
function tagEntity(owner, entity) {
    entity.getOwner = function() {
        return owner;
    }

    return entity;
}

module.exports = {
    Entity:Entity,
    tagEntity:tagEntity
}