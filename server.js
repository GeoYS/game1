/*************************************************************
 * The Server object is the first layer of abstraction. It is
 * responsible for managing socket connections, handling 
 * incoming and broadcasting outgoing socket events, and 
 * calling the update loop of the GameManager.
 *************************************************************/

var gm = require('./gameManager.js');
var lm = require('./lobbyManager.js');
var um = require('./userManager.js');

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

};

let gameManager = new gm.GameManager();
let lobbyManager = new lm.LobbyManager();
let userManager = new um.UserManager();
