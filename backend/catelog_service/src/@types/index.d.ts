import * as express from "express";
import UserInfo from "../interface/userInfo.interface";

declare global {
  namespace Express {
    interface User extends UserInfo {}
    interface Request {
      user?: UserInfo;
    }
  }
}
