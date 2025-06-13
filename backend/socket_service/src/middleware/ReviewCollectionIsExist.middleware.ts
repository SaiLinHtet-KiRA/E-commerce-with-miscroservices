import { NextFunction, Request, Response } from "express";
import ReviewService from "../services/Review.service";

const service = new ReviewService();

export default async function ReviewCollectionIsExist(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    await service.getByIDReviews(id, 1);
    next();
  } catch (error) {
    next(error);
  }
}
