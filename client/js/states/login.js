var username = 'user' + Date.now();
var instanceAuth = '';

GameStates.LOGIN = function(game) {};

GameStates.LOGIN.prototype = {
    init: function() {
        console.log('login init called');
        game.stage.backgroundColor = '#182d3b';

        var text = addText(game.world.centerX, game.world.centerY, "- Game Title -\nGame Subtitle");
        var button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 1, 1, 0);

            
        socket.on('loginSuccess', function(ret) {
            instanceAuth = ret.instanceAuth;
            console.log(instanceAuth);
            game.state.start('lobby');
        });

        function actionOnClick() {
            socket.emit('login', {
                username: username
            });
        };
    },
    update: function() {
    },
    render: function() {
    }
};
