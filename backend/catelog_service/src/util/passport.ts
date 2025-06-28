import passport from "passport";
import { rabbitMQ } from "./message-broker";
import { USER_RPCQUEUE_NAME } from "../config";
import { APIError } from "./error/errors";
import UserInfo from "../interface/userInfo.interface";

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await rabbitMQ.RPCRequest<UserInfo>(USER_RPCQUEUE_NAME, {
      data: id,
      toServer: "getUserInfo",
    });
    if (!user) cb(new APIError("User Info can't get"));
    cb(null, user);
  } catch (error) {
    cb(error);
  }
});
