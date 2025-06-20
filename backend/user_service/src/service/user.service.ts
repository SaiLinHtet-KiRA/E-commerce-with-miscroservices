import { SECRET } from "../config/config";
import UserServiceInterface from "../interface/user.service.interface";
import { userAuth, userProfile } from "../model/dto/user.dto";
import UserRepository from "../repository/user.repository";
import bcrypt from "bcryptjs";
import { APIError } from "../util/error/errors";

export default class UserService implements UserServiceInterface {
  constructor(private repo: UserRepository) {}

  async singup(data: userAuth): Promise<void> {
    try {
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
      await this.repo.create(data);
    } catch (error) {
      throw new APIError("Some error had happened in user singin");
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
