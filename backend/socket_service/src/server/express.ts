import express, { Express } from "express";
import ReviewRouter from "../api/Review.api";
import { HandleErrorWithLogger } from "../util/error/handler";
export class ExpressServer {
  app: Express;
  private port: number;
  constructor() {
    this.app = express();
    this.port = 4001;
    this.startServer();
  }
  startServer() {
    this.app.use(express.json());
    this.app.use(ReviewRouter);
    this.app.use(HandleErrorWithLogger as any);
    // this.app.listen(this.port, () => {
    //   console.log(`Express server is listen on port ${this.port}`);
    // });
  }
}
