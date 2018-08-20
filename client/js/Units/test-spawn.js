function initializeButton() {
        game.load.image('test', 'assets/placeholder2.png');
        button = game.add.button(game.world.centerX - 95, 400, 'button', spawnOnClick, this, 2, 1, 0);
}

function spawnOnClick() {
        game.add.sprite(game.world.randomX, game.world.randomY, 'test');
}
