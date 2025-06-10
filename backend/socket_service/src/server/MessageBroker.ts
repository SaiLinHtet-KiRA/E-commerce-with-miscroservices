import amqplib, { Channel, ConsumeMessage } from "amqplib";

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

  PublishMessage(service, msg) {
    this.channel.publish(process.env.EXCHANGE_NAME!, service, Buffer.from(msg));
    console.log("Sent: ", msg);
  }

  async RPCObserver(RPC_QUEUE_NAME: string) {
    const channel = await this.getChannel();
    await channel.assertQueue(RPC_QUEUE_NAME, {
      durable: false,
    });
    channel.prefetch(1);
    channel.consume(
      RPC_QUEUE_NAME,
      async (msg: ConsumeMessage | null) => {
        console.log("rcesive from Socket", msg);
        if (msg) {
          // DB Operation
          // const payload = JSON.parse(msg.content.toString());
          // const response = await service.serveRPCRequest(payload);
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify("Rpc replay from Socket")),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );
  }
}
