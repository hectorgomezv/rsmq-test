'use strict';

const RedisSMQ = require('rsmq');
const { Funnies } = require('funnies');
const { logger } = require('../lib');

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

const generator = new Funnies();
const QUEUES = ['queueA', 'queueB'];

class QueueBusiness {
  static async init() {
    const activeQueues = await rsmq.listQueuesAsync();
    logger.info(`Active queues [${activeQueues}]...`);
    if (QUEUES.every(q => !activeQueues.includes(q))) {
      logger.info(`Creating queues [${QUEUES}]...`);
      const queues = QUEUES.map(async q => rsmq.createQueueAsync({ qname: q }));
      return Promise.all(queues);
    }

    return logger.info('Queues are now active');
  }

  static async sendRandomMessages() {
    const activeQueues = await rsmq.listQueuesAsync();
    const [firstQueue] = activeQueues;
    setInterval(async () => QueueBusiness.push(firstQueue, generator.message()), 3000);
  }

  static async push(queueName, message) {
    const activeQueues = await rsmq.listQueuesAsync();
    const queue = activeQueues.find(q => q === queueName) || activeQueues[0];
    logger.info(`Pushing message to queue ${queue}: '${message}'`);

    return rsmq.sendMessageAsync({ qname: queue, message });
  }
}

module.exports = QueueBusiness;
