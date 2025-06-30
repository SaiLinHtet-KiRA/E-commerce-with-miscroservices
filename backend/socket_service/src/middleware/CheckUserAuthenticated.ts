import { NextFunction, Request, Response } from "express";
import { AuthorizeError } from "../util/error/errors";

export function CheckUserAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    throw new AuthorizeError(
      "User doose not Authenticated.Please sing in first!!!"
    );
  }
  next();
}
