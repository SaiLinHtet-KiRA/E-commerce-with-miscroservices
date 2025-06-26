import { NextFunction, Request, Response } from "express";
import { userLoginForm } from "../model/dto/user.dto";
import { plainToClass } from "class-transformer";
import RequestBodyValidation from "../util/RequestBodyValidation";

export async function ChangeToAuthField(
  req: Request<
    null,
    null,
    {
      username?: string;
      email?: string;
      phone?: string;
      authfield: string;
      password: string;
    }
  >,
  res: Response,
  next: NextFunction
) {
  const { username, email, phone, password } = req.body;
  const authfield = username || email || phone || "";

  await RequestBodyValidation<userLoginForm>(
    plainToClass(userLoginForm, { authfield, password })
  );
  if (authfield && password) {
    req.body.authfield = authfield;
    next();
  }
}
