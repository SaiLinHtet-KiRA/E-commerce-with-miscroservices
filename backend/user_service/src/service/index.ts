import { userRepository } from "../repository";
import UserService from "./user.service";
export const userService = new UserService(userRepository);
