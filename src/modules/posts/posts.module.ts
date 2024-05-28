import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import PostModel from 'src/database/models/posts';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [SequelizeModule.forFeature([PostModel]), UsersModule],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
