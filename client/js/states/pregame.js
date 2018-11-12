GameStates.PREGAME = function(game) {};

GameStates.PREGAME.prototype = {
    init: function() {
        game.stage.backgroundColor = '#8a6c31';

        var text = addText(game.world.centerX, game.world.centerY, "- Pre-Game -\nSelect deck and chat");
        var button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 1, 1, 0);

        socket.on('gameReady', function(ret) {
            socket.emit('gameStart', {
                username: username,
                instanceAuth: instanceAuth,
                lobbyName: lobbyName
            });
        });
        socket.on('gameReadyFail', function(ret) {
            console.log('gameReadyFail');
        });

        socket.on('gameStart', function(ret) {
            game.state.start('ingame');
        });
        socket.on('gameStartFail', function(ret) {
            console.log('gameReadyFail');
        });
        
        function actionOnClick() {
            socket.emit('gameReady', {
                username: username,
                instanceAuth: instanceAuth,
                lobbyName: lobbyName
            });
        };
    },
    update: function() {
    },
    render: function() {
    }
};
