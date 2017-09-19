GameStates.LOGIN = funcion(game){};

GameStates.LOGIN.prototype = {
    init: function() {
        console.log('login init called');
        game.stage.backgroundColor = '#182d3b';

        var text = game.add.text(game.world.centerX, game.world.centerY, "- Game Title -\nGame Subtitle");
        text.anchor.setTo(0.5);

        text.font = 'Revalia';
        text.fontSize = 60;

        var actionOnClick = function() {
            game.scale.startFullScreen(false);
            changeScreen(lobby);
        };

        var button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 1, 1, 0);
    },
    update: function() {
    },
    render: function() {
    }
};
