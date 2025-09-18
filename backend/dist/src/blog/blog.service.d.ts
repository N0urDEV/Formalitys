import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/blog.dto';
export declare class BlogService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findAllBlogPosts(published?: boolean): Promise<({
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
    })[]>;
    findBlogPostBySlug(slug: string): Promise<({
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
    }) | null>;
    findBlogPostById(id: number): Promise<({
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
    }) | null>;
    updateBlogPost(id: number, updateBlogPostDto: UpdateBlogPostDto): Promise<{
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
    getPublishedBlogPosts(limit?: number): Promise<({
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
    })[]>;
    private generateSlug;
}
