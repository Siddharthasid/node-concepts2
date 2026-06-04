import amqp from 'amqplib'; //AMQP - Advance Messaging Queue Protocol

const connection = await amqp.connect('amqp://localhost:5672');

const channel = await connection.createChannel();

const queue = "message";
const message = "Hi, Developers!"

await channel.assertQueue(queue, { durable: false });
channel.sendToQueue(queue, Buffer.from(message));

setInterval(() => {
    let timeStamp = new Date().toLocaleTimeString();
    let customMsg = `Hi, Developers! ${timeStamp}`;
    channel.sendToQueue(queue, Buffer.from(customMsg));
}, 2000);

console.log("Message sent");