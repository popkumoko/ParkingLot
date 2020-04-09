'use strict';

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  mongoose: {
    url: process.env.MONGO_URI,
    options: { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  },
  env: process.env.NODE_ENV || 'develop',
  port: process.env.PORT || 2703,
};