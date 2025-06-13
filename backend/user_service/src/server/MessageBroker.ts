// import amqplib, { Channel, ConsumeMessage } from "amqplib";
// import ReviewServiceInterface from "../interface/Review/Review.service.interface";

// export default class MessageBroker {
//   channel: Channel;

//   constructor() {
//     this.CreateChannel();
//   }

//   private getChannel = async () => {
//     const amqplibConnection = await amqplib.connect(process.env.RABBIT_MQ_URL!);
//     return await amqplibConnection.createChannel();
//   };

//   async CreateChannel() {
//     try {
//       const channel = await this.getChannel();
//       await channel.assertQueue(process.env.EXCHANGE_NAME!, {
//         durable: true,
//       });
//       this.channel = channel;
//     } catch (err) {
//       throw err;
//     }
//   }

//   PublishMessage(service, msg) {
//     this.channel.publish(process.env.EXCHANGE_NAME!, service, Buffer.from(msg));
//     console.log("Sent: ", msg);
//   }

//   async RPCObserver(RPC_QUEUE_NAME: string, service: ReviewServiceInterface) {
//     const channel = await this.getChannel();
//     await channel.assertQueue(RPC_QUEUE_NAME, {
//       durable: false,
//     });
//     channel.prefetch(1);
//     channel.consume(
//       RPC_QUEUE_NAME,
//       async (msg: ConsumeMessage | null) => {
//         if (msg) {
//           // DB Operation
//           let response: any;
//           const payload = JSON.parse(msg.content.toString());
//           console.log(msg.properties.headers);
//           switch (msg.properties.headers!.toServer) {
//             case "createReviews":
//               response = await service.createReviews();

//               break;
//           }

//           // const response = await service.serveRPCRequest(payload);
//           channel.sendToQueue(
//             msg.properties.replyTo,
//             Buffer.from(JSON.stringify(response)),
//             {
//               correlationId: msg.properties.correlationId,
//             }
//           );
//           channel.ack(msg);
//         }
//       },
//       {
//         noAck: false,
//       }
//     );
//   }
// }
