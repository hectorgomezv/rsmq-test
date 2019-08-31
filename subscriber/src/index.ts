"use strict";

import * as dotenv from "dotenv";
dotenv.config();

import * as RedisSMQ from "rsmq";
import { logger } from "./lib";

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_NAMESPACE,
  POLLING_INTERVAL,
} = process.env;

const rsmq = new RedisSMQ({
  host: REDIS_HOST,
  ns: REDIS_NAMESPACE,
  port: Number(REDIS_PORT),
});

async function processMessages(queueName: string): Promise<0 | 1> {
  const message = await rsmq.receiveMessageAsync({ qname: queueName });
  if ("id" in message) {
    logger.info(`Message received on ${queueName}: ${JSON.stringify(message)}`);
    return rsmq.deleteMessageAsync({ qname: queueName, id: message.id });
  }
}

(async () => setInterval(async () => {
  const activeQueues = await rsmq.listQueuesAsync();
  Promise.all(activeQueues.map(processMessages));
}, Number(POLLING_INTERVAL)))();
