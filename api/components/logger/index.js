'use strict';

/* 
Logger
uses bunyan [https://www.npmjs.com/package/bunyan]
console logging
ringbuffer for memory based record
rotating log file in /var/log
provides error logging

*/ 

const bunyan = require('bunyan');
const ringbuffer = new bunyan.RingBuffer({ limit: process.env.LOG_RINGBUFFER_LENGTH });
const log = bunyan.createLogger({
    name: process.env.APP_NAME,
    streams: [{
        type: 'rotating-file',
        path: `/var/log/${process.env.APP_NAME}.log`,
        period: '1d',
        count: 3,
    }, {
        level: 'info',
        stream: process.stdout,
    }, {
        level: 'trace',
        type: 'raw',
        stream: ringbuffer,
    }]
});

log.ringbuffer = ringbuffer;

module.exports = log;
