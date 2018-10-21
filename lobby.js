var util = require('./util.js')

/**
 * A Lobby is a logical grouping of players. Responsible for:
 * - knowing which players belong in this group
 * - keeping track of the chat log shared between the players in this group
 */ 
function Lobby(name, pUsers) {
    let users = {};
    
    if(pUsers !== undefined) {
        pUsers.forEach(function(user) {
            users[user] = {ready: false};
        });
    }

    this.name = name;

    /**
     * Return a out action if applicable
     * @param {*} action 
     */
    this.handleUserAction = function(action) {
        switch(action.type) {
            case 'join':
                if(users[action.username] !== undefined) {
                    return {
                        type: 'joinFail'
                    };
                }
                users[action.username] = {ready: false};
                return {
                    type: 'joinSuccess'
                };
            case 'ready':
                if(users[action.username] === undefined) {
                    return {
                        type: 'readyFail'
                    };
                }
                users[action.username].ready = true;
                return {
                    type: 'readySuccess'
                };
            case 'start':
                let allReady = true;
                let usernames = Object.keys(users);
                
                usernames.forEach(function(key) {
                    if(users[key].ready == false) {
                        allReady = false;
                    }
                });

                if(!allReady) {
                    return {
                        type: 'startFail'
                    };
                }

                return {
                    type: 'startSuccess',
                    users: usernames
                };
            case 'chatMessage':            
                if(users[action.username] !== undefined) {
                    return {
                        type: 'chatBroadcast',
                        message: action.username + ': ' + action.message,
                        users: Object.keys(users)
                    };
                }
                break;
            case 'disconnect':
                delete users[action.username];
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