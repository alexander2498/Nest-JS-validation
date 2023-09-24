import { AppService } from '../providers/app.service';
import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/CreatePostDto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getPosts(): Promise<Array<Post>>;
    addPost(createPostDto: CreatePostDto): Promise<{
        id: number;
        name: string;
        description: string;
        author: string;
        rating: number;
    }>;
}
