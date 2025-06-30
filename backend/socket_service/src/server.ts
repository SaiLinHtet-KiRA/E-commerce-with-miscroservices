import connectDB from "./config/ConnectDB";
import { config } from "dotenv";
import {
  REVIEW_BINDING_KEY,
  REVIEW_QUEUE_NAME,
  REVIEW_RPCQUEUE_NAME,
} from "./config";
import { reviewService } from "./services";
import { rabbitMQ } from "./util/message-broker";
import { socketServer } from "./server/index";
import "./util/passport";

config();

async function startServer() {
  socketServer.startServer();
  connectDB();
  await rabbitMQ.comuseMessage(
    reviewService,
    REVIEW_BINDING_KEY,
    REVIEW_QUEUE_NAME
  );
  await rabbitMQ.RPCObserver(REVIEW_RPCQUEUE_NAME, reviewService);
}
startServer();
