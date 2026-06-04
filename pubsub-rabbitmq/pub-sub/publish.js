const {exchangeName} = require('./constant.js');
const { getChannel, closeConnection } = require('./helper.js')

async function publish(req, res){
    const { channel, connection } = await getChannel();
    const message = req.body.message;

    try {
        await channel.assertExchange(exchangeName, 'fanout', {durable: false});
        res.send(`Published: ${message}`);
        channel.publish(exchangeName, '', Buffer.from(message));
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }finally{
        closeConnection(channel, connection);
    }
}

module.exports = publish;