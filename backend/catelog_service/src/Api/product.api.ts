import express, { NextFunction, Request, Response } from "express";
import RequestBodyValidation from "../util/RequestBodyValidation";
import { plainToClass } from "class-transformer";
import Product from "../interface/product/product.interface";
import ProductService from "../services/product.service";
import formidable from "express-formidable";
import MessageBroker from "../util/message-broker/rabbitMQ";
import { CheckUserAuthenticated } from "../middleware";

const router = express.Router();

const msgBroker = new MessageBroker();
const productService = new ProductService(msgBroker);

router.post(
  "/product",
  CheckUserAuthenticated,
  formidable({ multiples: true }),
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const body = await RequestBodyValidation<Product>(
        plainToClass(Product, request.fields)
      );

      // await productService.createProduct(body);
      response.status(200).json("Product successfully created");
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/products",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const products = await productService.getProducts();
      response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/product/:id",
  async (
    request: Request<{ id: string }>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const product = await productService.getProductsByID(id);

      response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/product/:id",
  async (
    request: Request<{ id: string }, any, Omit<Product, "id">>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const body = await RequestBodyValidation<Product>(
        plainToClass(Product, request.body)
      );
      const updatedProduct = await productService.updataProduct(id, body);
      response.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/product/:id",
  async (
    request: Request<{ id: string }>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      await productService.deleteProduct(id);
      response.status(200).json("Product is sucessfully deleted");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
