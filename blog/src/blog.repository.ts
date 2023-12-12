import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  createPost(postDto: PostDto);
  getPost(id: string): Promise<PostDto>;
  deletePost(id: string);
  updatePost(id: string, postDto: PostDto);
}

@Injectable()
export class BlogMongoRepository implements BlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getAllPost(): Promise<Blog[]> {
    return await this.blogModel.find().exec();
  }

  async createPost(postDto: PostDto) {
    const createPost = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };
    this.blogModel.create(createPost);
  }

  async getPost(id: string): Promise<PostDto> {
    return await this.blogModel.findById(id);
  }

  async deletePost(id: string) {
    await this.blogModel.findByIdAndDelete(id);
  }

  async updatePost(id: string, postDto: PostDto) {
    const updatePost = { id, ...postDto, updatedDt: new Date() };
    await this.blogModel.findByIdAndUpdate(id, updatePost);
  }
}
