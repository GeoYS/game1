// Validate user login credentials against DB
// - request: username, pass
// - response: valid
function validateLogin(req) {
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
function getOnlineFriends(req) {
    var res = {numFriends: 1, friends: ['Bob']};
    
    return res;
}

function createParty(req) {
    
}

function leaveParty(req) {
    
}

function joinQueue(req) {
    
}

function leaveQueue(req) {
    
}

function updateQueueState(req) {
    
}

function createCustomGame(req) {
    
}

function joinCustomGame(req) {
    
}

function postChat(req) {
    
}

function updateChat(req) {
    
}

function getUserCards(req) {
    
}

function getUserDecks(req) {
    
}

function saveDeck(req) {
    
}

function updatePreGame(req) {
    
}

function updateGame(req) {
    
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