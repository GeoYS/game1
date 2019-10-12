var e = require('../entity.js');

function Positionable(x = 0, y = 0) {
    let positionable = new e.Entity();

    positionable.typePositionable = true;

    positionable.x = x;
    positionable.y = y;

    positionable.xVel = 0;
    positionable.yVel = 0;

    positionable.updatePositionable = function(delta) {
        this.x += delta/1000 * this.xVel;
        this.y += delta/1000 * this.yVel;
    };

    positionable.update = function(delta, game) {
        this.updatePositionable(delta);
    };

    return positionable;
}
var prototypePositionable = Positionable();

function TestUnit(x = 0, y = 0) {
    let testUnit = new e.Entity(Positionable(x, y));

    testUnit.typeTestUnit = true;

    testUnit.x = x;
    testUnit.y = y;
    testUnit.yVel = 10;

    let timer = 0;

    testUnit.getState = function() {
        return {x: testUnit.x, y: testUnit.y};
    };

    testUnit.update = function(delta, game) {
        if (timer > 1000) {
            timer = 0;
            this.yVel = -this.yVel;
        } else {
            timer += delta;
        }

        this.updatePositionable(delta);
    };

    return testUnit;
}
var prototypeTestUnit = TestUnit();

module.exports = {
    Positionable:Positionable,
    TestUnit:TestUnit
}