import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import User from 'src/database/models/users';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';


@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})

export class UsersModule {}
