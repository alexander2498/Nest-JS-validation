import { Post, PrismaClient } from '@prisma/client';
import { CreatePostDto } from '../dto/CreatePostDto';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaClient);
    getPosts(): Promise<Array<Post>>;
    createPost(createPostDto: CreatePostDto): Promise<Post>;
}
