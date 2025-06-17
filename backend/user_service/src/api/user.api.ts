import { NextFunction, Request, Response, Router } from "express";
import { userAuth } from "../model/dto/user.dto";
import RequestBodyValidation from "../util/RequestBodyValidation";
import { plainToClass } from "class-transformer";
import UserService from "../service/user.service";
import passport from "passport";
import { userRepository } from "../repository";

const router = Router();
const service = new UserService(userRepository);
router.post(
  "/auth/singup",
  async (req: Request<null, userAuth>, res: Response, next: NextFunction) => {
    try {
      const data = await RequestBodyValidation<userAuth>(
        plainToClass(userAuth, req.body)
      );
      await service.singup(data);
      console.log("created");
      res.status(200).json("");
    } catch (error) {
      next(error);
    }
  }
);
router.post("/auth/login", passport.authenticate("local"));
router.get(
  "/auth",
  async (req: Request<null, userAuth>, res: Response, next: NextFunction) => {
    try {
      await service.getProfile(1);
      console.log("created");
      res.status(200).json("");
    } catch (error) {
      next(error);
    }
  }
);
export default router;
