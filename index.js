'use strict'

const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/config/config');
const app = express();
const routes_v1 = require('./src/api/v1/routes');

app.use(express.json());

app.use('/api/v1', routes_v1);

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log(`Mongo Connected`)
  app.listen(config.port, () => {
    console.log(`Server is running on port : ${config.port}`)
    console.log(`Server host => http://localhost:${config.port}`)
  });
});
