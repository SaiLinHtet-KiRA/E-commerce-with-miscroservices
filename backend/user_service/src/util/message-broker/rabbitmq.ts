import amqplib, { Channel, ConsumeMessage } from "amqplib";
import {
  EXCHANGE_NAME,
  RABBIT_MQ_URL,
  USER_BINDING_KEY,
  USER_QUEUE_NAME,
  USER_RPCQUEUE_NAME,
} from "../../config";
import UserService from "../../service/user.service";
export default class RabbitMQ {
  channel: Channel;
  private async createChannel() {
    const connection = await amqplib.connect(RABBIT_MQ_URL);
    this.channel = await connection.createChannel();
    await this.channel.assertExchange(EXCHANGE_NAME, "direct", {
      durable: true,
    });
  }

  async publish(KEY: any, Message: string) {
    if (this.channel) await this.createChannel();
    this.channel.publish(EXCHANGE_NAME, KEY, Buffer.from(Message));
  }

  async Consue() {
    if (this.channel) await this.createChannel();

    const q = await this.channel.assertQueue(USER_QUEUE_NAME, {
      exclusive: true,
    });
    this.channel.bindQueue(q.queue, EXCHANGE_NAME, USER_BINDING_KEY);
    this.channel.consume(q.queue, (message) => {
      console.log(message);
    });
  }
  async RPCObserver(RPC_QUEUE_NAME: string, service: UserService) {
    // const amqplibConnection = await amqplib.connect(process.env.RABBIT_MQ_URL!);
    // const channel = await amqplibConnection.createChannel();
    // await channel.assertExchange(process.env.EXCHANGE_NAME!, "direct", {
    //   durable: true,
    // });
    if (!this.channel) await this.createChannel();

    await this.channel.assertQueue(RPC_QUEUE_NAME, {
      durable: false,
      autoDelete: true,
    });
    this.channel.prefetch(1);
    this.channel.consume(
      RPC_QUEUE_NAME,
      async (msg: ConsumeMessage | null) => {
        if (msg) {
          let response: any;
          const payload = JSON.parse(msg.content.toString());
          switch (msg.properties.headers!.toServer) {
            case "getUserInfo":
              const { id, username, avator, role } = await service.getProfile(
                payload
              );
              response = { id, username, avator, role };
              break;
          }

          this.channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(response)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          this.channel.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );
  }
}
