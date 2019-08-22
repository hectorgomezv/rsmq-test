'use strict';

const Koa = require('koa');
const KoaLogger = require('koa-logger');
const routes = require('./routes');

const app = new Koa();

app.use(KoaLogger());
app.use(routes);

async function listen(port) {
  app.listen(port);
}

module.exports = {
  app,
  listen,
};
