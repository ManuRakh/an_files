const amqp = require('amqplib');
const { queues } = require('../utils/queues');

async function sendMessage(exchange, message) {
  try {
    if (!queues.includes(exchange)) throw new Error("Invalid exchange");
    if (!message.action) throw new Error("Invalid message");
    if (!message.object_type) throw new Error("Invalid object type");

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'fanout', { durable: false });

    channel.publish(exchange, '', Buffer.from(JSON.stringify(message)));
    console.log(" [x] Sent %s", message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (e) {
    console.log(e);
  }
}


module.exports = { sendMessage };
