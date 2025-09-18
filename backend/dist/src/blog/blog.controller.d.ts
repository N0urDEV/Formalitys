import { BlogService } from './blog.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    findAll(published?: string): Promise<({
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
    getPublishedPosts(limit?: string): Promise<({
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
    findBySlug(slug: string): Promise<({
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
    create(createBlogPostDto: CreateBlogPostDto, req: any): Promise<{
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
    findAllAdmin(): Promise<({
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
    findOne(id: string): Promise<({
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
    update(id: string, updateBlogPostDto: UpdateBlogPostDto): Promise<{
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
    remove(id: string): Promise<{
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
}
