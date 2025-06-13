import { NextFunction, Request, Response, Router } from "express";
import ReviewService from "../services/Review.service";
import RequestBodyValidation from "../util/RequestBodyValidation";
import { plainToClass } from "class-transformer";
import ReviewInput from "../model/dto/ReviewInput.dto";
import ReviewCollectionIsExist from "../middleware/ReviewCollectionIsExist.middleware";

const service = new ReviewService();

const router = Router();

router.get(
  "/review/:id",
  async (
    req: Request<{ id: string }, null, null, { offset: number }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { offset } = req.query;
      const Reviews = await service.getByIDReviews(id, offset - 1);
      res.status(200).json(Reviews);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/review/:id/add",
  ReviewCollectionIsExist,
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = await RequestBodyValidation<ReviewInput>(
        plainToClass(ReviewInput, req.body)
      );
      const addedReview = await service.addReview(id, body);
      res.status(200).json(addedReview);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/review/:id/remove",
  ReviewCollectionIsExist,
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = await RequestBodyValidation<ReviewInput>(
        plainToClass(ReviewInput, req.body)
      );
      const addedReview = await service.removeReview(id, body);
      res.status(200).json(addedReview);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
