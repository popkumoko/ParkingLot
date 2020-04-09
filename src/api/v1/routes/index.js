const express = require('express');
const router = express.Router();
const parkingRoute = require('./parking')

router.use('/parking', parkingRoute);
module.exports = router;
