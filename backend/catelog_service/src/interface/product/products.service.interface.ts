import Product from "./product.interface";

export default interface productServiceInterface {
  createProduct(data: Omit<Product, "id">): void;
  getProducts(): Promise<Product[]>;
  getProductsByID(id: string): Promise<Product>;
  updataProduct(id: string, data: Omit<Product, "id">): Promise<Product>;
  deleteProduct(id: string): void;
}
