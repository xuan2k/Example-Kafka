const Kafka = require("kafkajs").Kafka
    // const { Kafka } = require('kafkajs')

console.log("Kafka consumer")
run();

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })
        const consumer = kafka.consumer({ "groupId": "test" });
        console.log("Connecting...")
        await consumer.connect()
        console.log("Connected!")

        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })

        await consumer.run({
            "eachMessage": async result => {
                console.log(`Received message: ${result.message.value} on partition: ${result.partition}`);
                if (result.message.value == "quit") {
                    console.log("Consumer STOPPED!")
                    consumer.disconnect();
                }
            }
        })
    } catch (ex) {
        console.error(`Error occurred ${ex}`)
    } finally {
        // process.exit(0);
    }
}