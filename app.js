var express = require('express');
var bodyParser = require('body-parser');
var clientApi = require('./clientApi.js');
var server = require('./server.js');
var app = express();
var port = 4545;


// To serve web client files
app.use(express.static(__dirname));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

Object.keys(clientApi.functions).forEach(function(key, index) {
    app.post(key, function(req, res) {
        let syncRes;
        
        server.heartbeat(req.body.heartbeat);
        syncRes = clientApi.functions[key](req.body.data, server);
        
        res.send(syncRes);
    });
});

app.listen(port, function () {
  console.log('Game server is listening on port ' + port + ' !')
});

// Main loop vars
const TARGET_DELTA = 1000/60;
var lastUpdate = Date.now();

// Main loop
setInterval(function() {
    let currTime = Date.now();
    let delta = currTime - lastUpdate;
    
    lastUpdate = currTime;
    server.update(delta);
}, TARGET_DELTA);