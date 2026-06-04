import {connect} from 'amqplib';

const connection = await connect('amqp://localhost:5672');

const channel = await connection.createChannel();

const queue = "message";

await channel.assertQueue(queue, {durable: false});

channel.consume(queue, (msg) => {
    console.log(`Received message: ${msg.content.toString()}`);
})