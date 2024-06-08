import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import PostModel from 'src/database/models/posts';
import { UpdatePostDto } from './dtos/update-post-dto';
import { Public } from 'src/guards/auth.guard';
import User from 'src/database/models/users';
import { userRole } from 'src/helpers/userRoles';
import { UsersService } from '../users/user.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: PostsService,
    private readonly userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Request() req,
  ): Promise<PostModel> {
    const authorId = req.user.sub;

    return await this.postService.createPost(createPostDto, authorId);
  }

  @Public()
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
    const postToUpdate = await this.postService.getPostById(id);

    if (postToUpdate.author !== requestUserId) {
      throw new ForbiddenException('You`re not creator to do this');
    }
    return await this.postService.updatePost(id, updatePostDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deletePostById(@Param('id') id: string, @Request() req) {
    const requestUserId = req.user.sub;
    const user = await this.userService.findUserById(requestUserId);
    const postToDelete = await this.postService.getPostById(id);

    if (postToDelete.author !== user.id && user.role !== userRole.admin) {
      throw new ForbiddenException('You`re not creator or admin to do this');
    }

    return await this.postService.deletePost(id, requestUserId);
  }
}
