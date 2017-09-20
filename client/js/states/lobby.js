GameStates.LOBBY = function(game) {};

GameStates.LOBBY.prototype = {
    init: function() {
        game.stage.backgroundColor = '#12c23f';

        var text = addText(game.world.centerX, game.world.centerY, "- Game Lobby -\nQueue, see online friends,\nand chat");
        var button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 1, 1, 0);

        function actionOnClick() {
            this.state.start('pregame');
        };
    },
    update: function() {
    },
    render: function() {
    }
};
