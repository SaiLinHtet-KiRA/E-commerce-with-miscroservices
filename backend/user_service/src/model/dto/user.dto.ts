import {
  Contains,
  contains,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";

export class userAuth {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
export class userLoginForm {
  @IsEmail()
  authfield: string;

  @MinLength(8)
  password: string;
}
export interface userInfo {
  id: number;
  avator: string;
  username: string;
  role: "admin" | "user";
}
export interface userProfile extends userAuth, userInfo {
  phone: string;

  payment: string;
  state: string;
  address: string;
  road: string;
  orders: string;
  carts: string;
  createdAt: Date;
}
