'use strict';

const RedisSMQ = require('rsmq');

const rsmq = new RedisSMQ({
  host: '127.0.0.1',
  port: 6379,
  ns: 'rsmq',
});

class QueueBusiness {
  static async init() {
    const myQueue = await rsmq.createQueueAsync({
      qname: 'myQueue',
    });

    return myQueue;
  }

  static async push() {
    const queues = await rsmq.listQueuesAsync();

    return queues;
  }
}

module.exports = QueueBusiness;
