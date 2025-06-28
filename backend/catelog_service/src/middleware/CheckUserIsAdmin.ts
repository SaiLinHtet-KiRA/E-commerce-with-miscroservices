import { NextFunction, Request, Response } from "express";
import { AuthorizeError } from "../util/error/errors";

export function CheckUserIsAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === "admin") {
    throw new AuthorizeError("User is not an admin");
  }
  next();
}
