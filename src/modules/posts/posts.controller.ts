import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import PostModel from 'src/database/models/posts';
import { UpdatePostDto } from './dtos/update-post-dto';
import User from 'src/database/models/users';
import { userRole } from 'src/helpers/userRoles';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Request() req,
  ): Promise<PostModel> {
    const authorId = req.user.sub;

    return await this.postService.createPost(createPostDto, authorId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  async getPosts(): Promise<PostModel[]> {
    return await this.postService.getPosts();
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updatePostById(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
    @Request() req,
  ) {
    const requestUserId = req.user.sub;
    const user = await User.findByPk(requestUserId);
    const postToUpdate = await PostModel.findByPk(id);

    if (user.role !== userRole.admin || postToUpdate.author !== requestUserId) {
      throw new UnauthorizedException('You`re not creator or admin to do this');
    }
    return await this.postService.updatePost(id, updatePostDto);
  }
}
