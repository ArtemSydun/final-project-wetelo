import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dtos/create-user.dto';
import User from 'src/database/models/users';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto as any);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    await user.destroy();
  }

  async addPostToUser(userId: string, postId: string): Promise<void> {
    const user = await User.findOne({ where: { id: userId } });

    if (user) {
      await User.update(
        { posts: [...(user.posts || []), postId] },
        { where: { id: userId } },
      );
    }
  }
}
