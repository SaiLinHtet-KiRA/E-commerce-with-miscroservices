import express, { Express } from "express";
import ProdutRoutes from "../api/product.api";
import CategoryRoutes from "../api/category.api";
import { HandleErrorWithLogger } from "../util/error/handler";

export class ExpressServer {
  private app: Express;
  private port: number;
  constructor() {
    this.app = express();
    this.port = 4000;
    this.serverStart();
  }
  serverStart() {
    this.app.use(express.json());
    this.app.use(ProdutRoutes);
    this.app.use(CategoryRoutes);

    //set error handler
    this.app.use(HandleErrorWithLogger as any);

    this.app.listen(this.port, () => {
      console.log(`Express server is listen on port ${this.port}`);
    });
  }
}
