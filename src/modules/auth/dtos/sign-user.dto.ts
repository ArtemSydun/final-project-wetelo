import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(12)
  password: string;
}
