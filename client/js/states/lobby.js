var lobbyName = '';

GameStates.LOBBY = function(game) {};

GameStates.LOBBY.prototype = {
    init: function() {
        game.stage.backgroundColor = '#12c23f';

        var text = addText(game.world.centerX, game.world.centerY, "- Game Lobby -\nQueue, see online friends,\nand chat");
        var button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 1, 1, 0);
        
        socket.on('createLobby', function(ret) {
            lobbyName = ret;
            console.log('lobbyName: ' + ret);
            game.state.start('pregame');
        });

        function actionOnClick() {
            console.log('createlobby');
            socket.emit('createLobby', {
                username: username,
                instanceAuth: instanceAuth
            });
        };
    },
    update: function() {
    },
    render: function() {
    }
};
