'use strict';

require('dotenv').config();

// Setup Logging ==============
const logStream = require('debug')('app:initialize');
logStream('bootstrapping...');

// Module dependencies ========
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const loader = require('tiny-load');
const middleware = loader('filter', 'middleware.js');
const routes = loader('filter', 'routes.js');
const port = process.env.PORT;
const app = module.exports = express();
const http = require('http');
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
const io = require('socket.io').listen(server)
const errorHandler = middleware.error();

app.use(logger('tiny'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Attach routes ==============
// allow CORS
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method === 'OPTIONS') res.status(200).end();
    else next();
});

//app.use('/', routes.creative());
//app.use('/auth', routes.auth());
if (process.env.NODE_ENV === 'development') app.use('/dev', routes.dev());

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}).use(errorHandler);
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

logStream('done.');

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
