'use strict';

require('dotenv').config();

// Setup Logging ==============
const logStream = require('debug')('app:initialize');
logStream('bootstrapping...');

// Module dependencies ========
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app).listen(process.env.PORT);
const io = require('socket.io').listen(server)
const loader = require('tiny-load');
const middleware = loader('filter', 'middleware.js');
const routes = loader('filter', 'routes.js');
const sockets = loader('filter', 'sockets.js');
const errorHandler = middleware.error();

// Config =====================
app.set('port', process.env.PORT);
app.use(logger('tiny'));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes =====================

// allow CORS
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method === 'OPTIONS') res.status(200).end();
    else next();
});

if (process.env.NODE_ENV === 'development') {
    app.use('/dev', routes.dev());
    sockets.dev()(io);
}

// Error Handling =============
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}).use(errorHandler);

// Graceful Shutdown
process.on('SIGINT', gracefulExit)
    .on('SIGTERM', gracefulExit);

logStream('done.');

// Internal Functions =========

function gracefulExit() {
    return server.close();
}
