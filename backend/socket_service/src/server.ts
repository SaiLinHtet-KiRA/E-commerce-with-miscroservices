import connectDB from "./config/ConnectDB";
import { ExpressServer } from "./server/express";
import RabbitMQ from "./util/message-broker/rabbitMQ";
import SocketServer from "./server/socket";
import { config } from "dotenv";
import ReviewService from "./services/Review.service";
import {
  REVIEW_BINDING_KEY,
  REVIEW_QUEUE_NAME,
  REVIEW_RPCQUEUE_NAME,
} from "./config";

config();

const reviewService = new ReviewService();
const expressServer = new ExpressServer();
export const socketSercer = new SocketServer(expressServer.app);
const Broker = new RabbitMQ();

async function startServer() {
  socketSercer.startServer();
  connectDB();
  await Broker.comuseMessage(
    reviewService,
    REVIEW_BINDING_KEY,
    REVIEW_QUEUE_NAME
  );
  await Broker.RPCObserver(REVIEW_RPCQUEUE_NAME, reviewService);
}
startServer();
