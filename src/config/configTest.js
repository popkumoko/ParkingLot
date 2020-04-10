'use strict';

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  mongoose: {
    url: process.env.MONGO_URI_TEST,
    options: { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  },
};