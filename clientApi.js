// Validate user login credentials against DB
// - request: username, pass
// - response: valid
function validateLogin(req, server) {
    // TODO: check against DB
    
    if (req.username == 'test') {
        if (req.pass == 'pass' ) {
            var res = {valid: true};
            
            return res;
        }
    }
}

// Get list of user's friends from DB
// - request: username
// - response: numFriends, friends
function getOnlineFriends(req, server) {
    var res = {numFriends: 1, friends: ['Bob']};
    
    return res;
}

function createParty(req, server) {
    
}

function leaveParty(req, server) {
    
}

function joinQueue(req, server) {
    
}

function leaveQueue(req, server) {
    
}

function updateQueueState(req, server) {
    
}

function createCustomGame(req, server) {
    
}

function joinCustomGame(req, server) {
    
}

function postChat(req, server) {
    
}

function updateChat(req, server) {
    
}

function getUserCards(req, server) {
    
}

function getUserDecks(req, server) {
    
}

function saveDeck(req, server) {
    
}

function updatePreGame(req, server) {
    
}

function updateGame(req, server) {
    
}

// path: function
this.functions = {
                '/validateLogin': validateLogin,
                '/getOnlineFriends': getOnlineFriends,
                '/createParty': createParty,
                '/leaveParty': leaveParty,

                '/joinQueue': joinQueue,
                '/leaveQueue': leaveQueue,
                '/updateQueueState': updateQueueState,
                
                '/createCustomGame': createCustomGame,
                '/joinCustomGame': joinCustomGame,
                
                '/postChat': postChat,
                '/updateChat': updateChat,
                '/getUserCards': getUserCards,
                '/getUserDecks': getUserDecks,
                '/saveDeck': saveDeck,
                
                '/updatePreGame': updatePreGame,
                '/updateGame': updateGame
                }