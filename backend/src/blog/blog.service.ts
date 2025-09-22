import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/s3.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service
  ) {}

  async createBlogPost(createBlogPostDto: CreateBlogPostDto, authorId: number) {
    const slug = this.generateSlug(createBlogPostDto.title);
    
    return this.prisma.blogPost.create({
      data: {
        ...createBlogPostDto,
        slug,
        authorId,
        publishedAt: createBlogPostDto.published ? new Date() : null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAllBlogPosts(published?: boolean) {
    const where = published !== undefined ? { published } : {};
    
    const blogPosts = await this.prisma.blogPost.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Process each blog post to convert S3 URLs to signed URLs
    return Promise.all(blogPosts.map(post => this.processBlogPost(post)));
  }

  async findBlogPostBySlug(slug: string) {
    const blogPost = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!blogPost) return null;
    
    return this.processBlogPost(blogPost);
  }

  async findBlogPostById(id: number) {
    const blogPost = await this.prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!blogPost) return null;
    
    return this.processBlogPost(blogPost);
  }

  async updateBlogPost(id: number, updateBlogPostDto: UpdateBlogPostDto) {
    const updateData: any = { ...updateBlogPostDto };
    
    if (updateBlogPostDto.title) {
      updateData.slug = this.generateSlug(updateBlogPostDto.title);
    }
    
    if (updateBlogPostDto.published !== undefined) {
      updateData.publishedAt = updateBlogPostDto.published ? new Date() : null;
    }

    const blogPost = await this.prisma.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return this.processBlogPost(blogPost);
  }

  async deleteBlogPost(id: number) {
    return this.prisma.blogPost.delete({
      where: { id },
    });
  }

  async getPublishedBlogPosts(limit?: number) {
    const blogPosts = await this.prisma.blogPost.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
    });

    // Process each blog post to convert S3 URLs to signed URLs
    return Promise.all(blogPosts.map(post => this.processBlogPost(post)));
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  }

  private async convertS3UrlToSignedUrl(url: string | null): Promise<string | null> {
    if (!url) return null;
    
    // Check if this is an S3 URL that needs to be converted to signed URL
    const s3Endpoint = process.env.S3_ENDPOINT;
    const bucketName = process.env.S3_BUCKET_NAME || 'formalitys-uploads';
    
    if (url.includes(`${s3Endpoint}/${bucketName}/`)) {
      // Extract the key from the URL
      const key = url.replace(`${s3Endpoint}/${bucketName}/`, '');
      try {
        return await this.s3Service.getSignedUrl(key, 3600); // 1 hour expiry
      } catch (error) {
        console.error('Error generating signed URL:', error);
        return url; // Fallback to original URL
      }
    }
    
    return url; // Return original URL if it's not an S3 URL
  }

  private async processBlogPost(blogPost: any): Promise<any> {
    if (blogPost.featuredImage) {
      blogPost.featuredImage = await this.convertS3UrlToSignedUrl(blogPost.featuredImage);
    }
    return blogPost;
  }
}
