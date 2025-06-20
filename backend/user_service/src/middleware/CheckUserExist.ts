import { NextFunction, Request, Response } from "express";
import { userAuth } from "../model/dto/user.dto";
import { userRepository } from "../repository";
import { ValidationError } from "../util/error/errors";

export default async function CheckUserExist(
  req: Request<null, userAuth>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;
    const isUserExist = await userRepository.findBy(email);
    if (isUserExist) throw new ValidationError("Email is already existed");
    next();
  } catch (error) {
    next(error);
  }
}
