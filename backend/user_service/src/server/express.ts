import express, { Express } from "express";
import cookieSession from "cookie-session";
import { HandleErrorWithLogger } from "../util/error/handler";
import passport from "passport";

const cookie = cookieSession({
  name: "E commerce-session",
  secret: "dadadas",
  maxAge: 1000 * 60 * 60 * 24,
});
export class ExpressServer {
  app: Express;
  private port: number;
  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 4003;
  }
  startServer() {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(cookie);

    this.app.use(express.json());

    this.app.use(HandleErrorWithLogger as any);
    this.app.listen(this.port, () => {
      console.log(`Express server is listen on port ${this.port}`);
    });
  }
}
