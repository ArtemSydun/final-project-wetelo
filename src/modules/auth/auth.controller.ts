import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ConflictException,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { Public } from '../../guards/auth.guard';
import User from 'src/database/models/users';
import { SignInDto } from './dtos/sign-user.dto';
import { AppService } from 'src/app.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: AppService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.authService.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.authService.create(createUserDto);

    const admins = await this.authService.getAdminEmails();

    for (const admin of admins) {
      this.mailService.sendMail(admin, user);
    }

    return user;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return User.findOne(req.user.sub);
  }
}
