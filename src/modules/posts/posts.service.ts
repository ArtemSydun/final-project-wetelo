import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import PostModel from 'src/database/models/posts';
import { UsersService } from '../users/user.service';
import { UpdatePostDto } from './dtos/update-post-dto';
import User from 'src/database/models/users';


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel)
    private postModel: typeof PostModel,
    private usersService: UsersService,
  ){}

  async createPost(createPostDto: CreatePostDto, author: string): Promise<PostModel> {
    const newPost = await this.postModel.create({ author, ...createPostDto,  });

    this.usersService.addPostToUser(author, newPost.id)

    return newPost;
  }

  async getPosts(): Promise<PostModel[]> {
    return await this.postModel.findAll();
  }

  async updatePost(postId: string, updatedFields: UpdatePostDto): Promise<PostModel> {
    const postToUpdate = await this.postModel.findOne({ where: { id: postId }});

    if (postToUpdate) {
      Object.assign(postToUpdate, updatedFields);

      console.log(postToUpdate);

      await postToUpdate.save();
    }

    return postToUpdate;
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    const postToDelete = await this.postModel.findByPk(postId);

    if (!postToDelete) {
        throw new NotFoundException('Post with such id doesn`t exist');
    }

    await postToDelete.destroy();

    const user = await User.findByPk(userId);
    if (user) {
        user.posts = user.posts.filter(postId => postId !== postId);
        await user.save();
    } else {
        throw new NotFoundException('User not found');
    }
}
}
