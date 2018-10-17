var util = require('./util.js')
var l = require('./lobby.js');

/**
 * A layer of abstraction between the lobbies and the client events.
 * Handles multiple lobbies that exist. Should:
 * - know which lobbies each player belongs to
 * - process user actions and propagate them to lobby
 */
function LobbyManager() {
    let lobbies = {};

    // Map username to list of lobbies they belong to
    let userLobbyTable = {};

    this.newLobby = function(name, players) {
        if(lobbies[name] != undefined) {
            return {error: 'Lobby name already exists.'};
        }

        let lobby = new l.Lobby(name, players);

        lobbies[name] = lobby;

        if(players != undefined) {
            players.forEach(function(player) {
                if(userLobbyTable[player] != undefined) {
                    userLobbyTable[player].push(lobby);
                }
            });
        }
    };

    /**
     * Handle user action. Probably either user message incoming, 
     * new user, or user leaving. 
     * (Impl note: Propogate action to corresponding lobby. Lobby should return
     * a list of out actions, if any, e.g. send message to other
     * people in lobby.)
     * @param {*} action 
     */
    this.handleUserAction = function (action) {
        switch(action.type) {
            case 'join':
            case 'ready':
            case 'start':
            case 'chatMessage':
                if(lobbies[action.lobbyName] === undefined) {
                    if(debug) {
                        console.log('Error applying action in lobby...');
                    }
                    return {
                        type: 'fail',
                        message: 'Lobby does not exist...'
                    };
                }
                return lobbies[action.lobbyName].handleUserAction(action);
            case 'disconnect':
                userLobbyTable[action.username].forEach(function(lobby) {
                    lobby.handleUserAction(action);
                });
                break;
            default:
                if(debug) {
                    console.log('Error applying action in lobby...');
                }
                break;
        }
    };
}

module.exports = {
    LobbyManager: LobbyManager
}