import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from 'src/database/models/users';
import { UsersService } from '../users/user.service';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);

    const payload = { email: user.email, sub: user.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { message: 'successfull login', jwt: accessToken };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  async getAdminEmails(): Promise<User[]> {
    const adminEmails = await User.findAll({
      where: {
        role: 'admin',
      },
      attributes: ['email']
    });

    return adminEmails;
  }

  async verifyUser(userId: string): Promise<void> {
    const userToVerify = await User.findOne({ where: { id: userId } });

    if (!userToVerify) {
      throw new NotFoundException('User not found');
    }

    if (userToVerify.verificated) {
      throw new ConflictException('User is already verificated');
    }

    userToVerify.verificated = true;

    await userToVerify.save();
  }
}
