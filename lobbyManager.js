var util = require('./util.js')

/**
 * A layer of abstraction between the lobbies and the client events.
 * Handles multiple lobbies that exist. Should:
 * - know which lobbies each player belongs to
 * - process user actions and propagate them to lobby
 */
function LobbyManager() {
    this.lobbies = [];

    // Map user id to list of lobbies they belong to
    this.userLobbies = {};

    this.outActions = [];

    /**
     * Handle user action. Probably either user message incoming, 
     * new user, or user leaving. 
     * @param {*} action 
     */
    this.handleUserAction = function (action) {
        // Propogate action to corresponding lobby. Lobby should return
        // a list of out actions, if any, e.g. send message to other
        // people in lobby.
    };
}

module.exports = {
    LobbyManager: LobbyManager
}