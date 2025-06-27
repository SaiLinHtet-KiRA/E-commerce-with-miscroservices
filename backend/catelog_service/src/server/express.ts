import express, { Express } from "express";
import ProdutRoutes from "../api/product.api";
import CategoryRoutes from "../api/category.api";
import { HandleErrorWithLogger } from "../util/error/handler";
import cookieSession from "cookie-session";
import passport from "passport";

const cookie = cookieSession({
  name: "E commerce-session",
  secret: "dadadas",
  maxAge: 1000 * 60 * 60 * 24,
});

export class ExpressServer {
  private app: Express;
  private port: number;
  constructor() {
    this.app = express();
    this.port = 4000;
    this.serverStart();
  }
  serverStart() {
    this.app.use(cookie);
    this.app.use(passport.initialize());
    this.app.use(passport.session());

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
