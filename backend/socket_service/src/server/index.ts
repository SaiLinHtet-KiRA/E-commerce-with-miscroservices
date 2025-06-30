import ExpressServer from "./express";
import SocketServer from "./socket";

export const expressServer = new ExpressServer();
export const socketServer = new SocketServer(expressServer.app);
