const mongoose = require('mongoose');
const config = require('../src/config/configTest');

const setupTestDB = () => {
  before(async () => {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async collection => collection.deleteMany()));
  });

  after(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
