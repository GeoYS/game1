/*************************************************************
 * The Server object is the first layer of abstraction. It is
 * responsible for managing socket connections, handling 
 * incoming and broadcasting outgoing socket events, and 
 * calling the update loop of the GameManager.
 *************************************************************/

var gm = require('./gameManager.js');
var lm = require('./lobbyManager.js');
var um = require('./userManager.js');

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

        for(let user in outAction.users) {
            userSocketTable[user].broadcast.emit('chatMessage', {
                lobbyName: info.lobbyName,
                message: outAction.message
            });
        }
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
         
        lobbyManager.handleUserAction({
            type: 'join',
            lobbyName: lobbyName
        });
        socket.broadcast.emit('joinGameLobby', lobbyName);
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