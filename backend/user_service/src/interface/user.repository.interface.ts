import { userAuth, userProfile } from "../model/dto/user.dto";

export default interface UserRepositoryInterface {
  create(data: userAuth): Promise<void>;
  get(offset: number): Promise<any>;
  getByID(id: number): Promise<any>;
  findBy(searchBy: string): Promise<userProfile>;
  update(id: number, data: userProfile): Promise<userProfile>;
  delete(id: number): Promise<any>;
}
