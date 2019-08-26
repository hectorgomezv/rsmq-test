## RSMQ (Redis Simple Message Queue) demo project
The goal here is to illustrate a basic setup where Redis is used as a message queue to (potentially) communicate microservice instances in a event-driven architecture. Polling is used in the sake of simplicity, but this example could be easily converted to a pub/sub schema.

#### Prerequisites
* Docker
* Docker Compose

#### Setup
* git clone
* cd rsmq-test
* docker-compose up --build

#### Playground
When the containers start, there's one publisher and three subscribers. Two queues are initialized, queueA and queueB. The publisher publishes random messages every 3 seconds to queueB, and also exposes a web server listening on localhost:4000, you can use this server to send messages to queues, example:

```
curl -X POST \
  http://localhost:4000/queue/push/queueA \
  -H 'Accept: */*' \
  -H 'Accept-Encoding: gzip, deflate' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 35' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:4000' \
  -H 'cache-control: no-cache' \
  -d '{
	"message": "this is a message"
}'
```

Your message should be putted in the queueB, and listened by one of the subscribers.

Plus, you can play with the containers. By example, you can stop one subscriber and see it's not receiving messages anymore.

```
docker stop rsmq-test_subscriber-1_1
```

Or you can stop them all:

```
docker stop rsmq-test_subscriber-1_1
docker stop rsmq-test_subscriber-2_1
docker stop rsmq-test_subscriber-3_1
```

And see that the messages continue being sent by the publisher container, but no one is hearing them. And, when a subscriber comes up again, he catches all the messages!

```
docker start rsmq-test_subscriber-3_1
```

And so on... you can play with it for a while.