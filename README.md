# Enviroment setting:

To run this kafka example, we need a zookeeper and a kafka server active.

We run Kafka and Zookeeper server on docker. If not installed docker yet, visit https://www.docker.com/.

To start a Zookeeper, use this command with docker:

docker run --name zookeeper -p 2181:2181 zookeeper

If Zookeeper already run before, run this instead:

```docker start -i zookeeper``` (can be replace base on the name store on docker)

To start a Kafka server, use this command with docker:

//Get the Zookeeper server ip

```Zookeeper_Server_IP=$(docker inspect zookeeper --format='{{ .NetworkSettings.IPAddress }}')```

//Run kafka

```docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=${Zookeeper_Server_IP}:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka```

If Kafka already run before, run this instead:

```docker start -i kafka``` (can be replace base on the name store on docker)

Note: you must run 2 server on different terminal because can not edit when the server is running.

# How to run:

Install all the file of kafka example.

Active a Zookeeper server.

Active Kafka server.

Go to the file drection, firstly, we need to create topic by:

```node topic.js```

or

```npm run start:topic```

After that we can use producer and consumer, to send message with producer, we use:

```node producer.js [arg_1] ... [arg_n]```

Where the argument we pass in will be messages that we want to send, to receive message with consumer, we use:

```node consumer.js```

# Stop program:

To stop program, we use ```Ctr + C``` to consumer, kafka server and zookeeper server.
