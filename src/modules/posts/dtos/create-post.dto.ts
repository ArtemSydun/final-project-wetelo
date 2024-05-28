import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  
  
  @IsNumber()
  price: number;
}
