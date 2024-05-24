import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(12)
  password: string;
}
