var util = require('./util.js')

/**
 * A Lobby is a logical grouping of players. Responsible for:
 * - knowing which players belong in this group
 * - keeping track of the chat log shared between the players in this group
 */ 
function Lobby(name, pUsers) {
    let users = (pUsers == undefined ? [] : pUsers);
    
    this.name = name;

    /**
     * Return a out action if applicable
     * @param {*} action 
     */
    this.handleUserAction = function(action) {
        switch(action.type) {
            case 'join':
                if(!users.includes(action.username)) {
                    users.push(action.username);
                } else {
                    return {
                        type: 'joinFail'
                    };
                }
                break;
            case 'chatMessage':            
                if(users.includes(action.username)) {
                    return {
                        type: 'chatBroadcast',
                        message: action.username + ': ' + action.message,
                        users: users
                    };
                }
                break;
            case 'disconnect':
                users.splice(users.indexOf(action.username, 1));
                break;
            default:
                console.log('Error applying action in lobby...');
                break;
        }
    };
}

module.exports = {
    Lobby:Lobby
}