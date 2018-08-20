class HealthBar {}

HealthBar.prototype.constructor = function( parent ) {
        this.drawContainer( parent );
        this.drawHealth();
}

HealthBar.prototype.drawContainer = function( parent ) {
        // TODO: use game.add.graphics and draw a filled rectangle
        // Use grpahics.alignTo to align to the parent sprite

}

HealthBar.prototype.drawHealth = function() {

}

HealthBar.prototype.updateHealth = function( healthPercent ) {

}
