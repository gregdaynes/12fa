'use strict';

require('dotenv').config();

// Setup Logging ==============
const log = require('logger');

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
app.use(logger(process.env.REQUEST_LOG_STYLE));
app.use(bodyParser.json({ limit: process.env.UPLOAD_LIMIT }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.env.STATIC_DIRECTORY));

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
    log.info(`Application ready, listening on port ${process.env.PORT}`);
}

// Error Handling =============
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(errorHandler);

// Graceful Shutdown
process.on('SIGINT', gracefulExit)
process.on('SIGTERM', gracefulExit);

// Internal Functions =========

function gracefulExit() {
    log.info(`Application shutting down. Waiting for processes to finish`);
    io.removeAllListeners();
    server.close();
    return
}
