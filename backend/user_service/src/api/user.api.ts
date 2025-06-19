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
router.post(
  "/auth/login",
  (
    req: Request<
      null,
      null,
      { username?: string; email?: string; phone?: string; authfield: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { username, email, phone } = req.body;
    if (username) {
      req.body.authfield = username;
      next();
    }
    if (email) {
      req.body.authfield = email;
      next();
    }
    if (phone) {
      req.body.authfield = phone;
      next();
    }
  },
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
      console.log("req.user", req.user);
      res.status(200).json(req.user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
router.get(
  "/auth/login/success",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("/auth/login/success");
      const user = req.user;
      console.log(user);
      if (user) res.status(200).json(user);
      res.status(400).json("false");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
router.get(
  "/auth/logout",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logOut((error) => console.log(error));
      res.status(200).json("Logout success");
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
      console.log("created");
      res.status(200).json("");
    } catch (error) {
      next(error);
    }
  }
);
export default router;
