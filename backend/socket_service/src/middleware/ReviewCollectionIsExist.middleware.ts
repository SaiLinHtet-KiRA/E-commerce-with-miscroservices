import { NextFunction, Request, Response } from "express";
import { reviewService } from "../services";

export async function ReviewCollectionIsExist(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    await reviewService.getByIDReviews(id, 0);
    next();
  } catch (error) {
    next(error);
  }
}
