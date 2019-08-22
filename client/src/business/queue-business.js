'use strict';

const RedisSMQ = require('rsmq');

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_NAMESPACE,
} = process.env;

const rsmq = new RedisSMQ({
  host: REDIS_HOST,
  port: REDIS_PORT,
  ns: REDIS_NAMESPACE,
});

const QUEUES = ['queueA', 'queueB'];

class QueueBusiness {
  static async init() {
    const queues = QUEUES.map(async q => rsmq.createQueueAsync({ qname: q }));
    return Promise.all(queues);
  }

  static async push() {
    const queues = await rsmq.listQueuesAsync();

    return queues;
  }
}

module.exports = QueueBusiness;
