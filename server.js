var express = require('express');
var bodyParser = require('body-parser');
var clientApi = require('./clientApi.js');
var app = express();
var port = 4545;

// To serve web client files
app.use(express.static(__dirname));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/syncClient', function(req, res) { // Test purposes
    var clientSyncReq = req.body;
    var syncRes;
    
    syncRes = processStateForSync(clientSyncReq);
    
    res.send(syncRes);
});

Object.keys(clientApi.functions).forEach(function(key, index) {
    app.post(key, function(req, res) {
        var syncRes;
        
        heartbeat(req.body.heartbeat);
        syncRes = clientApi.functions[key](req.body.data);
        
        res.send(syncRes);
    });
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + ' !')
});

// Main loop vars
const TARGET_DELTA = 1000/60;
var lastUpdate = Date.now();

// Main loop
setInterval(function() {
    var currTime = Date.now();
    var delta = currTime - lastUpdate;
    
    lastUpdate = currTime;
    validateClientActions();
    updateState(delta);
}, TARGET_DELTA);

// Game state
var state = {players: [], lastSync: {}};
// Client actions
var validatedClientActions = [];
var clientActionQueue = [];

function updateState(delta) {
    // game loop
    var currTime = Date.now();
    
    for (var i = 0; i < state.players.length; i ++) {
        var playerId = state.players[i];
        if (currTime - state.lastSync[playerId] > 5000) {
            state.players.splice(i, 1);
        }
    }
}

function validateClientActions() {
    // validate client input
}

function processStateForSync(clientSyncReq) {
    // provide state sync data to client
    var playerId = clientSyncReq.playerId;
    var syncRes = {};
    
    if (!state.players.includes(playerId)) {
        state.players.push(playerId);
    }
    
    state.lastSync[playerId] = Date.now();
    
    syncRes.playersOnline = state.players.length;
    
    return syncRes;
}

// Called every time client calls server. Should refresh the connection info
function heartbeat(data) {
    
}