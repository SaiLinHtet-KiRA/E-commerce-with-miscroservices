import amqplib, { Channel, ConsumeMessage } from "amqplib";
import { v4 } from "uuid";
import RPCRequestPayload from "../../interface/RPCRequestPayload.interface";
import { EXCHANGE_NAME } from "../../config";

export default class RabbitMQ {
  channel: Channel;

  async CreateChannel() {
    try {
      const amqplibConnection = await amqplib.connect(
        process.env.RABBIT_MQ_URL!
      );
      this.channel = await amqplibConnection.createChannel();
      await this.channel.assertExchange(process.env.EXCHANGE_NAME!, "direct", {
        durable: true,
      });
    } catch (err) {
      throw err;
    }
  }
  async PublishMessage(service, msg, headers) {
    if (!this.channel) await this.CreateChannel();
    this.channel.publish(
      EXCHANGE_NAME,
      service,
      Buffer.from(JSON.stringify(msg)),
      {
        headers,
      }
    );
  }

  private async requestData(
    RPC_QUEUE_NAME: string,
    requestPayload: RPCRequestPayload,
    uuid: string
  ) {
    try {
      if (!this.channel) await this.CreateChannel();
      const q = await this.channel.assertQueue("", { exclusive: true });
      this.channel.sendToQueue(
        RPC_QUEUE_NAME,
        Buffer.from(JSON.stringify(requestPayload.data)),
        {
          replyTo: q.queue,
          correlationId: uuid,
          headers: {
            toServer: requestPayload.toServer,
          },
        }
      );

      return new Promise((resolve, reject) => {
        // timeout n
        const timeout = setTimeout(() => {
          this.channel.deleteQueue(q.queue);
          reject("API could not fullfil the request!");
        }, 8000);
        this.channel.consume(
          q.queue,
          (msg: ConsumeMessage | null) => {
            if (msg && msg.properties.correlationId == uuid) {
              resolve(JSON.parse(msg.content.toString()));
              clearTimeout(timeout);
              this.channel.deleteQueue(q.queue);
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
  }

  async RPCRequest<T>(
    RPC_QUEUE_NAME: string,
    requestPayload: RPCRequestPayload
  ): Promise<T> {
    const uuid = v4();

    return (await this.requestData(RPC_QUEUE_NAME, requestPayload, uuid)) as T;
  }
}
