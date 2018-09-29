/*************************************************************
 * The Server object is the first layer of abstraction. It is
 * responsible for managing socket connections, handling 
 * incoming and broadcasting outgoing socket events, and 
 * calling the update loop of the GameManager.
 *************************************************************/

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

let gameManager = new GameManager();
let lobbyManager = new LobbyManager();
let userManager = new UserManager();
