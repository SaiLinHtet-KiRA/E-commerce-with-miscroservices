import { PrismaClient } from "@prisma/client";
import Product from "../interface/product/product.interface";
import productServiceInterface from "../interface/product/products.service.interface";
import productsRepository from "../repository/products.repository";
import { NotFoundError, ValidationError } from "../util/error/errors";

export default class productService implements productServiceInterface {
  repo: productsRepository;
  constructor() {
    this.repo = new productsRepository();
  }
  async createProduct(data: Omit<Product, "id">): Promise<void> {
    try {
      data.ReviewCollection = "ReviewString";
      data.images[0] = "image string";
      data.images[1] = "image string2";

      // await this.repo.create(data);
    } catch (error) {
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
      await this.repo.delete(id);
    } catch (error) {
      throw new ValidationError("Product Can't delete");
    }
  }
}
