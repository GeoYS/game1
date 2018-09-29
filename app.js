/********************************************************************
 * This is the starting point of the node server. Express is set up,
 * socket.io is set up, and the main loop starts.
 ********************************************************************/

var express = require('express');
var bodyParser = require('body-parser');
var clientApi = require('./clientApi.js');
var server = require('./server.js');
var app = express();
var port = 4545;

/**
 * Express
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

// Start express
app.listen(port, function () {
  console.log('Game server is listening on port ' + port + ' !')
});

/**
 * Socket.io
 */

//TODO

/**
 * Main Loop
 */

// Main loop vars
const TARGET_DELTA = 1000/240; // Milliseconds
var lastUpdate = Date.now();

// Main loop
setInterval(function() {
    let currTime = Date.now();
    let delta = currTime - lastUpdate;
    
    lastUpdate = currTime;
    server.update(delta);
}, TARGET_DELTA);