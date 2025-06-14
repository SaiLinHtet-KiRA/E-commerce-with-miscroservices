import Product from "./product.interface";

export default interface productRepositoryInterface {
  create(data: Omit<Product, "id">): Promise<void>;
  get(): Promise<Product[]>;
  getByID(id: string): Promise<Product | null>;
  updata(id: string, data: Omit<Product, "id">): Promise<Product>;
  delete(id: string): Promise<Product>;
}
