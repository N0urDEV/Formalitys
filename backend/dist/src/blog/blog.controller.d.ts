import { BlogService } from './blog.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    findAll(published?: string): Promise<any[]>;
    getPublishedPosts(limit?: string): Promise<any[]>;
    findBySlug(slug: string): Promise<any>;
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
    findAllAdmin(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateBlogPostDto: UpdateBlogPostDto): Promise<any>;
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
