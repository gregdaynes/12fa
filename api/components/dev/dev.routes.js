'use strict';

// Module dependencies ========
const router = require('express').Router();
const locale = require('locale');
module.exports = router;

// Create ---------------------

router.all('/',
    (req, res) => {
        res.status(200);
        res.json({ message: locale.__('Hello') });
    });

