'use strict';

require('dotenv').config();
const RedisSMQ = require('rsmq');
const { logger } = require('./src/lib');

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_NAMESPACE,
  SUBSCRIBER_NAME,
  POLLING_INTERVAL,
} = process.env;

const rsmq = new RedisSMQ({
  host: REDIS_HOST,
  port: REDIS_PORT,
  ns: REDIS_NAMESPACE,
});

async function processMessages(qname) {
  const message = await rsmq.receiveMessageAsync({ qname });
  if (Object.entries(message).length !== 0) {
    // do something useful with the message here :)
    logger.info(`Message received on ${qname}: ${JSON.stringify(message)}`);
    await rsmq.deleteMessageAsync({ qname, id: message.id });

    return logger.info(`Message with id ${message.id} deleted.`);
  }

  return false;
}

async function listenQueues() {
  return setInterval(async () => {
    const activeQueues = await rsmq.listQueuesAsync();
    Promise.all(activeQueues.map(processMessages));
  }, POLLING_INTERVAL);
}

(async function initApp() {
  logger.info(`Hello world from ${SUBSCRIBER_NAME}`);
  return listenQueues();
}());
