import { ExpressServer } from "./server/express";
import MessageBroker from "./server/MessageBroker";
import { config } from "dotenv";

config();
function startServer() {
  const expressServer = new ExpressServer();
}
startServer();
