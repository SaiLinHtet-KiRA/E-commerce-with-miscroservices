import connectDB from "./config/ConnectDB";
import { ExpressServer } from "./server/express";
import MessageBroker from "./server/MessageBroker";
import { SocketServer } from "./server/socket";
import { config } from "dotenv";

config();

function startServer() {
  connectDB();
  const expressServer = new ExpressServer();
  const socketSercer = new SocketServer(expressServer.app);
  const Rpc = new MessageBroker();
  Rpc.RPCObserver("scoket");
}
startServer();
