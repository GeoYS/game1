/********************************************************************
 * This is the starting point of the node server. Express is set up,
 * socket.io is set up, and the main loop starts.
 ********************************************************************/

/**
 * Debug flag
 */
global.debug = false;

/**
 * Unit tests
 */
require('./tests/serverTests.js').runTests();

/**
 * Load dependendies
 */

var clientApi = require('./clientApi.js');

var server = require('./server.js');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 4545;

/**
 * Express Setup
 */

// To serve web client files from root directory of server
app.use(express.static(__dirname));
// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Enable POST calls
Object.keys(clientApi.functions).forEach(function(key, index) {
    app.post(key, function(req, res) {
        let result;
        
        result = clientApi.functions[key](req.body.data, server);
        
        res.send(result);
    });
});

/**
 * Socket.io Setup
 */

io.on('connection', function(socket){
    console.log('A connection has started...');
    socket.on('disconnect', function(){
        console.log('A connection has ended.');
    });
    server.newConnection(socket);
});

/**
 * Start server
 */

http.listen(port, function () {
    console.log('Game server is listening on port ' + port + ' !')
});

/**
 * Main Loop
 */

// Main loop vars
const TARGET_DELTA = 1000/240; // Milliseconds
var lastUpdate = Date.now();

server.init(io);

// Main loop
setInterval(function() {
    let currTime = Date.now();
    let delta = currTime - lastUpdate;
    
    lastUpdate = currTime;
    server.update(delta);

    if(debug) {
        console.log('Last delta: ' + delta);
    }
}, TARGET_DELTA);