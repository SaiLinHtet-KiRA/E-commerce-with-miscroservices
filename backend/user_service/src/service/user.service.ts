import UserServiceInterface from "../interface/user.service.interface";
import { userAuth, userProfile } from "../model/dto/user.dto";
import UserRepository from "../repository/user.repository";

export default class UserService implements UserServiceInterface {
  constructor(private repo: UserRepository) {}

  async singup(data: userAuth): Promise<void> {
    try {
      this, this.repo.create(data);
    } catch (error) {
      console.log(error);
      throw new Error("User sing in fail");
    }
  }
  async getProfile(id: number): Promise<userProfile> {
    try {
      return await this.repo.get(id);
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
  async updateProfile(id: number, data: userProfile): Promise<userProfile> {
    throw new Error("Method not implemented.");
  }
}
