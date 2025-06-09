import { IsNotEmpty, IsOptional, Length } from "class-validator";
export default class Category {
  @IsOptional()
  id: string;

  @Length(1, 10)
  name: string;
}
