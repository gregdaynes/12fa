'use strict';

// Module dependencies ========
const router = require('express').Router();
module.exports = router;

// Create ---------------------

router.all('/',
    (req, res) => {
        res.json({ message: 'Hello' });
    });

