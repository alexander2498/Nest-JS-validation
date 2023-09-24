import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  author: string;

  @IsInt()
  @Max(5)
  @Min(1)
  @Type(() => Number)
  rating: number;
}
