/*
 * A Unit represents an entity in a Game that can be interacted with.
 * E.g. hero, tower, tree, etc.
 */
function Unit(game, x, y, type) {
    this.game = game;
    this.pos = {x: x, y: y};
    this.type = type;    
    
    this.update = function(delta) {
        
    };
}