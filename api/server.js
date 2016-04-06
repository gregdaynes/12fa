'use strict';

// Dependencies ===============
require('dotenv').config();
const logStream = require('debug')('app:server');
const logError = require('debug')('app:error:server');
logStream('initializing...');

// Setup ======================
const app = require('./app');
const port = process.env.PORT;
app.set('port', port);
let server;

if (process.env.PROTOCOL === 'HTTPS') {
    const fs = require('fs');
    const options = {
        key: fs.readFileSync(process.env.HTTPS_KEY),
        cert: fs.readFileSync(process.env.HTTPS_CERT),
    };
    server = require('https').createServer(options, app);
} else {
    server = require('http').createServer(app);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

const io = require('socket.io')(server);
//io.on('connection', socket => {
    //socket.emit('news', { hello: 'world' }); 
    //socket.on('my other event', data => {
        //console.log(data);
    //});
//});

// Internal functions =========

function onError(error) {
    if (error.syscall !== 'listen') throw error;
    const bind = (port === 'string') ? `Pipe ${port}` : `Port ${port}`;
    switch (error.code) {
        case 'EACCES':
            logError(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logError(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = (addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    logStream(`Listening on ${bind}`);
}
