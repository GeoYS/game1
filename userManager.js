var util = require('./util.js');

/**
 * The UserManager is responsible for user authentication and managing
 * User objects.
 */
function UserManager() {
    let onlineUsers = {};

    /**
     * Handle user action. Probably either user logging in, 
     * disconnecting, fetching user info, or changing a setting.
     * Can return an out action.
     * @param {*} action 
     */
    this.handleUserAction = function(action) {
        switch(action.type) {
            case 'login':
                if(onlineUsers[action.username]) {
                    return {
                        type: 'loginFail',
                        message: 'User is already logged in...'
                    };
                } else {
                    userId = util.guid();
                    onlineUsers[action.username] = {
                        online: true,
                        id: userId
                    };
                    return {
                        type: 'loginSuccess',
                        instanceAuth: userId
                    };
                }
            case 'disconnect':
                delete onlineUsers[action.username];
                break;
            default: 
                return {
                    Error: 'Could not handle user action ' + action.type + ' in UserManager...'
                };
        }
    }
}

module.exports = {
    UserManager: UserManager
}