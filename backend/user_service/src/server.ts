// import connectDB from "./config/ConnectDB";
import { ExpressServer } from "./server/express";
// import MessageBroker from "./server/MessageBroker";

import { config } from "dotenv";

config();

const expressServer = new ExpressServer();

function startServer() {
  // connectDB();
  expressServer.startServer();
  // const Rpc = new MessageBroker();
  // Rpc.RPCObserver("scoketServer", new ReviewService());
}
startServer();
