'use strict';

const Router = require('koa-router');

const router = new Router();
const { QueueController: ctl } = require('../../../controllers');

router.post('/queue/push', ctl.push);

module.exports = router.routes();
