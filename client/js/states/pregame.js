GameStates.PREGAME = function(game) {};

GameStates.PREGAME.prototype = {
    init: function() {
        game.stage.backgroundColor = '#8a6c31';

        var text = addText(game.world.centerX, game.world.centerY, "- Pre-Game -\nSelect deck and chat");
        var button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 1, 1, 0);

        function actionOnClick() {
            this.state.start('ingame');
        };
    },
    update: function() {
    },
    render: function() {
    }
};
