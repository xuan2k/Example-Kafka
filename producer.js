const Kafka = require("kafkajs").Kafka
    // const { Kafka } = require('kafkajs')

const msg = process.argv;
const num = msg.length;
console.log("Kafka producer")
run();

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })
        const producer = kafka.producer();
        console.log("Connecting...")
        await producer.connect()
        console.log("Connected!")

        for (var i = 2; i < num; i++) {
            const partition = (msg[i] < "N" || msg[i] < "n") ? 0 : 1;
            const result = await producer.send({
                "topic": "Users",
                "messages": [{
                    "value": msg[i],
                    "partition": partition
                }]
            })
        }
        // console.log(`Sent Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();

    } catch (ex) {
        console.error(`Error occurred ${ex}`)
    } finally {
        process.exit(0);
    }
}