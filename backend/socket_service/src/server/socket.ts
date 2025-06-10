import { Server, Socket } from "socket.io";
import express, { Express } from "express";
import { Server as httpServer, createServer } from "http";

export class SocketServer {
  private socket: Server;
  private server: httpServer;
  private port: number;

  constructor(app: Express) {
    this.server = createServer(app);
    this.socket = new Server(this.server);
    this.port = 4002;
    this.startServer();
  }
  startServer() {
    console.log("started");
    this.socket.on("connection", (socket) => {
      console.log("connection");
      // socket.emit("connect", { message: "a new client connected" });
    });
    this.server.listen(this.port, () => {
      console.log(`Socket and Express server is listen on port ${this.port}`);
    });
  }
}
