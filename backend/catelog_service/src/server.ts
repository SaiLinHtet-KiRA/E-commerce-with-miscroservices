import { ExpressServer } from "./server/express";
import MessageBroker from "./util/message-broker/rabbitMQ";
import { config } from "dotenv";

config();
function startServer() {
  const expressServer = new ExpressServer();
}
startServer();
