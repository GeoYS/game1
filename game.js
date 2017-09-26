/*
 * A Game represents an individual match. Several Games can be happening at once.
 * Contains all the logic, including unit updating, applying user actions, etc.
 *
 */ 
function Game(width, height) {
    var units = [];
    
    this.width = width;
    this.height = height;
    
    this.update = function(delta) {
        units.forEach(function(unit, i){
            unit.update(unit);
        });
    };
    
    /*
     * Handle user action. E.g. user moving a unit, using a card,
     * client request to update game info, etc.
     * Type of actione should be specified by action.type
     */
    this.handleUserAction = function (action) {
        
    };
    
    this.addUnit = function(unit) {
        units.push(unit);
    };
}