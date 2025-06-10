import amqplib, { Channel, ConsumeMessage } from "amqplib";
import { v4 } from "uuid";

export default class MessageBroker {
  channel: Channel;

  constructor() {
    this.CreateChannel();
  }

  private getChannel = async () => {
    const amqplibConnection = await amqplib.connect(process.env.RABBIT_MQ_URL!);
    return await amqplibConnection.createChannel();
  };

  async CreateChannel() {
    try {
      const channel = await this.getChannel();
      await channel.assertQueue(process.env.EXCHANGE_NAME!, {
        durable: true,
      });
      this.channel = channel;
    } catch (err) {
      throw err;
    }
  }

  requestData = async (RPC_QUEUE_NAME, requestPayload, uuid) => {
    try {
      const channel = await this.getChannel();
      const q = await channel.assertQueue("", { exclusive: true });
      channel.sendToQueue(
        RPC_QUEUE_NAME,
        Buffer.from(JSON.stringify(requestPayload)),
        {
          replyTo: q.queue,
          correlationId: uuid,
        }
      );

      return new Promise((resolve, reject) => {
        // timeout n
        const timeout = setTimeout(() => {
          channel.close();
          resolve("API could not fullfil the request!");
        }, 8000);
        channel.consume(
          q.queue,
          (msg: ConsumeMessage | null) => {
            if (msg && msg.properties.correlationId == uuid) {
              resolve(JSON.parse(msg.content.toString()));
              clearTimeout(timeout);
            } else {
              reject("data Not found!");
            }
          },
          {
            noAck: true,
          }
        );
      });
    } catch (error) {
      console.log(error);
      return "error";
    }
  };

  async RPCRequest(RPC_QUEUE_NAME, requestPayload) {
    const uuid = v4(); // correlationId
    console.log(RPC_QUEUE_NAME, requestPayload, uuid);
    return await this.requestData(RPC_QUEUE_NAME, requestPayload, uuid);
  }
}
