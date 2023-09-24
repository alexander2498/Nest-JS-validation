import { Injectable } from '@nestjs/common';
import { Post, PrismaClient } from '@prisma/client';
import { CreatePostDto } from '../dto/CreatePostDto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaClient) {}

  async getPosts(): Promise<Array<Post>> {
    return this.prisma.post.findMany();
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: createPostDto,
    });
  }
}
