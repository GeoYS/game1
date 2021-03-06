var e = require('../entity.js');
var g = require('../game.js');
var lm = require('../lobbyManager.js');
var um = require('../userManager.js');
var l = require('../lobby.js');
var ie = require('../designImpl/ingameEntities.js');

this.runTests = function() {
    initTests();
    tests.forEach(function(testFn) {
        testFn();
    })
}

let tests = [];

let initTests = function() {
    tests.push(
        /**
         * Test lobby.js
         */
        function() {
            let testLobby = new l.Lobby('test', ['testUser1']);
            let ret = testLobby.handleUserAction({
                type: 'join',
                username: 'testUser1'
            });
            test('Lobby init', testLobby.name == 'test');
            test('Lobby dupe', ret != undefined && 
                    ret.type == 'joinFail');

            ret = testLobby.handleUserAction({
                type: 'join',
                username: 'testUser2'
            });
            test('Lobby join', ret != undefined &&
                ret.type == 'joinSuccess');

            ret = testLobby.handleUserAction({
                type: 'chatMessage',
                username: 'testUser2',
                message: 'message'
            });
            test('Lobby chat', ret != undefined &&
                    ret.message == 'testUser2: message' &&
                    ret.users.length == 2 &&
                    ret.users[0] == 'testUser1' &&
                    ret.users[1] == 'testUser2');

            ret = testLobby.handleUserAction({
                type: 'disconnect',
                username: 'testUser2'
            });
            test('Lobby disconnect ret', ret == undefined);
            ret = testLobby.handleUserAction({
                type: 'chatMessage',
                username: 'testUser1',
                message: 'message'
            });
            test('Lobby chat after disconnect', ret != undefined &&
                    ret.message == 'testUser1: message' &&
                    ret.users.length == 1 &&
                    ret.users[0] == 'testUser1');
        },
        
        /**
         * Test lobbyManager.js
         */
        function() {
            let lobbyManager = new lm.LobbyManager();
            
            let ret = lobbyManager.newLobby('testLobby', ['user1']);

            ret = lobbyManager.handleUserAction({
                type: 'join',
                lobbyName: 'testLobby',
                username: 'user2'
            });
            test('LobbyManager create and join success', ret !== undefined &&
                ret.type == 'joinSuccess');

            ret = lobbyManager.handleUserAction({
                type: 'join',
                lobbyName: 'testLobby2',
                username: 'user1'
            });
            test('LobbyManager join fail, lobby non-existant', ret !== undefined &&
                ret.type == 'fail');

            ret = lobbyManager.handleUserAction({
                type: 'ready',
                lobbyName: 'testLobby',
                username: 'user1'
            });
            test('LobbyManager ready success',  ret !== undefined &&
                ret.type == 'readySuccess');

            ret = lobbyManager.handleUserAction({
                type: 'start',
                lobbyName: 'testLobby',
                username: 'user1'
            });
            test('LobbyManager start fail',  ret !== undefined &&
                ret.type == 'startFail');
            
            ret = lobbyManager.handleUserAction({
                type: 'ready',
                lobbyName: 'testLobby',
                username: 'user2'
            });
            ret = lobbyManager.handleUserAction({
                type: 'start',
                lobbyName: 'testLobby',
                username: 'user1'
            });
            test('LobbyManager start success',  ret !== undefined &&
                ret.type == 'startSuccess' &&
                ret.users.length === 2 &&
                ret.users[0] == 'user1' &&
                ret.users[1] == 'user2');
        },

        /**
         * Test userManager.js
         */
        function() {
            let testUserManager = new um.UserManager();
            let ret = testUserManager.handleUserAction({
                type: 'login',
                username: 'test'
            });
            test("UserManager first login", ret != undefined &&
                    ret.type === 'loginSuccess' &&
                    ret.instanceAuth != undefined);

            ret = testUserManager.handleUserAction({
                type: 'login',
                username: 'test'
            });
            test("UserManager dupe login", ret != undefined &&
                    ret.type === 'loginFail' &&
                    ret.instanceAuth == undefined &&
                    ret.message != undefined);

            ret = testUserManager.handleUserAction({
                type: 'disconnect',
                username: 'test'
            });
            test("UserManager disconnect", ret == undefined);

            ret = testUserManager.handleUserAction({
                type: 'login',
                username: 'test'
            });
            test("UserManager first login", ret != undefined &&
                    ret.type === 'loginSuccess' &&
                    ret.instanceAuth != undefined);
        },

        /**
         * Test entity.js
         */
        function() {
            let testTemplate = {isDead: false, hitpoints: 705};
            let entity = new e.Entity(testTemplate);
            test("Entity attributes", Object.keys(entity).length === 6);
            test("Entity init", entity.isDead === false &&
                    entity.hitpoints === 705);

            let testTemplate2 = {testAttr: false};
            let entity2 = new e.Entity(entity, testTemplate2);
            test("Entity clone attributes", Object.keys(entity2).length === 7);
            test("Entity clone init", entity2.isDead === false &&
                    entity2.hitpoints === 705 &&
                    entity2.testAttr === false);
                    
            let testPositionable = ie.Positionable(0, 0);
            testPositionable.xVel = 7;
            testPositionable.yVel = 8;
            e.tagEntity("testUser", testPositionable);
            test("Entity Positionable", testPositionable.x === 0 &&
                    testPositionable.y === 0 &&
                    testPositionable.xVel === 7 &&
                    testPositionable.yVel === 8 &&
                    testPositionable.getOwner() === "testUser");
        },

        /**
         * Test game.js
         */
        function() {
            let gameInfo = {width: 100, height:200, tilesWide:100, tilesHigh:200};
            let game = new g.Game(gameInfo);
            test("Game init", game.width === 100 &&
                    game.height === 200 &&
                    game.isFinished === false);

            let testEntityTemplate = {
                isDead: false,
                delta: 0,
                update: function(delta, game) {
                    this.delta = delta;
                    this.isDead = true;
                }
            };
            let testEntity = new e.Entity(testEntityTemplate);
            entities = game.getUserSnapshot(/*TODO*/);
            test("Game getUserSnapshot", entities.length === 0)

            game.addEntity(testEntity);
            test("Game addEntity", entities.length === 1 &&
                    entities[0].isDead === false &&
                    entities[0].delta === 0);

            game.update(123);
            test("Game update", testEntity.isDead === true &&
                    testEntity.delta === 123 &&
                    entities.length === 0);
            
            let testPositionable = ie.Positionable(0, 0);
            testPositionable.xVel = 7;
            testPositionable.yVel = 8;

            game.addEntity(testPositionable);
            game.update(1000);
            test("Game Positionable", testPositionable.x === 7 &&
                    testPositionable.y === 8 &&
                    entities.length === 1);       

            test("Game Map", game.map.grid[7][8][testPositionable.getId()] === testPositionable);

            game.update(1000);
            test("Game Map update remove", game.map.grid[7][8][testPositionable.getId()] === undefined);
            test("Game Map update move", game.map.grid[14][16][testPositionable.getId()] === testPositionable);

        }
    );
};

let test = function(descriptor, testPassed) {
    if(testPassed) {
        console.log('PASSED: ' + descriptor);
    } else {
        console.log('FAILED: ' + descriptor);
    }
};