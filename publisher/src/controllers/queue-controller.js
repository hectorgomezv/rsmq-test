'use strict';

const { QueueBusiness } = require('../business');

class QueueController {
  static async push(ctx) {
    ctx.response.status = 200;
    const result = await QueueBusiness.push();
    ctx.response.body = result;
  }
}

module.exports = QueueController;
