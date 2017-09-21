GameStates.INGAME = function(game) {};

GameStates.INGAME.prototype = {
    init: function() {
        game.stage.backgroundColor = '#454645';

        map = game.add.tilemap('map');
        map.addTilesetImage('ground', 'groundts');
        layer = map.createLayer('groundlayer');
        layer.resizeWorld();

        trees = game.add.group();
        trees.enableBody = true;

        map.createFromObjects('trees', 'tree', 'tree', 0, true, false, trees);
        for (var i = 0; i < trees.children.length; i++) {
            trees.children[i].body.setSize(64, 64, 0, 64);
        }

        player = game.add.sprite(0, 0, 'placeholder');
        game.physics.arcade.enable(player);
        player.containsPoint = function(coord) {
            if (this.x < coord.x && coord.x < this.x + this.width &&
                this.y < coord.y && coord.y < this.y + this.height) {
                return true;
            }
            return false;
        }

        game.camera.follow(player);

        game.input.mouse.capture = true;
        //game.input.onTap.add(onTap, this);

        activePointer = game.input.activePointer;
    },

    update: function() {
        if (startDrag === null) {
            if (activePointer.leftButton.isDown) {
                startDrag = {x: activePointer.x, y: activePointer.y};
            }
        }

        if (startDrag !== null) {
            if (!activePointer.leftButton.isDown) {
                // Tap/click
                if (game.math.distance(startDrag.x, startDrag.y, activePointer.x, activePointer.y) < 10) {
                    onTap(activePointer, false);
                }
                // Drag
                else {
                console.log("x: " + startDrag.x + " y: " + startDrag.y);
                    onDrag(startDrag.x, startDrag.y, activePointer.x, activePointer.y);
                }
                startDrag = null;
            }
        }

        if (target && player.body.hitTest(target.x, target.y)) {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            target = null;
        }

        syncState();
    },

    render: function() {
        game.debug.text("Players online: " + state.playersOnline, 300, 114);
        game.debug.text("Pointer x: " + activePointer.x + " y: " + activePointer.y, 300, 132);
        game.debug.text("Player x: " + player.x + " y: " + player.y, 300, 150);
        game.debug.text("Player.body x: " + player.body.x + " y: " + player.body.y, 300, 168);
        game.debug.text("Player.body.velocity x: " + player.body.x + " y: " + player.body.y, 300, 186);
        game.debug.text("Target x: " + (target ? target.x : 0) + " y: " + (target ? target.y : 0), 300, 204);
        game.debug.text("Left button down: " + activePointer.leftButton.isDown, 300, 222);
        game.debug.text("StartDrag x: " + (startDrag ? startDrag.x : 0) + " y: " + (startDrag ? startDrag.y : 0), 300, 240);
        game.debug.body(player);
        for (var i = 0; i < trees.children.length; i++) {
            game.debug.body(trees.children[i]);
        }
    }
};

var player;
var activePointer;
var startDrag = null;
var target = null;
var vel = 200;

function screenToWorld(sx, sy) {
    var worldCoords = {x: sx + game.camera.x, y: sy + game.camera.y};
    return worldCoords;
}

function onTap(pointer, doubleTap) {
    if (!player.selected) {
        if (player.containsPoint(screenToWorld(pointer.x, pointer.y))) {
            player.selected = true;
            player.loadTexture('placeholder2');
        }
    } else {
        if (!(player.containsPoint(screenToWorld(pointer.x, pointer.y)))) {
            player.selected = false;
            player.loadTexture('placeholder');
        } else {
            target = null;
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
        }
    }
}

function onDrag(sX, sY, eX,eY) {
    if (player.selected) {
        if (player.containsPoint(screenToWorld(sX, sY))) {
            target = screenToWorld(eX, eY);
            var angle = game.math.angleBetweenPoints(new Phaser.Point(sX, sY), new Phaser.Point(eX, eY));

            player.body.velocity.x = Math.cos(angle) * vel;
            player.body.velocity.y = Math.sin(angle) * vel;
        }
    }
}
