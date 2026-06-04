const amqp = require('amqplib');

const getChannel = async () => {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    return { channel, connection };
}

const closeConnection = (channel, connection, time = 100 * 1000) => {
    setTimeout(() => {
        if (channel) channel.close();
        if (connection) connection.close();
    }, time);
}

module.exports = {
    getChannel,
    closeConnection
};
