import express, { NextFunction, Request, Response } from "express";
import categoryService from "../Service/category.service";
import Category from "../interface/category/category.interface";
import { plainToClass } from "class-transformer";
import RequestBodyValidation from "../util/RequestBodyValidation";

const router = express.Router();

const CategoryService = new categoryService();

router.post(
  "/category",
  async (
    request: Request<null, null, { name: string }>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const body = await RequestBodyValidation<Category>(
        plainToClass(Category, request.body)
      );
      await CategoryService.creatCategory(body);
      response.status(200).json("sucess");
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/categories",
  async (
    request: Request,
    response: Response<Category[]>,
    next: NextFunction
  ) => {
    try {
      const data = await CategoryService.getCategories();
      if (data.length) {
        response.status(200).json(data);
      }
      response.status(404);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/category/:id",
  async (
    request: Request<{ id: string }>,
    response: Response<Category>,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const data = await CategoryService.getCategoryByID(id);
      if (data) {
        response.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/category/:id",
  async (
    request: Request<{ id: string }, undefined, Omit<Category, "id">>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const body = await RequestBodyValidation<Category>(
        plainToClass(Category, request.body)
      );
      const updatedCategory = await CategoryService.updataCategory(id, body);
      response.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/category/:id",
  async (
    request: Request<{ id: string }>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      await CategoryService.deletCategory(id);
      response.status(200).json("sucess");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
