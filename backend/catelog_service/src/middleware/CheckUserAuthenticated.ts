import { NextFunction, Request, Response } from "express";
import { AuthorizeError } from "../util/error/errors";

export function CheckUserAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("user", req.user);
  if (!req.user) {
    throw new AuthorizeError(
      "user doose not Authenticated.Please sing in first!!!"
    );
  }
  next();
}
