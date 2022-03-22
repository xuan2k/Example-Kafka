const Kafka = require("kafkajs").Kafka
    // const { Kafka } = require('kafkajs')

console.log("Hello world")
run();

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })
        const admin = kafka.admin();
        console.log("Connecting...")
        await admin.connect()
        console.log("Connected!")
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2

            }]
        })
        console.log("Done Successfully!")
        await admin.disconnect();

    } catch (ex) {
        console.error(`Error occurred ${ex}`)
    } finally {
        process.exit(0);
    }
}