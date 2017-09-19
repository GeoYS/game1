GameStates.LOBBY = funcion(game) {};

GameStates.LOBBY.prototype = {
    init: function() {
        game.stage.backgroundColor = '#12c23f';

        var text = game.add.text(game.world.centerX, game.world.centerY, "- Game Lobby -\nQueue, see online friends,\nand chat");
        text.anchor.setTo(0.5);

        text.font = 'Revalia';
        text.fontSize = 60;

        var actionOnClick = function() {
            this.state.start('pregame');
        };

        var button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 1, 1, 0);
    },
    update: function() {
    },
    render: function() {
    }
};
