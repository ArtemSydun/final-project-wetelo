import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePostDto {
  @IsOptional() 
  @MinLength(4)
  title?: string;

  @IsOptional() 
  @IsString()
  @IsNotEmpty()
  description?: string;
  
  @IsOptional()
  @IsNumber()
  price?: number;
}
