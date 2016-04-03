'use strict';

/**
 * Error middleware
 */

module.exports = (err, req, res) => {
    (err.logError === undefined) ? require('debug')('app:error:middleware:error')(err) : err.logError(err.err);
    let newError = (err.err === undefined) ? err : err.err;
    actions(newError);
    res.status(newError.status || 500);
    if (process.env.NODE_ENV !== 'development') newError = {};
    res.json(formatMessage(newError));
};

// Internal functions =========

function actions(err) {
    //ErrorHelper.sendError(err);
    //NotificationHelper.sendAdminNotification(err);
}

function formatMessage(err) {
    if (err.logError !== undefined) delete err.logError;
    return {
        success: err.success,
        message: err.message,
        error: err,
        data: err.data,
    };
}
