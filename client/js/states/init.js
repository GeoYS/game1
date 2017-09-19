var GameStates = {};

GameStates.INIT = function(game){
};

GameStates.INIT.prototype = {
    init: function () {
        //Put game configuration variables here
        this.game.physics.startSystem( Phaser.Physics.ARCADE );
    },
    create: function () {

        this.state.start('load_assets');

    }
};
