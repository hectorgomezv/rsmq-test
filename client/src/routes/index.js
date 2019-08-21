'use strict';

const Router = require('koa-router');

const router = new Router();
const { QueueController: ctl } = require('../controllers');

router.post('/queue/init', ctl.init);
router.post('/queue/push', ctl.push);

module.exports = router.routes();
