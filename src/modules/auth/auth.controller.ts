import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ConflictException,
  Request,
  Get,
  Patch,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { Public } from '../../guards/auth.guard';
import User from 'src/database/models/users';
import { SignInDto } from './dtos/sign-user.dto';
import { MailService } from '../mailer/mail.service';
import { AdminGuard } from 'src/guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
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
      this.mailService.sendVerificationMail(admin, user);
    }

    return user;
  }

  @Patch('verify/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  async verifyUserById(@Param('id') id: string, @Request() req) {
    await this.authService.verifyUser(id);

    return { message: 'user verificated successfully' };
  }
}
