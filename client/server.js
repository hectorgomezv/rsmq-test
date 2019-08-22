'use strict';

require('dotenv').config();
const { QueueBusiness } = require('./src/business');
const { webServer } = require('./src/infrastructure');

const { PORT } = process.env;

(async function initApp() {
  await QueueBusiness.init();
  await webServer.listen(PORT);
}());
