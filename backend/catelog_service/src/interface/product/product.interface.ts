import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  Length,
  Max,
  Min,
} from "class-validator";
export default class Product {
  @IsOptional()
  id: string;

  @Length(5, 20)
  name: string;

  @IsNotEmpty()
  categoryId: string;

  @Length(10, 500)
  description: string;

  @IsOptional()
  rating: number;

  @Min(0)
  @Max(100000)
  price: number;

  @Min(0)
  @Max(100000)
  stock: number;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsOptional()
  ThreeDFile: string | null;

  @IsOptional()
  ReviewCollection: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
