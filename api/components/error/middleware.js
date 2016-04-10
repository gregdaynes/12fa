'use strict';

/**
 * Error middleware
 */

const log = require('logger');

module.exports = (err, req, res, next) => {
    actions(err);
    res.status(err.status || 500);
    if (process.env.NODE_ENV !== 'development') err = {};
    res.json(formatMessage(err));
    return next();
};

// Internal functions =========

function actions(err) {
    log.info(err);
    //ErrorHelper.sendError(err);
    //NotificationHelper.sendAdminNotification(err);
}

function formatMessage(err) {
    return {
        success: err.success,
        message: err.message,
        error: err,
        data: err.data,
    };
}
