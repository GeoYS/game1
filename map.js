/**
 * The Map object is used to map entities on a grid.
 * At each point in the grid is a table if Entites with the 
 * keys being the Entity's id.
 * 
 * @param {*} tilesWide 
 * @param {*} tilesHigh 
 * @param {*} tileWidthInPixels 
 * @param {*} tileHeightInPixels 
 */
function Map(tilesWide, tilesHigh, tileWidthInPixels, tileHeightInPixels) {
    let self = this;
    self.grid = {};

    // Stores the last position of each Entity (<id>:<position>)
    let lastPosition = {};

    // Create grid
    for(let i = 0; i < tilesHigh; i++) {
        self.grid[i] = {};
        for(let j = 0; j < tilesWide; j++) {
            self.grid[i][j] = {};
        }
    }

    /**
     * Params x and y in pixels
     */
    this.entitiesAt = function(x,y) {
        let tileX = Math.floor(x / tileWidthInPixels);
        let tileY = Math.floor(y / tileHeightInPixels);

        return self.grid[tileX][tileY];
    };

    /**
     * Params x and y in pixels
     */
    this.updateEntity = function(entity) {
        let tileX = Math.floor(entity.x / tileWidthInPixels);
        let tileY = Math.floor(entity.y / tileHeightInPixels);

        // Update position if not dead, otherwise cleanup references
        if(!entity.isDead) {
            let lp = lastPosition[entity.getId()];

            // Undefined case is the first update for an Entity
            if(lp != undefined) {
                self.grid[lp.x][lp.y][entity.getId()] = undefined;
                delete self.grid[lp.x][lp.y][entity.getId()];
            }
            
            self.grid[tileX][tileY][entity.getId()] = entity;
            lastPosition[entity.getId()] = {x: tileX, y: tileY};
        } else {
            lastPosition[entity.getId()] = undefined;
            delete lastPosition[entity.getId()];
        }
    };

    this.update = function(entities) {
        entities.forEach(function(e){
            if (e.typePositionable) {
                self.updateEntity(e);
            }
        });
    };
}

module.exports = {
    Map:Map
}