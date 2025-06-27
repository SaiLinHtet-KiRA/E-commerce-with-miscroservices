import amqplib, { Channel } from "amqplib";
import {
  EXCHANGE_NAME,
  RABBIT_MQ_URL,
  USER_BINDING_KEY,
  USER_QUEUE_NAME,
  USER_RPCQUEUE_NAME,
} from "../../config";
export default class RabbitMQ {
  Channel: Channel;
  private async createChannel() {
    const connection = await amqplib.connect(RABBIT_MQ_URL);
    this.Channel = await connection.createChannel();
    await this.Channel.assertExchange(EXCHANGE_NAME, "direct", {
      durable: true,
    });
  }

  async publish(KEY: any, Message: string) {
    if (this.Channel) await this.createChannel();
    this.Channel.publish(EXCHANGE_NAME, KEY, Buffer.from(Message));
  }

  async Consue() {
    if (this.Channel) await this.createChannel();

    const q = await this.Channel.assertQueue(USER_QUEUE_NAME, {
      exclusive: true,
    });
    this.Channel.bindQueue(q.queue, EXCHANGE_NAME, USER_BINDING_KEY);
    this.Channel.consume(q.queue, (message) => {
      console.log(message);
    });
  }
  async RPC() {
    if (this.Channel) await this.createChannel();
    const q = await this.Channel.assertQueue(USER_RPCQUEUE_NAME, {
      exclusive: true,
      autoDelete: true,
    });
    this.Channel.consume(q.queue, (msg) => {
      if (msg) {
        this.Channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify("")),
          {
            correlationId: msg.properties.correlationId,
          }
        );
      }
    });
  }
}
