import { ExpressServer } from "./server/express";
import { config } from "dotenv";
import "../src/util/passport";
import MessageBroker from "./util/message-broker/rabbitMQ";

config();
function startServer() {
  const expressServer = new ExpressServer();
}
startServer();
