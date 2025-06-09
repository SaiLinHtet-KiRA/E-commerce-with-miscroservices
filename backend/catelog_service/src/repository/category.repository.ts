import { PrismaClient } from "@prisma/client";
import categoryRepositoryInterface from "../interface/category/category.repository.interface";
import Category from "../interface/category/category.interface";
import { ValidationError } from "../util/error/errors";

export default class categoryRepository implements categoryRepositoryInterface {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create({ name }: Category) {
    await this.prisma.category.create({ data: { name } });
  }
  async get(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }
  async getByID(id: string): Promise<Category | null> {
    return await this.prisma.category.findFirst({
      where: { id },
    });
  }
  async updata(id: string, data: Omit<Category, "id">) {
    return await this.prisma.category.update({ where: { id }, data });
  }
  async delete(id: string) {
    await this.prisma.category.delete({ where: { id } });
  }
}
