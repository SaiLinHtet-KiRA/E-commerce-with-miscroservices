export default interface UserRepositoryInterface {
  create(data: any): Promise<any>;
  get(offset: number): Promise<any>;
  getByID(id: number): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<any>;
}
