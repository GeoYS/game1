/*
Screen

/* TODO: Migrate this to a suitable file, since screens.js is deprecated */

var trees;
var state = {playersOnline: 0};
var sessionId = guid();

console.log(sessionId);

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

function syncState() {
    $.post( "/syncClient", { playerId: sessionId }, function( data ) {
      state.playersOnline = data.playersOnline;
    });
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
