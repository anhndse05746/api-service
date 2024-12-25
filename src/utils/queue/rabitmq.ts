import { Channel, Connection } from 'amqplib';

let connection: Connection | null = null;
let channel: Channel | null = null;

export const connectRabitMQ = async (url: string) => {
  try {
    connection = await require('amqplib').connect(url);
    if (connection) {
      channel = await connection.createChannel();
      console.log('Connected to RabbitMQ');
    } else {
      throw new Error('Connection is null');
    }
  } catch (err) {
    console.error('Failed to connect to RabbitMQ', err);
    throw err;
  }
};

export const sendMessages = async (queue: string, message: string) => {
  if (!channel) {
    throw new Error('Channel is not initialized');
  }

  channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(message));
  console.log(`Message sent to ${queue}: ${message}`);
};

export const receiveMessages = async (
  queue: string,
  callback: (message: string) => void
) => {
  if (!channel) {
    throw new Error('Channel is not initialized');
  }

  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, (message) => {
    if (message) {
      callback(message.content.toString());
      channel?.ack(message);
      console.log(
        `Message received from ${queue}: ${message.content.toString()}`
      );
    }
  });
};

export const closeRabitMQ = async () => {
  if (channel) {
    await channel.close();
    console.log('Channel closed');
  }
  if (connection) {
    await connection.close();
    console.log('Connection closed');
  }
};
