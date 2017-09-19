GameStates.PREGAME = funcion(game) {};

GameStates.PREGAME.prototype = {
    init: function() {
        game.stage.backgroundColor = '#8a6c31';

        var text = game.add.text(game.world.centerX, game.world.centerY, "- Pre-Game -\nSelect deck and chat");
        text.anchor.setTo(0.5);

        text.font = 'Revalia';
        text.fontSize = 60;

        var actionOnClick = function() {
            this.state.start('ingame');
        };

        var button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 1, 1, 0);
    },
    update: function() {
    },
    render: function() {
    }
};
