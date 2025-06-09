import { Category } from "@prisma/client";
import categoryRepositoryInterface from "../interface/category/category.repository.interface";
import categoryServiceInterface from "../interface/category/category.service.interface";
import categoryRepository from "../repository/category.repository";
import { NotFoundError, ValidationError } from "../util/error/errors";

export default class categoryService implements categoryServiceInterface {
  repo: categoryRepositoryInterface;
  constructor() {
    this.repo = new categoryRepository();
  }
  async creatCategory({ name }: { name: string }) {
    this.repo.create({ name });
  }
  async getCategories(): Promise<Category[]> {
    return await this.repo.get();
  }
  async getCategoryByID(id: string): Promise<Category> {
    const category = await this.repo.getByID(id);
    if (!category) throw new NotFoundError("category is not exist");
    return category;
  }
  async updataCategory(id: string, data: Omit<Category, "id">) {
    try {
      return await this.repo.updata(id, data);
    } catch (error) {
      throw new ValidationError("This category can't update");
    }
  }
  async deletCategory(id: string) {
    try {
      await this.repo.delete(id);
    } catch (error) {
      throw new ValidationError("This category can't delete");
    }
  }
}
