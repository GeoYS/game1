var GameStates = {};

GameStates.INIT = function(game) {};

GameStates.INIT.prototype = {
    init: function () {
        //Put game configuration variables here
        this.game.physics.startSystem( Phaser.Physics.ARCADE );
        game.physics.arcade.gravity.y = 0;
        game.scale.startFullScreen(false);
    },
    create: function () {

        this.state.start('load_assets');

    }
};
