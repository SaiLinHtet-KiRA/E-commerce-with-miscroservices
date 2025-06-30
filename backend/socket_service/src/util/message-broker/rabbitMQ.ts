import amqplib, { Channel, ConsumeMessage } from "amqplib";
import ReviewServiceInterface from "../../interface/Review/Review.service.interface";
import { EXCHANGE_NAME, REVIEW_BINDING_KEY } from "../../config";
import { v4 } from "uuid";
import RPCRequestPayload from "../../interface/RPCRequestPayload.interface";

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
      console.log(err);
      throw err;
    }
  }

  PublishMessage(service, msg) {
    this.channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
    console.log("Sent: ", msg);
  }

  async comuseMessage(
    service: ReviewServiceInterface,
    BINDING_KEY: string,
    QUEUE_NAME: string
  ) {
    if (!this.channel) await this.CreateChannel();
    const queue = await this.channel.assertQueue(QUEUE_NAME, {
      exclusive: true,
    });
    this.channel.bindQueue(queue.queue, EXCHANGE_NAME, BINDING_KEY);
    this.channel.consume(queue.queue, async (msg) => {
      if (msg) {
        const payload = JSON.parse(msg.content.toString());

        switch (msg.properties.headers!.toServe) {
          case "deleteReviews":
            await service.deleteReviews(payload.id);
            break;
        }
      }
    });
  }

  async RPCObserver(RPC_QUEUE_NAME: string, service: ReviewServiceInterface) {
    if (!this.channel) await this.CreateChannel();

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
          console.log("message", msg);
          switch (msg.properties.headers!.toServer) {
            case "createReviews":
              response = await service.createReviews();
              break;
          }

          // const response = await service.serveRPCRequest(payload);
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
