'use strict';

const Koa = require('koa');
const KoaLogger = require('koa-logger');
const routes = require('./routes');

const app = new Koa();

app.use(KoaLogger());
app.use(routes);

app.listen(4000);
