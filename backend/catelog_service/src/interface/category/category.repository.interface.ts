import Category from "./category.interface";

export default interface categoryRepositoryInterface {
  create({ name }: { name: string }): void;
  get(): Promise<Category[]>;
  getByID(id: string): Promise<Category | null>;
  updata(id: string, data: Omit<Category, "id">): Promise<Category>;
  delete(id: string): void;
}
