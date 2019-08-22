'use strict';

const Koa = require('koa');
const KoaLogger = require('koa-logger');
const routes = require('./routes');
const { logger } = require('../../lib');

const app = new Koa();

app.use(KoaLogger());
app.use(routes);

async function listen(port) {
  app.listen(port);
  logger.info(`Server listening to port ${port}...`);
}

module.exports = {
  app,
  listen,
};
