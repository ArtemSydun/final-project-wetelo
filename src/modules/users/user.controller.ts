import {
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';

import User from 'src/database/models/users';
import { UsersService } from './user.service';
import { AdminGuard } from 'src/guards/role.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string): Promise<any> {
    this.usersService.remove(id);

    return { message: 'success' };
  }

  @Get('profile')
  getProfile(@Request() req) {
    return User.findOne(req.user.sub);
  }

}
