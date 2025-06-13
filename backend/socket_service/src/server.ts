import connectDB from "./config/ConnectDB";
import { ExpressServer } from "./server/express";
import MessageBroker from "./server/MessageBroker";
import SocketServer from "./server/socket";
import { config } from "dotenv";
import ReviewService from "./services/Review.service";

config();

const expressServer = new ExpressServer();
export const socketSercer = new SocketServer(expressServer.app);

function startServer() {
  socketSercer.startServer();
  connectDB();

  const Rpc = new MessageBroker();
  Rpc.RPCObserver("scoketServer", new ReviewService());
}
startServer();
