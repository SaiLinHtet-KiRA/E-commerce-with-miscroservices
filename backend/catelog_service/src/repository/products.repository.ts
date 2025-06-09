import { PrismaClient } from "@prisma/client";
import Product from "../interface/product/product.interface";
import productRepositoryInterface from "../interface/product/products.repository.interface";

export default class productsRepository implements productRepositoryInterface {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(data: Omit<Product, "id">): Promise<void> {
    await this.prisma.product.create({ data: { ...data } });
  }
  async get(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }
  async getByID(id: string): Promise<Product | null> {
    return await this.prisma.product.findFirst({ where: { id } });
  }
  async updata(id: string, data: Omit<Product, "id">): Promise<Product> {
    return await this.prisma.product.update({ where: { id }, data });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
