import * as express from "express";
import { userInfo } from "model/dto/user.dto";

declare global {
  namespace Express {
    interface User extends userInfo {}
    interface Request {
      user?: userInfo;
    }
  }
}
