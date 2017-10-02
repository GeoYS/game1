var util = require('./util.js')

/*
 * A Game represents an individual match. Several Games can be happening at once.
 * Contains all the logic, including unit updating, applying user actions, etc.
 *
 */ 
function Game(width, height) {
    this.units = [];
    
    this.width = width;
    this.height = height;
    this.isFinished = false;
    
    this.update = function(delta) {
        units.forEach(function(unit, i){
            unit.update(delta);
        });
        
        util.removeDead(units, 'isDead');
    };
    
    this.addUnit = function(unit) {
        units.push(unit);
    };
}