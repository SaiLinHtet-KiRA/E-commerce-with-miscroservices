import { PrismaClient } from "@prisma/client";
import Product from "../interface/product/product.interface";
import productServiceInterface from "../interface/product/products.service.interface";
import productsRepository from "../repository/products.repository";
import { NotFoundError, ValidationError } from "../util/error/errors";
import MessageBroker from "../server/MessageBroker";
import { REVIEW_BINDING_KEY, REVIEW_RPCQUEUE_NAME } from "../config";

export default class productService implements productServiceInterface {
  repo: productsRepository;

  constructor(private msgBroker: MessageBroker) {
    this.repo = new productsRepository();
  }
  async createProduct(data: Omit<Product, "id">): Promise<void> {
    try {
      data.ReviewCollection = "ReviewString";
      data.images = [];
      data.images[0] = "image string";
      data.images[1] = "image string2";
      data.ReviewCollection = await this.msgBroker.RPCRequest<string>(
        REVIEW_RPCQUEUE_NAME,
        {
          data: "",
          toServer: "createReviews",
        }
      );
      await this.repo.create(data);
    } catch (error) {
      console.log(error);
      throw new NotFoundError("Products can't create");
    }
  }
  async getProducts(): Promise<Product[]> {
    try {
      return await this.repo.get();
    } catch (error) {
      throw new NotFoundError("Products are not found");
    }
  }
  async getProductsByID(id: string): Promise<Product> {
    try {
      const product = await this.repo.getByID(id);
      if (!product) throw new NotFoundError("Product dose not exist");
      return product;
    } catch (error) {
      throw new NotFoundError("Product dose not exist");
    }
  }
  async updataProduct(id: string, data: Omit<Product, "id">): Promise<Product> {
    try {
      return await this.repo.updata(id, data);
    } catch (error) {
      throw new ValidationError("Product Can't updata");
    }
  }
  async deleteProduct(id: string): Promise<void> {
    try {
      const deletedProduct = await this.repo.delete(id);
      this.msgBroker.PublishMessage(
        REVIEW_BINDING_KEY,
        {
          id: deletedProduct.ReviewCollection,
        },
        { toServe: "deleteReviews" }
      );
    } catch (error) {
      console.log(error);
      throw new ValidationError("Product Can't delete");
    }
  }
}
