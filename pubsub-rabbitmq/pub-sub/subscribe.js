const {queueName, exchangeName} = require('./constant.js');
const { getChannel, closeConnection } = require('./helper.js')

async function subscribe(req, res){
    const { channel, connection } = await getChannel();
    try {
        await channel.bindQueue(queueName, exchangeName, '');
        await channel.consume(queueName, (message) => {
            if(!message) return;
            console.log(`Received message: ${message.content.toString()}`);
            channel.ack(message)
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }finally{
        closeConnection(channel, connection);
    }
}

module.exports = subscribe;