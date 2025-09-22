import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/s3.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/blog.dto';
export declare class BlogService {
    private prisma;
    private s3Service;
    constructor(prisma: PrismaService, s3Service: S3Service);
    createBlogPost(createBlogPostDto: CreateBlogPostDto, authorId: number): Promise<{
        author: {
            id: number;
            email: string;
            name: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        featuredImage: string | null;
        published: boolean;
        publishedAt: Date | null;
        authorId: number;
    }>;
    findAllBlogPosts(published?: boolean): Promise<any[]>;
    findBlogPostBySlug(slug: string): Promise<any>;
    findBlogPostById(id: number): Promise<any>;
    updateBlogPost(id: number, updateBlogPostDto: UpdateBlogPostDto): Promise<any>;
    deleteBlogPost(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        featuredImage: string | null;
        published: boolean;
        publishedAt: Date | null;
        authorId: number;
    }>;
    getPublishedBlogPosts(limit?: number): Promise<any[]>;
    private generateSlug;
    private convertS3UrlToSignedUrl;
    private processBlogPost;
}
