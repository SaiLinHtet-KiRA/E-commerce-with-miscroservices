import Category from "./category.interface";

export default interface categoryServiceInterface {
  creatCategory({ name }: { name: string }): void;
  getCategories(): Promise<Category[]>;
  getCategoryByID(id: string): Promise<Category>;
  updataCategory(id: string, data: Omit<Category, "id">): Promise<Category>;
  deletCategory(id: string): void;
}
