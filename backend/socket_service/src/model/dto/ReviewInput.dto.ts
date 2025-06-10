import {
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export default class ReviewInput {
  @IsOptional()
  _id?: string;

  @IsNotEmpty()
  userID: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(200)
  text: string;

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rating: number;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
