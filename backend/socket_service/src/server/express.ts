import express, { Express } from "express";

export class ExpressServer {
  app: Express;
  private port: number;
  constructor() {
    this.app = express();
    this.port = 4001;
    this.serverStart();
  }
  serverStart() {
    this.app.use(express.json());

    // this.app.listen(this.port, () => {
    //   console.log(`Express server is listen on port ${this.port}`);
    // });
  }
}
