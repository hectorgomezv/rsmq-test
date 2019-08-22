'use strict';

const { QueueBusiness } = require('../business');

class QueueController {
  static async push(ctx) {
    const { queueName } = ctx.params;
    const { body: { message } } = ctx.request;
    ctx.response.status = 200;
    const result = await QueueBusiness.push(queueName, message);
    ctx.response.body = result;
  }
}

module.exports = QueueController;
