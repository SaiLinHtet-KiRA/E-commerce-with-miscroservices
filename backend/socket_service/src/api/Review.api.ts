import { NextFunction, Request, Response, Router } from "express";
import { reviewService } from "../services";
import RequestBodyValidation from "../util/RequestBodyValidation";
import { plainToClass } from "class-transformer";
import ReviewInput from "../model/dto/ReviewInput.dto";
import { CheckUserAuthenticated, ReviewCollectionIsExist } from "../middleware";
import passport from "passport";

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
      const Reviews = await reviewService.getByIDReviews(id, offset - 1);
      res.status(200).json(Reviews);
    } catch (error) {
      next(error);
    }
  }
);
const privateRouter = Router();

privateRouter.use(passport.session());
privateRouter.post(
  "/review/:id/add",
  CheckUserAuthenticated,
  ReviewCollectionIsExist,
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = await RequestBodyValidation<ReviewInput>(
        plainToClass(ReviewInput, { ...req.body, userID: req.user!.id })
      );
      const addedReview = await reviewService.addReview(id, body);
      res.status(200).json(addedReview);
    } catch (error) {
      next(error);
    }
  }
);

privateRouter.delete(
  "/review/:id/remove/:removeID",
  CheckUserAuthenticated,
  ReviewCollectionIsExist,
  async (
    req: Request<{ id: string; removeID: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, removeID } = req.params;

      const addedReview = await reviewService.removeReview<string>(
        id,
        removeID
      );

      res.status(200).json(addedReview);
    } catch (error) {
      next(error);
    }
  }
);
router.use(privateRouter);
export default router;
