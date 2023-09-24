import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post as PostRequest,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from '../providers/app.service';
import { Post } from '@prisma/client';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from '../dto/CreatePostDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPosts(): Promise<Array<Post>> {
    return this.appService.getPosts();
  }

  @PostRequest()
  @HttpCode(201)
  @UseInterceptors(NoFilesInterceptor())
  addPost(@Body() createPostDto: CreatePostDto) {
    return this.appService.createPost(createPostDto);
  }
}
