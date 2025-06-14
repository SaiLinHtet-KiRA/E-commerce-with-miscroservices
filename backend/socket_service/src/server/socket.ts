import { Server, Socket } from "socket.io";
import express, { Express } from "express";
import { Server as httpServer, createServer } from "http";

export default class SocketServer {
  socket: Server;
  private server: httpServer;
  private port: number;

  constructor(app: Express) {
    this.server = createServer(app);
    this.socket = new Server(this.server);
    this.port = 4002;
  }
  startServer() {
    this.socket.on("connection", (socket) => {
      console.log("connection");
      // socket.emit("connect", { message: "a new client connected" });
    });
    this.server.listen(this.port, () => {
      console.log(`Socket and Express server is listen on port ${this.port}`);
    });
  }
}
