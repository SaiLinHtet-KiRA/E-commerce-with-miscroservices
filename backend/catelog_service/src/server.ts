import { ExpressServer } from "./server/express";
import { config } from "dotenv";
import "./util/passport";

config();
function startServer() {
  const expressServer = new ExpressServer();
}
startServer();
