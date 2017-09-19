GameStates.LOAD_ASSETS = function(game ) {};

GameStates.LOAD_ASSETS.prototype = {
    preload: function () {
        game.load.tilemap('map', 'assets/test.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('groundts', 'assets/ts_ground.png');
        game.load.image('placeholder', 'assets/placeholder.png');
        game.load.image('placeholder2', 'assets/placeholder2.png');
        game.load.spritesheet('tree', 'assets/tree.png', 64, 128);
        game.load.spritesheet('button', 'assets/button.png', 128, 64);

        WebFontConfig = {

            //  'active' means all requested fonts have finished loading
            //  We set a 1 second delay before calling 'createText'.
            //  For some reason if we don't the browser cannot render the text the first time it's created.
            //active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

            //  The Google Fonts we want to load (specify as many as you like in the array)
            google: {
              families: ['Revalia']
            }

        };

        //  Load the Google WebFont Loader script
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    create: function() {
        this.state.start('login');
    }
};
