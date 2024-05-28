import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import PostModel from 'src/database/models/posts';
import { UsersService } from '../users/user.service';
import { UpdatePostDto } from './dtos/update-post-dto';


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
}
