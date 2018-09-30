/**
 * The UserManager is responsible for user authentication and managing
 * User objects.
 */
function UserManager() {
    this.onlineUsers = [];

    /**
     * Handle user action. Probably either user logging in, 
     * disconnecting, fetching user infor, or changing a setting.
     * @param {*} action 
     */
    this.handleUserAction = function(action) {
        // Return out action
    }
}

module.exports = {
    UserManager: UserManager
}