import { NextFunction, Request, Response, Router } from "express";
import { userAuth, userProfile } from "../model/dto/user.dto";
import RequestBodyValidation from "../util/RequestBodyValidation";
import { plainToClass } from "class-transformer";
import UserService from "../service/user.service";
import passport from "passport";
import { userRepository } from "../repository";
import { CheckUserExist } from "../middleware";
import { ChangeToAuthField } from "../middleware";
import { AuthorizeError } from "../util/error/errors";
import { CheckUserAuthenticated } from "../middleware";

const router = Router();
const service = new UserService(userRepository);

router.post(
  "/auth/singup",
  CheckUserExist,
  async (req: Request<null, userAuth>, res: Response, next: NextFunction) => {
    try {
      const data = await RequestBodyValidation<userAuth>(
        plainToClass(userAuth, req.body)
      );
      await service.singup(data);
      res.status(200).json("User is successfully created");
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/auth/login",
  ChangeToAuthField,
  passport.authenticate("local"),
  async (
    req: Request<
      null,
      null,
      { username?: string; email?: string; phone?: string; authfield: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) throw new AuthorizeError("user dose not unauthorized");
      res.status(200).json("Logined Successfully");
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/auth/login/success",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user)
        throw new AuthorizeError(
          "user dose not unauthorized.Please login first"
        );
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/auth/logout",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logOut((error) => console.log(error));
      res.status(200).json("Successfully Logout ");
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/auth",
  CheckUserAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id }: any = req.user;
      const user = await service.getProfile(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/auth",
  CheckUserAuthenticated,
  async (
    req: Request<null, null, userProfile>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      const { id }: any = req.user;
      const user = await service.updateProfile(id, data);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/auths",
  async (req: Request<null, userAuth>, res: Response, next: NextFunction) => {
    try {
      await service.getProfile(1);
      res.status(200).json("");
    } catch (error) {
      next(error);
    }
  }
);
export default router;
