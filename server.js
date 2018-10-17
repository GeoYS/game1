/*************************************************************
 * The Server object is the first layer of abstraction. It is
 * responsible for managing socket connections, handling 
 * incoming and broadcasting outgoing socket events, and 
 * calling the update loop of the GameManager.
 *************************************************************/

var gm = require('./gameManager.js');
var lm = require('./lobbyManager.js');
var um = require('./userManager.js');

// user id maps to socket
let userSocketTable = {};
let io = null;

/**
 * Init things like a global lobby.
 */
this.init = function(socketIO) {
    lobbyManager.newLobby('global');
    io = socketIO;
};

/**
 * The update loop.
 * @param {Number} delta - Time since last update in milliseconds
 */
this.update = function(delta) {
};

/**
 * Called whenever socket.io gets a new connection.
 * @param {Socket} socket 
 */
this.newConnection = function(socket) {
    socket.on('login', function(info) {
        let ret = userManager.handleUserAction({
            type:'login',
            username:info.username
        });
        if(ret != null) {
            if(ret.type === 'loginSuccess') {
                userSocketTable[ret.instanceAuth] = socket;
                lobbyManager.handleUserAction({
                    type: 'join',
                    lobbyName: 'global'
                });
            }
            socket.emit(ret.type, ret);
        }
    });
    socket.on('chatMessage', function(info) {
        if(!userManager.auth(info.username, info.instanceAuth)) {
            // Uh oh
            return;
        }

        let outAction = lobbyManager.handleUserAction({
            type:'chatMessage',
            username:info.username,
            lobbyName: info.lobbyName,
            message: info.message
        });

        outAction.users.forEach(function(user) {
            userSocketTable[user].broadcast.emit('chatMessage', {
                lobbyName: info.lobbyName,
                message: outAction.message
            });
        });
    });
    socket.on('createLobby', function(info) {
        if(!userManager.auth(info.username, info.instanceAuth)) {
            // Uh oh
            return;
        }

        if( typeof this.newLobbyCounter == 'undefined' ) {
            this.newLobbyCounter = 0;
        }
        this.newLobbyCounter++;

        let newLobbyName = 'lobby' + this.newLobbyCount;
        lobbyManager.newLobby(newLobbyName, [info.username]);
        socket.broadcast.emit('joinGameLobby', newLobbyName);
    });    
    socket.on('joinLobby', function(info) {
        if(!userManager.auth(info.username, info.instanceAuth)) {
            // Uh oh
            return;
        }

        let lobbyName = info.lobbyName;
         
        let ret = lobbyManager.handleUserAction({
            type: 'join',
            lobbyName: lobbyName,
            username: info.username
        });

        if(ret.type == 'joinFail') {
            socket.broadcast.emit('joinLobbyFail', lobbyName);   
        } else {
            socket.broadcast.emit('joinedLobby', lobbyName);
        }
    });
    socket.on('gameReady', function(info) {
        if(!userManager.auth(info.username, info.instanceAuth)) {
            // Uh oh
            return;
        }

        let lobbyName = info.lobbyName;

        let ret = lobbyManager.handleUserAction({
            type: 'ready',
            lobbyName: info.lobbyName,
            username: info.username
        });

        if(ret.type == 'readyFail') {
            socket.broadcast.emit('gameReadyFail', lobbyName);   
        } else {
            socket.broadcast.emit('gameReady', lobbyName);
        }
    });
    socket.on('gameStart', function(info) {
        if(!userManager.auth(info.username, info.instanceAuth)) {
            // Uh oh
            return;
        }

        let lobbyName = info.lobbyName;

        let ret = lobbyManager.handleUserAction({
            type: 'start',
            lobbyName: info.lobbyName,
            username: info.username
        });

        if(ret.type == 'startFail') {
            socket.broadcast.emit('gameStartFail', lobbyName);   
        } else {
            gameManager.newGame(ret);
            ret.users.forEach(function (username){
                let userId = userManager.nameToId(userName);
                userSocketTable[userId].broadcast.emit('gameStart', lobbyName);
            });
            socket.broadcast.emit('gameStart', lobbyName);
        }
    });
    socket.on('disconnect', function(info) {
        if(userManager.auth(info.username, info.instanceAuth)) {
            // Uh oh
            return;
        }

        userManager.handleUserAction({
            type:'disconnect',
            username:info.username
        });
        lobbyManager.handleUserAction({
            type:'disconnect',
            username:info.username
        });        
        gameManager.handleUserAction({
            type:'disconnect',
            username:info.username
        });
        delete userSocketTable[info.instanceAuth];
    });
};

let gameManager = new gm.GameManager();
let lobbyManager = new lm.LobbyManager();
let userManager = new um.UserManager();