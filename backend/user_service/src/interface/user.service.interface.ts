import { userAuth, userProfile } from "../model/dto/user.dto";

export default interface UserServiceInterface {
  singup(data: userAuth): Promise<void>;
  getProfile(id: number): Promise<userProfile>;
  updateProfile(id: number, data: userProfile): Promise<userProfile>;
}
