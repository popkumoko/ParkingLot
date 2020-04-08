'use strict'
const httpStatus = require('http-status');

const getParking = async (req, res) => {
  res.status(httpStatus.OK).send('Hello');
};

module.exports = {
  getParking,
};
