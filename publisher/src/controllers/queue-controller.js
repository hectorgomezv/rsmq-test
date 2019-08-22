'use strict';

const { QueueBusiness } = require('../business');

class QueueController {
  static async push(ctx) {
    const { queueName } = ctx.params;
    ctx.response.status = 200;
    const result = await QueueBusiness.push(queueName);
    ctx.response.body = result;
  }
}

module.exports = QueueController;
